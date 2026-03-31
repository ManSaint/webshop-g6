import CreateForm from "@/components/admin-ui/create-form";
import { getCategories } from "@/lib/db";

export default async function CreatePage() {
  const categories = await getCategories();

  return (
    <main className="bg-[var(--color-bg-muted)] flex justify-center px-6 py-16">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-[var(--color-text-strong)] mb-12 text-center">
          Create New Product
        </h1>

        <CreateForm categories={categories} />
      </div>
    </main>
  );
}
