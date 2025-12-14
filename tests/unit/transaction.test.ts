import { test, describe, expect } from "vitest";
import { validateTransaction } from "./transaction";

describe("validateTransaction", () => {
    test("Возвращает true, если сумма меньше или равна балансу", () => {
        expect(validateTransaction(10, 100)).toBe(true);
    });

    test("Возвращает false, если сумма превышает баланс", () => {
        expect(validateTransaction(100, 10)).toBe(false);
    });

    test('Выбрасывает ошибку с текстом "Amount must be positive", если сумма равна 0 или отрицательная', () => {
        expect(() => validateTransaction(0, 100)).toThrowError(
            "Amount must be positive",
        );
    });
});
