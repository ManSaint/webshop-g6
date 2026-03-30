"use client";
import { Heart } from "lucide-react";

import { useWishlistStore } from "@/lib/wishlist-store";

type Props = {
  productId: number;
};

export default function WishlistButton({ productId }: Props) {
  const items = useWishlistStore((state) => state.items);
  const toggleItem = useWishlistStore((state) => state.toggleItem);

  const isInWishlist = items.some((item) => item.productId === productId);

  return (
    <button
      onClick={() => toggleItem(productId)}
      type="button"
      className="w-full border py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-[var(--color-darkbrown)] hover:text-[var(--color-cream)] hover:cursor-pointer transition-all duration-500 flex items-center justify-center gap-2"
      style={{ borderColor: "var(--color-charcoal)" }}
      aria-label="wishlist"
    >
      <Heart
        className={
          isInWishlist
            ? "fill-(--color-darkbrown) h-5 w-5"
            : "fill-none h-5 w-5"
        }
      />{" "}
      {isInWishlist ? "remove from wishlist" : "add to wishlist"}
    </button>
  );
}
