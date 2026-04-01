"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/nextjs";
import { useWishlistStore } from "@/lib/wishlist-store";
import { useCartStore } from "@/lib/cart-store";
import {
  fetchWishlist,
  syncMergeWishlist,
  fetchCart,
  syncMergeCart,
} from "@/lib/sync-actions";

export function useSyncStores() {
  const { isSignedIn, isLoaded } = useAuth();
  const hasSynced = useRef(false);

  // Sync on sign-in
  useEffect(() => {
    if (!isLoaded || hasSynced.current) return;
    if (!isSignedIn) return;

    async function sync() {
      const localWishlistItems = useWishlistStore.getState().items;
      const localCartItems = useCartStore.getState().items;

      const hasLocalWishlist = localWishlistItems.length > 0;
      const hasLocalCart = localCartItems.length > 0;

      if (hasLocalWishlist || hasLocalCart) {
        const [mergedWishlist, mergedCart] = await Promise.all([
          hasLocalWishlist
            ? syncMergeWishlist(localWishlistItems.map((i) => i.productId))
            : fetchWishlist(),
          hasLocalCart ? syncMergeCart(localCartItems) : fetchCart(),
        ]);

        useWishlistStore.getState().setItems(mergedWishlist);
        useCartStore.getState().setItems(mergedCart);
      } else {
        const [serverWishlist, serverCart] = await Promise.all([
          fetchWishlist(),
          fetchCart(),
        ]);

        useWishlistStore.getState().setItems(serverWishlist);
        useCartStore.getState().setItems(serverCart);
      }

      hasSynced.current = true;
    }

    sync();
  }, [isSignedIn, isLoaded]);

  // Clear stores on sign-out
  useEffect(() => {
    if (isLoaded && !isSignedIn && hasSynced.current) {
      useWishlistStore.getState().setItems([]);
      useCartStore.getState().setItems([]);
      hasSynced.current = false;
    }
  }, [isSignedIn, isLoaded]);
}
