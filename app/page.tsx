import CategoriesGrid from "@/components/categories-grid";
import ProductsGrid from "@/components/products-grid";
import ImageTextCTA from "@/components/ImageTextCTA";
import Hero from "@/components/hero";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (

     <>
      <Hero />
      <ProductsGrid />
      <ImageTextCTA />
      <CategoriesGrid />
    </>
  );
}
