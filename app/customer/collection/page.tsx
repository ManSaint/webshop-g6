import CollectionClient from "@/components/customer-ui/collection/collectionClient"
import { getProducts } from "@/lib/db"
import { Suspense } from "react"

type Props = {
  searchParams: Promise<{ category?: string | string[]; sort?: string }>
}
 

export default async function CollectionPage({ searchParams }: Props) {
  const { products } = await getProducts(1,20)
  const { category, sort } = await searchParams
 
  const selectedCategories = category
    ? Array.isArray(category) ? category : [category]
    : ["All"]
 
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm tracking-widest" style={{ color: "var(--color-text-muted)" }}>
          Loading collection...
        </p>
      </div>
    }>
      <CollectionClient
        allProducts={products}
        selectedCategories={selectedCategories}
        sortOrder={sort ?? ""}
      />
    </Suspense>
  )
}
