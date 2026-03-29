"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: number;
  quantity: number;
  priceAtAdd: number;
};

type CartStore = {
  items: CartItem[];

  addItem: (item: CartItem) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existing = get().items.find(
          (i) => i.productId === item.productId,
        );

        if (existing) {
          set({
            items: get().items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i,
            ),
          });
        } else {
          set({
            items: [...get().items, item],
          });
        }
      },
      increaseQuantity: (productId: number) =>
        set({
          items: get().items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }),

      decreaseQuantity: (productId: number) =>
        set({
          items: get()
            .items.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            )
            .filter((item) => item.quantity > 0),
        }),

      removeItem: (productId) =>
        set({
          items: get().items.filter((i) => i.productId !== productId),
        }),

      clearCart: () => set({ items: [] }),
    }),

    {
      name: "cart-storage",
      version: 1,
    },
  ),
);
