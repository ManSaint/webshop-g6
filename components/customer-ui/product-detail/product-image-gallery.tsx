"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[];
  thumbnail: string;
  title: string;
  discountPercentage?: number;
}

export default function ProductImageGallery({
  images,
  thumbnail,
  title,
  discountPercentage,
}: ProductImageGalleryProps) {
  const allImages =
    images && images.length > 0 ? images : [thumbnail];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="lg:w-[60%]">
      {/* Main Image */}
      <div
        className="relative overflow-hidden mb-4 aspect-[4/5]"
        style={{ backgroundColor: "var(--color-beige)" }}
      >
        <Image
          src={allImages[activeIndex]}
          alt={title}
          fill
          className="object-contain transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority
        />
        {discountPercentage && discountPercentage > 0 && (
          <span
            className="absolute top-4 left-4 text-xs tracking-wider px-3 py-1.5 font-medium"
            style={{
              backgroundColor: "var(--color-darkbrown)",
              color: "var(--color-cream)",
            }}
          >
            {Math.round(discountPercentage)}% OFF
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {allImages.slice(0, 4).map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActiveIndex(i)}
              className="aspect-[3/4] overflow-hidden border-2 transition-all duration-300"
              style={{
                backgroundColor: "var(--color-beige)",
                borderColor:
                  i === activeIndex
                    ? "var(--color-charcoal)"
                    : "transparent",
              }}
            >
              <Image
                src={img}
                alt={`${title} view ${i + 1}`}
                width={400}
                height={500}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
