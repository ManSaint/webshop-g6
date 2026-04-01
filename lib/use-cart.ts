"use client";

import { useAuth } from "@clerk/nextjs";
import { useCartStore } from "@/lib/cart-store";
import type { CartItem } from "@/lib/types";
import {
  syncUpsertCartItem,
  syncRemoveCartItem,
  syncClearCart,
  syncUpdateCartQuantity,
} from "@/lib/sync-actions";

export function useCart() {
  const { isSignedIn } = useAuth();
  const items = useCartStore((s) => s.items);
  const storeAddItem = useCartStore((s) => s.addItem);
  const storeRemoveItem = useCartStore((s) => s.removeItem);
  const storeClearCart = useCartStore((s) => s.clearCart);
  const storeIncrease = useCartStore((s) => s.increaseQuantity);
  const storeDecrease = useCartStore((s) => s.decreaseQuantity);

  const addItem = (item: CartItem) => {
    storeAddItem(item);
    if (isSignedIn) {
      const updated = useCartStore.getState().items.find((i) => i.productId === item.productId);
      if (updated) syncUpsertCartItem(updated);
    }
  };

  const removeItem = (productId: number) => {
    storeRemoveItem(productId);
    if (isSignedIn) syncRemoveCartItem(productId);
  };

  const clearCart = () => {
    storeClearCart();
    if (isSignedIn) syncClearCart();
  };

  const increaseQuantity = (productId: number) => {
    storeIncrease(productId);
    if (isSignedIn) {
      const item = useCartStore.getState().items.find((i) => i.productId === productId);
      if (item) syncUpdateCartQuantity(productId, item.quantity);
    }
  };

  const decreaseQuantity = (productId: number) => {
    storeDecrease(productId);
    if (isSignedIn) {
      const item = useCartStore.getState().items.find((i) => i.productId === productId);
      if (item) {
        syncUpdateCartQuantity(productId, item.quantity);
      } else {
        syncRemoveCartItem(productId);
      }
    }
  };

  return { items, addItem, removeItem, clearCart, increaseQuantity, decreaseQuantity };
}
