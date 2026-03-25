import { notFound } from "next/navigation";
import { getProductById, getRelatedProducts } from "@/lib/db";
import ProductBreadcrumb from "@/components/customer-ui/product-detail/product-breadcrumb";
import ProductImageGallery from "@/components/customer-ui/product-detail/product-image-gallery";
import ProductInfo from "@/components/customer-ui/product-detail/product-info";
import ProductReviews from "@/components/customer-ui/product-detail/product-reviews";
import RelatedProducts from "@/components/customer-ui/product-detail/related-products";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.categoryId,
    product.id
  );

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

      <ProductReviews product={product} />
      <RelatedProducts products={relatedProducts} />
    </main>
  );
}
