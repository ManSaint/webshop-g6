import { getCategories, getProductsByCategoryId } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    return notFound();
  }

  const products = await getProductsByCategoryId(category.id);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">{category.name}</h1>
        <p className="text-gray-500">{products.length} products</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/customer/products/${product.id}`}
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
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-gray-500 mt-6">Nope. Nothing to see.</p>
      )}
    </main>
  );
}
