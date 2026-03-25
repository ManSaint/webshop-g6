import CategoryCard from "@/components/categories-card";
import CategoriesGrid from "@/components/categories-grid";
import ProductsGrid from "@/components/products-grid";
import ImageTextCTA from "@/components/ImageTextCTA";
import data from "@/server/products.json";

const categories = data.categories;

export default async function Home() {

  return (
    <main> 
      <ProductsGrid />
       <ImageTextCTA /> 
      <CategoriesGrid />

    </main>
  );
}
