"use client"
import type { Product } from "@/lib/types"
import Sidebar from "./sidebar"
import ProductGrid from "./ProductGrid";
import ActiveFilters from "./filters"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import Pagination from "@/components/customer-ui/pagination"

import { useState } from "react"


export type SortOption = "low-to-high" | "high-to-low" 
 
const CATEGORIES = [
  "All",
  "Beauty",
  "Fragrances",
  "Furniture",
  "Groceries",
  "Home Decoration",
  "Kitchen Accessories",
  "Laptops",
  "Men's Shirts",
  "Men's Shoes",
  "Men's Watches",
  "Mobile Accessories",
  "Motorcycle",
  "Skin Care",
  "Smartphones",
  "Sports Accessories",
  "Sunglasses",
  "Tablets",
  "Tops",
  "Vehicle",
  "Women's Bags",
  "Women's Dresses",
  "Women's Jewellery",
  "Women's Shoes",
  "Women's Watches",
]

const ITEMS_PER_PAGE = 9

type Props = {
  allProducts: Product[]
  selectedCategories: string[]
  sortOrder: string
}
 
export default function CollectionClient({ allProducts, selectedCategories, sortOrder }: Props) {
  const [searchQuery, setSearchQuery] = useState("")
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1

  let filtered = selectedCategories.includes("All")
    ? allProducts
    : allProducts.filter((p) =>
        selectedCategories.some((cat) =>
          p.category?.name?.toLowerCase() === cat.toLowerCase()
        )
      )


  if (searchQuery.trim()) {
    filtered = filtered.filter((p) =>
      p.title?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  if (sortOrder === "low-to-high") {
    filtered = [...filtered].sort((a, b) => a.price - b.price)
  } else if (sortOrder === "high-to-low") {
    filtered = [...filtered].sort((a, b) => b.price - a.price)
  }

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const safePage = Math.max(1, Math.min(currentPage, totalPages || 1))
  const paginatedProducts = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  )

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-cream)" }}>
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "var(--color-text-muted)" }}>
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span style={{ color: "var(--color-charcoal)" }}>New Arrivals</span>
        </div>

        <h1 className="text-4xl mb-1"
          style={{ fontFamily: "var(--font-serif)", color: "var(--color-darkbrown)" }}>
          New Arrivals
        </h1>

     
      <div className="mb-4 flex justify-end">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full max-w-sm text-sm px-4 py-2 border outline-none"
            style={{
              borderColor: "var(--color-border-store)",
              color: "var(--color-charcoal)",
              backgroundColor: "var(--color-cream)",
            }}
          />
        </div>

        <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>
          {filtered.length} pieces
        </p>

        <ActiveFilters
          activeCategories={selectedCategories}
          sort={sortOrder as SortOption}
        />

        <div className="flex gap-10">
          <Sidebar
            categories={CATEGORIES}
            selectedCategories={selectedCategories}
            sort={sortOrder as SortOption}
          />
          <div className="flex-1">
            <ProductGrid products={paginatedProducts} />
            <Pagination totalPages={totalPages} />
          </div>
        </div>

      </div>
    </div>
  )
}