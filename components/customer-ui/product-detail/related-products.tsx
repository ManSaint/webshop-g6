import type { Product } from "@/lib/types";
import ProductCard from "@/components/product-card";

export default function RelatedProducts({
  products,
}: {
  products: Product[];
}) {
  if (products.length === 0) return null;

  return (
    <section
      className="mt-20 pt-12 border-t"
      style={{ borderColor: "var(--color-border-store)" }}
    >
      <h2
        className="text-2xl lg:text-3xl font-medium mb-10"
        style={{
          fontFamily: "var(--font-serif)",
          color: "var(--color-darkbrown)",
        }}
      >
        You May Also Like
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
