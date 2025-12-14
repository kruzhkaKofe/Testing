import { defineStore } from 'pinia';

type Item = {
  id: number;
  price: number;
  qty: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as Item[],
  }),
  getters: {
    total: (state) => state.items.reduce((sum, item) => sum + item.price * item.qty, 0),
  },
  actions: {
    addItem(item: Omit<Item, 'qty'>) {
      const existing = this.items.find((i) => i.id === item.id);
      if (existing) {
        existing.qty++;
      } else {
        this.items.push({ ...item, qty: 1 });
      }
    },
  },
});
