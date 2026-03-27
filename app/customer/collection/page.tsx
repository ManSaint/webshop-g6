import CollectionClient from "@/components/customer-ui/collection/collectionClient"
import { getProducts } from "@/lib/db"

type Props = {
  searchParams: Promise<{ category?: string | string[]; sort?: string }>
}
 

export default async function CollectionPage({ searchParams }: Props) {
  const { products } = await getProducts(1,200)
  const { category, sort } = await searchParams
 
  const selectedCategories = category
    ? Array.isArray(category) ? category : [category]
    : ["All"]
 
  return (
    <CollectionClient
      allProducts={products}
      selectedCategories={selectedCategories}
      sortOrder={sort?? ""}
    />
  )
}