import { test, expect, describe } from 'vitest';
import { add, mergeObject } from './unit';

describe('Тесты для функции add', () => {
  test('При сложении 10 и 5 ответ будет 15', () => {
    expect(add(10, 5)).toBe(15);
  })

  test('При сложении 10 и 5 ответ будет не 30', () => {
    expect(add(10, 5)).not.toBe(30);
  })
  test('При сложении 10 и 5 ответ будет не 30', () => {
    expect(add(10, 5)).not.toBe(30);
  })
})

test('{ a: 10 } и { b: "jopa" } вернет { a: 10, b: "jopa" }', () => {
  const first = { a: 10 };
  const second = { b: 'jopa' };
  const result = {
    a: 10,
    b: 'jopa'
  }

  expect(mergeObject(first, second)).toEqual(result);
})
