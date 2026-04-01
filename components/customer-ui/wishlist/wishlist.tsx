"use client";

import { useEffect, useState } from "react";
import { useWishlistStore } from "@/lib/wishlist-store";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import AddToCartButton from "../product-detail/cart-button";

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

        // filtrera bort misslyckade fetches, just in case
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
    return <p>Loading wishlist...</p>;
  }
  console.log(items);
  console.log(products);
  if (items.length === 0) {
    return <p>Your wishlist is empty</p>;
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 md:gap-12">
      <h1 className="text-4xl my-8 font-serif text-(--color-darkbrown)">
        Wishlist
      </h1>

      <div className="space-y-6">
        {enrichedItems.map((item) => {
          if (!item.product) {
            return (
              <div key={item.productId}>
                <p>Product not found (ID: {item.productId})</p>
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

                <p className="text-sm text-gray-600">${item.product.price} </p>
              </div>
              <div className="w-50 flex flex-col justify-center">
                <AddToCartButton
                  productId={item.product.id}
                  price={item.product.price}
                />
                <button
                  onClick={() => removeItem(item.productId)}
                  type="button"
                  className="text-(--color-text-muted) text-sm mt-2 w-full border py-2 flex gap-1 justify-center rounded-xs border-(--color-border) hover:shadow-md content-center self-end hover:cursor-pointer"
                >
                  Remove
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
