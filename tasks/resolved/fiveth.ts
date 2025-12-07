import { ref, computed } from 'vue';

export function useWallet(initialBalance: number) {
  const balance = ref(initialBalance);
  const transactions = ref<number[]>([]);

  const deposit = (amount: number) => {
    balance.value += amount;
    transactions.value.push(amount);
  };

  const withdraw = (amount: number) => {
    if (balance.value < amount) throw new Error('Insufficient funds');
    balance.value -= amount;
    transactions.value.push(-amount);
  };

  const transactionCount = computed(() => transactions.value.length);

  return { balance, deposit, withdraw, transactionCount };
}
