import { Category } from "@/lib/types";
import Link from "next/link";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="relative flex justify-center items-center overflow-hidden border border-(--color-cream) hover:shadow-lg/10 transition bg-cover bg-center aspect-4/3 "
      style={{
        backgroundImage: `url(${category.image})`,
      }}
    >
      <div className="absolute inset-0 bg-neutral-800/40" />

      <div className="relative flex items-center z-10 h-full p-4">
        <h3 className="text-2xl text-(--color-text-inverted) font-normal font-serif tracking-wider">
          {category.name}
        </h3>
      </div>
    </Link>
  );
}
