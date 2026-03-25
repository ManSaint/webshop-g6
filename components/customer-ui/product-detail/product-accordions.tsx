"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Product } from "@/lib/types";

interface AccordionItem {
  title: string;
  content: string;
}

function buildAccordionItems(product: Product): AccordionItem[] {
  const items: AccordionItem[] = [];

  // Product Details
  const details: string[] = [];
  if (product.description) details.push(product.description);
  if (product.dimensions) {
    details.push(
      `Dimensions: ${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm`
    );
  }
  if (product.weight) details.push(`Weight: ${product.weight} kg`);
  if (product.sku) details.push(`SKU: ${product.sku}`);
  if (details.length > 0) {
    items.push({ title: "Product Details", content: details.join("\n\n") });
  }

  // Shipping & Returns
  const shipping: string[] = [];
  if (product.shippingInformation) shipping.push(product.shippingInformation);
  if (product.returnPolicy) shipping.push(product.returnPolicy);
  if (shipping.length > 0) {
    items.push({ title: "Shipping & Returns", content: shipping.join("\n\n") });
  }

  // Warranty
  if (product.warrantyInformation) {
    items.push({ title: "Warranty", content: product.warrantyInformation });
  }

  return items;
}

export default function ProductAccordions({
  product,
}: {
  product: Product;
}) {
  const items = buildAccordionItems(product);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <div className="mt-8 border-t" style={{ borderColor: "var(--color-border-store)" }}>
      {items.map((item, i) => (
        <div
          key={item.title}
          className="border-b"
          style={{ borderColor: "var(--color-border-store)" }}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between py-5 text-left"
          >
            <span className="text-xs tracking-[0.15em] uppercase font-medium">
              {item.title}
            </span>
            <ChevronDown
              className="w-4 h-4 transition-transform duration-300"
              style={{
                transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>
          <div
            className="overflow-hidden transition-all duration-500"
            style={{
              maxHeight: openIndex === i ? "500px" : "0px",
            }}
          >
            <div
              className="pb-5 text-sm leading-relaxed whitespace-pre-line"
              style={{ color: "rgba(44,44,44,0.7)" }}
            >
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
