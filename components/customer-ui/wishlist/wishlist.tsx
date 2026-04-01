"use client";

import { useEffect, useState } from "react";
import { useWishlist } from "@/lib/use-wishlist";
import { fetchProductsByIds } from "@/lib/sync-actions";
import type { Product } from "@/lib/types";
import Image from "next/image";
import { Heart, Trash2 } from "lucide-react";
import AddToCartButton from "../product-detail/cart-button";
import Link from "next/link";

export default function Wishlist() {
  const { items, remove } = useWishlist();

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
        const results = await fetchProductsByIds(
          items.map((item) => item.productId),
        );
        setProducts(results);
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
  if (items.length === 0) {
    return (
      <div className="flex flex-col gap-16 max-w-4xl mx-auto md:min-h-140  p-4">
        <div className=" md:w-2xl justify-center w-full mx-auto flex flex-col  items-center text-center gap-10 md:gap-16 rounded-lg my-auto">
          <h2 className="text-3xl font-medium font-serif text-(--color-darkbrown) leading-12">
            <span className="text-5xl font-semibold">Wishlist is empty</span>{" "}
            <br />
            ...you haven't saved{" "}
            <span className="font-serif">
              <em>anything</em>
            </span>
            ?
          </h2>

          <Link
            href="collection"
            className="text-xs tracking-widest border-b pb-1 transition hover:opacity-70"
            style={{
              color: "var(--color-charcoal)",
              borderColor: "var(--color-border-store)",
            }}
          >
            VIEW ALL PRODUCTS
          </Link>
        </div>
      </div>
    );
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
                  onClick={() => remove(item.productId)}
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
