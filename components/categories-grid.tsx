import { getCategories } from "@/lib/db";
import CategoryCard from "./categories-card";

export default async function CategoriesGrid() {
  const categories = await getCategories();

  const selectedSlugs = [
    "beauty",
    "home-decoration",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "womens-jewellery",
  ];

  const filteredCategories = categories.filter((cat) =>
    selectedSlugs.includes(cat.slug),
  );

  return (
    <section className="flex flex-col gap-4 w-full container mx-auto py-10">
      <h2 className="mx-auto text-(--color-darkbrown) text-3xl md:text-5xl font-serif px-2 py-6">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
