"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import type { SortOption } from "./collectionClient"

type Props = {
  activeCategories: string[]
  sort: SortOption
}

export default function ActiveFilters({ activeCategories, sort }: Props) {
  const searchParams = useSearchParams()

  const removeCategoryURL = (catToRemove: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("category")
    const remaining = activeCategories.filter((c) => c !== catToRemove && c !== "All")
    for (const c of remaining) params.append("category", c)
    return `?${params.toString()}`
  }

  const removeSortURL = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("sort")
    return `?${params.toString()}`
  }

  const hasActiveCategories = !activeCategories.includes("All") && activeCategories.length > 0

  if (!hasActiveCategories && !sort) return null

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {hasActiveCategories && activeCategories.map((cat) => (
        <span
          key={cat}
          className="flex items-center gap-1 text-xs px-3 py-1 border"
          style={{
            borderColor: "var(--color-border-store)",
            color: "var(--color-charcoal)",
          }}
        >
          {cat}
          <Link href={removeCategoryURL(cat)} className="ml-1 hover:opacity-60">×</Link>
        </span>
      ))}


      {sort && (
        <span
          className="flex items-center gap-1 text-xs px-3 py-1 border"
          style={{
            borderColor: "var(--color-border-store)",
            color: "var(--color-charcoal)",
          }}
        >
          {sort === "low-to-high" ? "Price: Low to High" : "Price: High to Low"}
          <Link href={removeSortURL()} className="ml-1 hover:opacity-60">×</Link>
        </span>
      )}

      <Link
        href="?"
        className="text-xs hover:opacity-60"
        style={{ color: "var(--color-text-muted)" }}
      >
        Clear all
      </Link>
    </div>
  )
}


