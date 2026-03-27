"use client"

import ProductCard from "@/components/product-card"
import type { Product } from "@/lib/types"

type Props = {
  products: Product[]
}

export default function ProductGrid({ products }: Props) {


  return (
    <div className="flex-1">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <li key={product.id} className="w-full">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  )
}