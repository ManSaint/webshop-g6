"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/use-cart";
import { fetchProductsByIds } from "@/lib/sync-actions";
import type { Product } from "@/lib/types";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import Link from "next/link";

export default function Cart() {
  const {
    items,
    removeItem,
    increaseQuantity: increase,
    decreaseQuantity: decrease,
  } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      if (items.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        const results = await fetchProductsByIds(
          items.map((item) => item.productId),
        );
        setProducts(results);
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

  const handleCheckout = async () => {
    const lineItems = enrichedItems
      .filter((item) => item.product)
      .map((item) => ({
        name: item.product!.title,
        price: item.product!.price,
        quantity: item.quantity,
        image: item.product!.thumbnail,
      }));

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: lineItems }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  if (loading) {
    return (
      <div className="w-full mx-auto text-center md:max-w-3xl">
        <p>Loading cart...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col gap-16 max-w-4xl mx-auto md:min-h-140 p-4">
        <div className="md:w-2xl justify-center w-full mx-auto flex flex-col items-center text-center gap-10 md:gap-16 rounded-lg my-auto">
          <h2 className="text-3xl font-medium font-serif text-(--color-darkbrown) leading-12">
            <span className="text-5xl font-semibold">Your cart is empty</span>{" "}
            <br />
            ...this is{" "}
            <span className="font-serif font-normal">
              <em>highly unusual</em>
            </span>
          </h2>
          <Link
            href="/customer/collection"
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
    <div className="max-w-6xl my-10 md:mb-20 mx-auto flex flex-col md:flex-row gap-10 md:gap-20">
      <div className="basis-3/5 flex flex-col gap-6 md:gap-12">
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

                  <p className="text-sm text-gray-600">
                    $ {item.product.price}
                  </p>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => decrease(item.productId)}
                      type="button"
                      className="px-2 shadow-sm border border-(--color-border)/50 rounded-sm hover:cursor-pointer"
                    ></button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increase(item.productId)}
                      type="button"
                      className="px-2 shadow-sm border border-(--color-border)/50 rounded-sm hover:cursor-pointer"
                    ></button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.productId)}
                    type="button"
                    className="text-(--color-text-muted) text-sm mt-2 w-fit px-4 border py-2 flex gap-1 justify-center rounded-xs border-(--color-border) hover:shadow-md content-center self-end hover:cursor-pointer"
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
      {/* Total + check out*/}
      <div className="basis-2/5 mt-8 w-full justify-between flex flex-col gap-6 h-fit p-6 border-(--color-border)/50 border shadow-lg bg-(--color-cream) rounded-md">
        <p className="text-lg font-semibold text-(--color-darkbrown)">
          Total: <span className="font-normal">${total.toFixed(2)}</span>
        </p>
        <button
          onClick={handleCheckout}
          className="basis-1/2 w-full border py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-[var(--color-charcoal)] hover:text-[var(--color-cream)] transition-all duration-500 flex items-center justify-center gap-2 hover:cursor-pointer"
          type="button"
          style={{ borderColor: "var(--color-charcoal)" }}
        >
          Check out
        </button>
      </div>
    </div>
  );
}
