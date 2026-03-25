import type { Product } from "@/lib/types";
import StarRating from "./star-rating";

export default function ProductReviews({ product }: { product: Product }) {
  const reviews = product.reviews;
  if (!reviews || reviews.length === 0) return null;

  const avgRating = product.rating ?? 0;

  return (
    <section
      id="reviews"
      className="mt-20 pt-12 border-t"
      style={{ borderColor: "var(--color-border-store)" }}
    >
      <div className="max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2
              className="text-2xl lg:text-3xl font-medium mb-2"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--color-darkbrown)",
              }}
            >
              Customer Reviews
            </h2>
            <div className="flex items-center gap-3">
              <StarRating rating={avgRating} />
              <span className="text-sm" style={{ color: "rgba(44,44,44,0.5)" }}>
                {avgRating} out of 5 based on {reviews.length}{" "}
                {reviews.length === 1 ? "review" : "reviews"}
              </span>
            </div>
          </div>
        </div>

        {/* Review List */}
        <div className="space-y-8">
          {reviews.map((review, i) => (
            <div
              key={`${review.reviewerName}-${i}`}
              className="border-b pb-8"
              style={{ borderColor: "var(--color-border-store)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <StarRating rating={review.rating} />
              </div>
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ color: "rgba(44,44,44,0.6)" }}
              >
                {review.comment}
              </p>
              <div
                className="flex items-center gap-3 text-xs"
                style={{ color: "rgba(44,44,44,0.4)" }}
              >
                <span
                  className="font-medium"
                  style={{ color: "rgba(44,44,44,0.6)" }}
                >
                  {review.reviewerName}
                </span>
                <span>
                  {new Date(review.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
