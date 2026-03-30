"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistItem = {
  productId: number;
};

type WishlistStore = {
  items: WishlistItem[];

  addItem: (productId: number) => void;
  removeItem: (productId: number) => void;
  toggleItem: (productId: number) => void;

  setItems: (items: WishlistItem[]) => void; // används vid sync senare
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId) => {
        const exists = get().items.some((i) => i.productId === productId);

        if (!exists) {
          set({
            items: [...get().items, { productId }],
          });
        }
      },

      removeItem: (productId) =>
        set({
          items: get().items.filter((i) => i.productId !== productId),
        }),

      toggleItem: (productId) => {
        const exists = get().items.some((i) => i.productId === productId);

        if (exists) {
          get().removeItem(productId);
        } else {
          get().addItem(productId);
        }
      },

      setItems: (items) => set({ items }),
    }),
    {
      name: "wishlist-storage",
    },
  ),
);
