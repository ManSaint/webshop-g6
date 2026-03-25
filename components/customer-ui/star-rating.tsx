import { Star } from "lucide-react";

export default function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        if (i <= Math.floor(rating)) {
          return (
            <Star
              key={i}
              className="w-3.5 h-3.5"
              fill="var(--color-rose)"
              stroke="var(--color-rose)"
            />
          );
        }
        if (i === Math.ceil(rating) && rating % 1 !== 0) {
          return (
            <Star
              key={i}
              className="w-3.5 h-3.5"
              fill="var(--color-rose)"
              stroke="var(--color-rose)"
              style={{ clipPath: "inset(0 50% 0 0)" }}
            />
          );
        }
        return (
          <Star
            key={i}
            className="w-3.5 h-3.5"
            fill="none"
            stroke="var(--color-border-store)"
          />
        );
      })}
    </div>
  );
}
