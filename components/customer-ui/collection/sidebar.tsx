"use client"
import type { SortOption } from "./collectionClient"
import { useSearchParams, useRouter } from "next/navigation"


type Props = {
  categories: string[]
  selectedCategories: string[]
  sort: SortOption
}
 
export default function Sidebar({ categories, selectedCategories, sort }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
 
  const selectCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("category")
 
    if (cat === "All") {
      router.push(`?${params.toString()}`)
      return
    }
 
    const current = selectedCategories.filter((c) => c !== "All")
    const next = current.includes(cat)
      ? current.filter((c) => c !== cat)
      : [...current, cat]
 
    for (const c of next) params.append("category", c)
    router.push(`?${params.toString()}`)
  }
 
  const selectSort = (s: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (s) params.set("sort", s)
    else params.delete("sort")
    router.push(`?${params.toString()}`)
  }
 
  return (
    <aside className="w-48 shrink-0">
 
      <div className="mb-8">
        <p className="text-xs tracking-widest font-semibold mb-4"
          style={{ color: "var(--color-charcoal)" }}>
          CATEGORY
        </p>
        <ul className="space-y-2">
          {categories.map((cat) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<li
              key={cat}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => selectCategory(cat)}
            >
              <input
                type="checkbox"
                checked={
                  cat === "All"
                    ? selectedCategories.includes("All")
                    : selectedCategories.includes(cat)
                }
                readOnly
                className="accent-stone-700 w-3.5 h-3.5 cursor-pointer"
              />
              <span className="text-sm" style={{ color: "var(--color-charcoal)" }}>
                {cat}
              </span>
            </li>
          ))}
        </ul>
      </div>
 
      <div>
        <p className="text-xs tracking-widest font-semibold mb-4"
          style={{ color: "var(--color-charcoal)" }}>
          SORT BY
        </p>
        <ul className="space-y-2">
          {[
            { label: "Price: Low to High", value: "low-to-high" },
            { label: "Price: High to Low", value: "high-to-low" },
          ].map((option) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<li
              key={option.value}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => selectSort(option.value)}
            >
              <input
                type="radio"
                checked={sort === option.value}
                readOnly
                className="accent-stone-700 w-3.5 h-3.5 cursor-pointer"
              />
              <span className="text-sm" style={{ color: "var(--color-charcoal)" }}>
                {option.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
 
    </aside>
  )
}
 