import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";
import StarRating from "../star-rating";
import ProductAccordions from "./product-accordions";
import AddToCartButton from "./cart-button";
import WishlistButton from "./wishlist-button";

export default function ProductInfo({ product }: { product: Product }) {
  const hasDiscount =
    product.discountPercentage && product.discountPercentage > 0;
  const discountedPrice = hasDiscount
    ? product.price * (1 - product.discountPercentage! / 100)
    : product.price;
  const savings = hasDiscount ? product.price - discountedPrice : 0;
  const reviewCount = product.reviews?.length ?? 0;
  const avgRating = product.rating ?? 0;

  return (
    <div className="lg:w-[40%] mt-8 lg:mt-0">
      <div className="lg:sticky lg:top-28">
        {/* Brand */}
        {product.brand && (
          <p
            className="text-xs tracking-[0.25em] uppercase mb-2"
            style={{ color: "rgba(44,44,44,0.5)" }}
          >
            {product.brand}
          </p>
        )}

        {/* Title */}
        <h1
          className="text-3xl lg:text-4xl font-medium mb-4"
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--color-darkbrown)",
          }}
        >
          {product.title}
        </h1>

        {/* Price */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl font-medium">
            ${discountedPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <>
              <span
                className="text-sm line-through"
                style={{ color: "rgba(44,44,44,0.4)" }}
              >
                ${product.price.toFixed(2)}
              </span>
              <span
                className="text-xs tracking-wider px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: "rgba(212,181,160,0.3)",
                  color: "var(--color-darkbrown)",
                }}
              >
                SAVE ${savings.toFixed(2)}
              </span>
            </>
          )}
        </div>

        {/* Rating */}
        {avgRating > 0 && (
          <div
            className="flex items-center gap-2 mb-6 pb-6 border-b"
            style={{ borderColor: "var(--color-border-store)" }}
          >
            <StarRating rating={avgRating} />
            <span className="text-sm" style={{ color: "rgba(44,44,44,0.5)" }}>
              {avgRating}
            </span>
            {reviewCount > 0 && (
              <a
                href="#reviews"
                className="text-sm underline underline-offset-2 hover:text-[var(--color-charcoal)] transition-colors"
                style={{ color: "rgba(44,44,44,0.5)" }}
              >
                ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
              </a>
            )}
          </div>
        )}

        {/* Availability */}
        {product.availabilityStatus && (
          <p
            className="text-xs tracking-wider uppercase mb-6"
            style={{
              color:
                product.availabilityStatus === "In Stock"
                  ? "var(--color-success)"
                  : "var(--color-warning)",
            }}
          >
            {product.availabilityStatus}
            {product.stock !== undefined && product.stock > 0 && (
              <span style={{ color: "rgba(44,44,44,0.4)" }}>
                {" "}
                — {product.stock} left
              </span>
            )}
          </p>
        )}

        {/* Buttons */}

        <AddToCartButton productId={product.id} price={product.price} />
        <WishlistButton productId={product.id} />

        {/* Shipping note */}
        {product.shippingInformation && (
          <div
            className="mt-6 flex items-center gap-2 text-xs"
            style={{ color: "rgba(44,44,44,0.5)" }}
          >
            <ArrowRight className="w-4 h-4" />
            <span>{product.shippingInformation}</span>
          </div>
        )}

        {/* Accordions */}
        <ProductAccordions product={product} />
      </div>
    </div>
  );
}
