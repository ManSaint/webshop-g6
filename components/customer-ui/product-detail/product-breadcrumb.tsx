import Link from "next/link";
import type { Category } from "@/lib/types";

interface ProductBreadcrumbProps {
  category?: Category;
  productTitle: string;
}

export default function ProductBreadcrumb({
  category,
  productTitle,
}: ProductBreadcrumbProps) {
  return (
    <nav className="py-4">
      <ol className="flex items-center gap-2 text-xs tracking-wide" style={{ color: "rgba(44,44,44,0.5)" }}>
        <li>
          <Link href="/" className="hover:text-[var(--color-charcoal)] transition-colors">
            Home
          </Link>
        </li>
        <li>/</li>
        {category && (
          <>
            <li>
              <Link
                href={`/customer/collection?category=${encodeURIComponent(category.name)}`}
                className="hover:text-[var(--color-charcoal)] transition-colors"
              >
                {category.name}
              </Link>
            </li>
            <li>/</li>
          </>
        )}
        <li className="text-[var(--color-charcoal)]">{productTitle}</li>
      </ol>
    </nav>
  );
}
