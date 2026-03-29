"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import Image from "next/image";
import { Trash2 } from "lucide-react";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const increase = useCartStore((state) => state.increaseQuantity);
  const decrease = useCartStore((state) => state.decreaseQuantity);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Hämta ENDAST produkter i cart
  useEffect(() => {
    async function fetchProducts() {
      if (items.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        const params = new URLSearchParams();
        items.forEach((item) => {
          params.append("id", String(item.productId));
        });

        const res = await fetch(`${API_URL}/products?${params.toString()}`);
        const data = await res.json();

        setProducts(data.products || data || []);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [items]);

  // 🔹 Koppla cart items till produkter (säker match)
  const enrichedItems = items.map((item) => {
    const product = products.find(
      (p) => Number(p.id) === Number(item.productId),
    );

    return {
      ...item,
      product,
    };
  });

  const total = enrichedItems.reduce((sum, item) => {
    if (!item.product) return sum;
    return sum + item.product.price * item.quantity;
  }, 0);

  // 🔹 Loading state
  if (loading) {
    return <p>Laddar varukorg...</p>;
  }

  if (items.length === 0) {
    return <p>Varukorgen är tom</p>;
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-10 md:gap-20">
      <h1 className="text-4xl font-serif mb-6 text-(--color-darkbrown)">
        Shopping Cart
      </h1>

      <div className="space-y-6">
        {enrichedItems.map((item) => {
          if (!item.product) {
            return (
              <div key={item.productId} className="border-b pb-4">
                <p>Produkt kunde inte laddas (ID: {item.productId})</p>
              </div>
            );
          }

          return (
            <div key={item.productId} className="flex gap-4 border-b pb-4">
              {/* Bild */}
              <Image
                src={item.product.thumbnail}
                alt={item.product.title}
                width={96}
                height={96}
                className="object-cover rounded"
              />

              {/* Info */}
              <div className="flex-1 flex flex-col">
                <h3 className="font-semibold">{item.product.title}</h3>

                <p className="text-sm text-gray-600">$ {item.product.price}</p>

                {/* Quantity controls */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => decrease(item.productId)}
                    type="button"
                    className="px-2 shadow-sm border border-(--color-border)/50 rounded-sm hover:cursor-pointer"
                  >
                    –
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increase(item.productId)}
                    type="button"
                    className="px-2 shadow-sm border border-(--color-border)/50 rounded-sm hover:cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.productId)}
                  type="button"
                  className="text-red-700/80 text-sm mt-2 w-fit flex gap-1 items- content-center self-end hover:cursor-pointer"
                >
                  Remove
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total */}
      <div className="mt-8 text-right">
        <p className="text-lg font-semibold">Total: ${total} </p>
      </div>
    </div>
  );
}
