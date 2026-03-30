"use client";

import { useEffect, useState } from "react";
import { useWishlistStore } from "@/lib/wishlist-store";
import Image from "next/image";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

export default function Wishlist() {
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      if (items.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const results = await Promise.all(
          items.map((item) =>
            fetch(`http://localhost:4000/products/${item.productId}`)
              .then((res) => res.json())
              .catch(() => null),
          ),
        );

        // filtrera bort misslyckade fetches
        setProducts(results.filter(Boolean));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [items]);

  const enrichedItems = items.map((item) => {
    const product = products.find(
      (p) => Number(p.id) === Number(item.productId),
    );

    return { ...item, product };
  });

  if (loading) {
    return <p>Laddar önskelista...</p>;
  }
  console.log(items);
  console.log(products);
  if (items.length === 0) {
    return <p>Din önskelista är tom</p>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-6">Önskelista</h2>

      <div className="space-y-6">
        {enrichedItems.map((item) => {
          if (!item.product) {
            return (
              <div key={item.productId}>
                <p>Produkt saknas (ID: {item.productId})</p>
              </div>
            );
          }

          return (
            <div key={item.productId} className="flex gap-4 border-b pb-4">
              <Image
                src={item.product.thumbnail}
                alt={item.product.title}
                width={96}
                height={96}
                className="object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.product.title}</h3>

                <p className="text-sm text-gray-600">{item.product.price} kr</p>

                <button
                  onClick={() => removeItem(item.productId)}
                  type="button"
                  className="text-red-500 text-sm mt-2"
                >
                  Ta bort
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
