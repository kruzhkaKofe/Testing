import { vi, test, describe, expect } from 'vitest';
import { useWallet } from './fiveth.ts';

describe('useWallet', () => {
  test('Начальное состояние инициализируется корректно', () => {
    const { balance } = useWallet(0);
    expect(balance.value).toBe(0);
  })

  test('deposit увеличивает баланс и реактивно обновляет transactionCount', () => {
    const wallet = useWallet(0);

    wallet.deposit(10);

    expect(wallet.balance.value).toBe(10);
    expect(wallet.transactionCount.value).toBe(1);
  })

  test('withdraw уменьшает баланс', () => {
    const wallet = useWallet(10);

    wallet.withdraw(5);

    expect(wallet.balance.value).toBe(5);
    expect(wallet.transactionCount.value).toBe(1);
  })

  test('withdraw выбрасывает ошибку при недостатке средств (при этом баланс и история не должны меняться)', () => {
    const wallet = useWallet(10);

    expect(() => wallet.withdraw(15)).toThrowError('Insufficient funds');
    expect(wallet.balance.value).toBe(10);
    expect(wallet.transactionCount.value).toBe(0);
  })
})
