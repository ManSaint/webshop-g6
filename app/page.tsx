import CategoriesGrid from "@/components/categories-grid";
import ProductsGrid from "@/components/products-grid";
import ImageTextCTA from "@/components/ImageTextCTA";
import Hero from "@/components/hero";

export default async function Home() {
  return (
    <main>
      <Hero />
      <ProductsGrid />
      <ImageTextCTA />
      <CategoriesGrid />
    </main>
  );
}
