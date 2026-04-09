import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/types"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group" data-testid="product-card">
      <Link href={`/customer/products/${product.id}`}>
        
    

        <div className="overflow-hidden relative w-full aspect-[2.7/3.6]  bg-[var(--color-beige)]">
        <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-contain transition duration-500 group-hover:scale-105"
        />
        </div>

        <div className="mt-4 flex items-center justify-between">
          
          <h3
            className="text-xs tracking-wide"
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--color-charcoal)",
            }}
          >
            {product.title}
          </h3>

          <p
            className="text-xs"
            style={{
              color: "var(--color-text-secondary)",
            }}
          >
            ${product.price}
          </p>

        </div>

      </Link>
    </div>
  )
}











   
        {/* <div
        className="overflow-hidden relative w-full"
        style={{
            backgroundColor: "var(--color-beige)",
            height: "600px",  
            //  width: "400px",
        }}
        >
        <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-contain transition duration-500 group-hover:scale-105"
        />
        </div> */}