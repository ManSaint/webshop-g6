"use client";

import { useAuth } from "@clerk/nextjs";
import { useWishlistStore } from "@/lib/wishlist-store";
import { syncAddWishlistItem, syncRemoveWishlistItem } from "@/lib/sync-actions";

export function useWishlist() {
  const { isSignedIn } = useAuth();
  const items = useWishlistStore((s) => s.items);
  const storeAdd = useWishlistStore((s) => s.addItem);
  const storeRemove = useWishlistStore((s) => s.removeItem);

  const add = (productId: number) => {
    storeAdd(productId);
    if (isSignedIn) syncAddWishlistItem(productId);
  };

  const remove = (productId: number) => {
    storeRemove(productId);
    if (isSignedIn) syncRemoveWishlistItem(productId);
  };

  const toggle = (productId: number) => {
    const exists = items.some((i) => i.productId === productId);
    if (exists) {
      remove(productId);
    } else {
      add(productId);
    }
  };

  return { items, add, remove, toggle };
}
