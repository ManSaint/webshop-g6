"use server";

import { currentUser } from "@clerk/nextjs/server";
import {
  getWishlistItems,
  addWishlistItem,
  removeWishlistItem,
  mergeWishlistItems,
  getCartItems,
  upsertCartItem,
  removeCartItem,
  clearCartItems,
  updateCartItemQuantity,
  mergeCartItems,
  getProductsByIds,
} from "@/lib/db";
import type { CartItem, Product, WishlistItem } from "@/lib/types";

async function getUserEmail(): Promise<string | null> {
  const user = await currentUser();
  return user?.emailAddresses[0]?.emailAddress ?? null;
}

// ----- Product fetching -----

export async function fetchProductsByIds(ids: number[]): Promise<Product[]> {
  return getProductsByIds(ids);
}

// ----- Wishlist -----

export async function fetchWishlist(): Promise<WishlistItem[]> {
  const userId = await getUserEmail();
  if (!userId) return [];
  return getWishlistItems(userId);
}

export async function syncAddWishlistItem(productId: number): Promise<void> {
  const userId = await getUserEmail();
  if (!userId) return;
  await addWishlistItem(userId, productId);
}

export async function syncRemoveWishlistItem(productId: number): Promise<void> {
  const userId = await getUserEmail();
  if (!userId) return;
  await removeWishlistItem(userId, productId);
}

export async function syncMergeWishlist(productIds: number[]): Promise<WishlistItem[]> {
  const userId = await getUserEmail();
  if (!userId) return [];
  await mergeWishlistItems(userId, productIds);
  return getWishlistItems(userId);
}

// ----- Cart -----

export async function fetchCart(): Promise<CartItem[]> {
  const userId = await getUserEmail();
  if (!userId) return [];
  return getCartItems(userId);
}

export async function syncUpsertCartItem(item: CartItem): Promise<void> {
  const userId = await getUserEmail();
  if (!userId) return;
  await upsertCartItem(userId, item);
}

export async function syncRemoveCartItem(productId: number): Promise<void> {
  const userId = await getUserEmail();
  if (!userId) return;
  await removeCartItem(userId, productId);
}

export async function syncClearCart(): Promise<void> {
  const userId = await getUserEmail();
  if (!userId) return;
  await clearCartItems(userId);
}

export async function syncUpdateCartQuantity(productId: number, quantity: number): Promise<void> {
  const userId = await getUserEmail();
  if (!userId) return;
  await updateCartItemQuantity(userId, productId, quantity);
}

export async function syncMergeCart(localItems: CartItem[]): Promise<CartItem[]> {
  const userId = await getUserEmail();
  if (!userId) return [];
  await mergeCartItems(userId, localItems);
  return getCartItems(userId);
}
