"use client";
import { ShoppingBag } from "lucide-react";

import { useCartStore } from "@/lib/cart-store";

type Props = {
  productId: number;
  price: number;
};

export default function AddToCartButton({ productId, price }: Props) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      onClick={() =>
        addItem({
          productId,
          quantity: 1,
          priceAtAdd: price,
        })
      }
      type="button"
      className="w-full py-4 text-sm tracking-[0.2em] uppercase font-medium transition-all duration-500 mb-3 flex items-center justify-center gap-2"
      style={{
        backgroundColor: "var(--color-darkbrown)",
        color: "var(--color-cream)",
      }}
    >
      <ShoppingBag className="w-4 h-4" />
      Add to Bag
    </button>
  );
}
