import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getProductById, getRelatedProducts } from "@/lib/db"
import { unstable_cache } from "next/cache"
import ProductBreadcrumb from "@/components/customer-ui/product-detail/product-breadcrumb"
import ProductImageGallery from "@/components/customer-ui/product-detail/product-image-gallery"
import ProductInfo from "@/components/customer-ui/product-detail/product-info"
import ProductReviews from "@/components/customer-ui/product-detail/product-reviews"
import RelatedProducts from "@/components/customer-ui/product-detail/related-products"

const getCachedProduct = unstable_cache(
  async (id: string) => getProductById(id),
  ["product"],
  { revalidate: 60 }
)

const getCachedRelated = unstable_cache(
  async (categoryId: number, excludeId: number) => getRelatedProducts(categoryId, excludeId),
  ["related-products"],
  { revalidate: 60 }
)

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getCachedProduct(id)

  if (!product) notFound()

  const relatedProducts = await getCachedRelated(product.categoryId, product.id)

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <ProductBreadcrumb
        category={product.category}
        productTitle={product.title}
      />
      <div className="lg:flex lg:gap-12 xl:gap-16">
        <ProductImageGallery
          images={product.images ?? []}
          thumbnail={product.thumbnail}
          title={product.title}
          discountPercentage={product.discountPercentage}
        />
        <ProductInfo product={product} />
      </div>
      <Suspense fallback={<p className="text-sm mt-8" style={{ color: "var(--color-text-muted)" }}>Loading reviews...</p>}>
        <ProductReviews product={product} />
      </Suspense>
      <Suspense fallback={<p className="text-sm mt-8" style={{ color: "var(--color-text-muted)" }}>Loading related products...</p>}>
        <RelatedProducts products={relatedProducts} />
      </Suspense>
    </main>
  )
}