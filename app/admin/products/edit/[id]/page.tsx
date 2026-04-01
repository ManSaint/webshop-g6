import { notFound } from "next/navigation";
import EditForm from "@/components/admin-ui/edit-form";
import { getProductById } from "@/lib/db";

export default async function UpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  return (
    <main className="bg-[var(--color-bg-muted)] flex justify-center px-6 py-16">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-12 text-center">Edit Product</h1>

        <EditForm product={product} />
      </div>
    </main>
  );
}
