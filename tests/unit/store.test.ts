import { expect, describe, beforeEach, afterEach, test, vi } from "vitest";
import { useCartStore } from "./store.ts";
import { createPinia, setActivePinia } from "pinia";

// https://pinia.vuejs.org/cookbook/testing.html

describe("тестируем Pinia Store 🍍", () => {
    let store: any;

    beforeEach(() => {
        setActivePinia(createPinia());
        store = useCartStore();
    });

    test("Проверить, что добавление нового товара создает запись с qty: 1", () => {
        store.addItem({ id: 1, price: 100 });
        expect(store.items).toEqual([{ id: 1, price: 100, qty: 1 }]);
    });

    test("Проверить, что добавление того же товара увеличивает qty, а не создает дубликат", () => {
        store.addItem({ id: 1, price: 100 });
        store.addItem({ id: 1, price: 100 });

        expect(store.items).toEqual([{ id: 1, price: 100, qty: 2 }]);
    });

    test("Проверить, что геттер total правильно пересчитывается при изменении количества", () => {
        store.addItem({ id: 1, price: 100 });
        store.addItem({ id: 2, price: 4000 });

        expect(store.total).toBe(4100);
    });
});
