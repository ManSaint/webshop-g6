import { getProducts } from "@/lib/db";
import ProductCard from "./product-card";

type Props = {
  limit?: number
}

export default async function ProductsGrid({ limit = 3 }: Props) {
  const { products } = await getProducts(1, limit)

  return (
    <section
      className="py-20"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <div className="max-w-6xl mx-auto px-6">

     
        <div className="text-center mb-14 space-y-3">
          <h2 className="text-4xl"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--color-darkbrown)",
            }}
          >
            New Arrivals
          </h2>

          <p
            className="text-sm"
            style={{
              color: "var(--color-text-muted)",
            }}
          >
            Thoughtfully designed pieces for every occasion,
              <br />
            crafted from the finest materials.
          </p>
        </div>


        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
        {products.map((product) => (
            <li key={product.id} className="w-full">
            <ProductCard product={product} />
            </li>
        ))}
        </ul>

        <div className="text-center mt-16">
          <button
            className="text-xs tracking-widest border-b pb-1 transition hover:opacity-70"
            style={{
               color: "var(--color-charcoal)",
              borderColor: "var(--color-border-store)",
            }}
          >
             VIEW ALL NEW ARRIVALS
          </button>
        </div>

      </div>
    </section>
  )
}