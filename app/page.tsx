import CategoryCard from "@/components/categories-card";
import CategoriesGrid from "@/components/categories-grid";
import ImageTextCTA from "@/components/ImageTextCTA";
import data from "@/server/products.json";

const categories = data.categories;

export default async function Home() {
  return (
    <main>
      <ImageTextCTA />

      {/*       {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))} */}

      <CategoriesGrid />
    </main>
  );
}
