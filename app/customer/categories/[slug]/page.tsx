import data from "@/server/products.json";
import type { Category, Product } from "@/lib/types";
import Image from "next/image";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categories: Category[] = data.categories;
  const products: Product[] = data.products;

  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    return notFound();
  }

  const filteredProducts = products.filter(
    (product) => product.categoryId === category.id,
  );

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">{category.name}</h1>
        <p className="text-gray-500">{filteredProducts.length} products</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-2xl overflow-hidden hover:shadow-md transition"
          >
            <div className="relative w-full h-48">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4">
              <h2 className="text-sm font-medium line-clamp-2">
                {product.title}
              </h2>
              <p className="mt-2 font-semibold">${product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* if no result */}
      {filteredProducts.length === 0 && (
        <p className="text-gray-500 mt-6">Nope. Nothing to see.</p>
      )}
    </main>
  );
}

export async function generateStaticParams() {
  const categories = data.categories;

  return categories.map((category) => ({
    slug: category.slug,
  }));
}
