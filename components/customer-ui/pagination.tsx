"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pages = getPageNumbers(currentPage, totalPages);

  if (totalPages <= 1) return null;

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <nav aria-label="Pagination" className="flex justify-center items-center gap-1 py-8">
      {/* Previous */}
      <PaginationLink
        href={createPageURL(Math.max(1, currentPage - 1))}
        disabled={isFirst}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </PaginationLink>

      {/* Page numbers */}
      {pages.map((page, i) =>
        page === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="w-9 h-9 flex items-center justify-center text-sm"
            style={{ color: "var(--color-charcoal)" }}
          >
            ...
          </span>
        ) : (
          <PaginationLink
            key={page}
            href={createPageURL(page as number)}
            active={page === currentPage}
            aria-label={`Page ${page}`}
          >
            {page}
          </PaginationLink>
        )
      )}

      {/* Next */}
      <PaginationLink
        href={createPageURL(Math.min(totalPages, currentPage + 1))}
        disabled={isLast}
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </PaginationLink>
    </nav>
  );
}

function PaginationLink({
  href,
  disabled,
  active,
  children,
  ...props
}: {
  href: string;
  disabled?: boolean;
  active?: boolean;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const baseClasses =
    "w-9 h-9 flex items-center justify-center rounded text-sm transition-colors duration-200";

  if (disabled) {
    return (
      <span
        className={`${baseClasses} cursor-default`}
        style={{ color: "var(--color-text-faint)" }}
        aria-disabled="true"
        {...(props as React.HTMLAttributes<HTMLSpanElement>)}
      >
        {children}
      </span>
    );
  }

  if (active) {
    return (
      <span
        className={`${baseClasses} font-semibold`}
        style={{
          backgroundColor: "var(--color-darkbrown)",
          color: "#ffffff",
        }}
        aria-current="page"
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      scroll={false}
      href={href}
      className={`${baseClasses} hover:opacity-100`}
      style={{ color: "var(--color-charcoal)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--color-rose)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--color-charcoal)";
      }}
      {...props}
    >
      {children}
    </Link>
  );
}

function getPageNumbers(
  current: number,
  total: number
): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];

  // Always show first page
  pages.push(1);

  if (current <= 3) {
    // Near the start: 1 2 3 4 5 ... last
    pages.push(2, 3, 4, 5, "...", total);
  } else if (current >= total - 2) {
    // Near the end: 1 ... n-4 n-3 n-2 n-1 last
    pages.push("...", total - 4, total - 3, total - 2, total - 1, total);
  } else {
    // Middle: 1 ... c-1 c c+1 ... last
    pages.push("...", current - 1, current, current + 1, "...", total);
  }

  return pages;
}
