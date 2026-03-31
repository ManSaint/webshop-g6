import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type {
  Category,
  Product,
  ProductFormData,
  ProductsResponse,
} from "@/lib/types";
import "server-only";

const supabase = createAdminSupabaseClient();

/**
 * Maps a snake_case Supabase row to the camelCase Product type.
 * The `categories` join is renamed to `category` to match the existing interface.
 */
function mapProduct(row: Record<string, unknown>): Product {
  return {
    id: row.id as number,
    title: row.title as string,
    description: row.description as string,
    categoryId: row.category_id as number,
    category: row.categories
      ? (row.categories as Product["category"])
      : undefined,
    price: Number(row.price),
    discountPercentage: row.discount_percentage
      ? Number(row.discount_percentage)
      : undefined,
    rating: row.rating ? Number(row.rating) : undefined,
    stock: row.stock as number | undefined,
    tags: row.tags as string[] | undefined,
    brand: row.brand as string | undefined,
    sku: row.sku as string | undefined,
    weight: row.weight ? Number(row.weight) : undefined,
    dimensions: row.dimensions as Product["dimensions"],
    warrantyInformation: row.warranty_information as string | undefined,
    shippingInformation: row.shipping_information as string | undefined,
    availabilityStatus: row.availability_status as string | undefined,
    reviews: row.reviews
      ? (row.reviews as Record<string, unknown>[]).map((r) => ({
          rating: r.rating as number,
          comment: r.comment as string,
          date: r.date as string,
          reviewerName: r.reviewer_name as string,
          reviewerEmail: r.reviewer_email as string,
        }))
      : undefined,
    returnPolicy: row.return_policy as string | undefined,
    minimumOrderQuantity: row.minimum_order_quantity as number | undefined,
    meta: {
      createdAt: row.created_at as string,
      updatedAt: row.updated_at as string,
    },
    images: row.images as string[] | undefined,
    thumbnail: row.thumbnail as string,
  };
}

//#region GET

export async function getInventoryProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false });

  if (error) throw new Error(`Supabase error: ${error.message}`);
  return (data || []).map(mapProduct);
}

export async function getProductsFromParams(
  limit: string,
  page: string,
  query: string,
): Promise<ProductsResponse> {
  const pageNum = Number.parseInt(page, 10) || 1;
  const limitNum = Number.parseInt(limit, 10) || 10;
  const from = (pageNum - 1) * limitNum;
  const to = from + limitNum - 1;

  let q = supabase
    .from("products")
    .select("*, categories(*)", { count: "exact" });

  if (query) {
    q = q.ilike("title", `%${query}%`);
  }

  const { data, count, error } = await q
    .range(from, to)
    .order("id", { ascending: false });

  if (error) throw new Error(`Supabase error: ${error.message}`);

  const total = count || 0;
  return {
    products: (data || []).map(mapProduct),
    total,
    limit: limitNum,
    page: pageNum,
    pages: limitNum > 0 ? Math.ceil(total / limitNum) : 1,
  };
}

export async function getProductsWithLimitAndPage(
  limit = "5",
  page = "1",
): Promise<ProductsResponse> {
  return getProductsFromParams(limit, page, "");
}

export async function getProductsFromQuery(
  query: string,
): Promise<ProductsResponse> {
  return getProductsFromParams("10", "1", query);
}

//#endregion

//#region POST

export async function addProduct(
  newProduct: ProductFormData,
): Promise<{ ok: boolean }> {
  // Generate SKU: CAT-BRA-TIT
  const { data: cat } = await supabase
    .from("categories")
    .select("slug")
    .eq("id", newProduct.categoryId)
    .single();

  const catCode = (cat?.slug || "CAT").slice(0, 3).toUpperCase();
  const braCode = (newProduct.brand || "BRD").slice(0, 3).toUpperCase();
  const titleCode = (newProduct.title || "UNK").slice(0, 3).toUpperCase();

  const { error } = await supabase.from("products").insert({
    title: newProduct.title,
    description: newProduct.description,
    price: newProduct.price,
    thumbnail: newProduct.thumbnail,
    category_id: newProduct.categoryId,
    stock: newProduct.stock,
    brand: newProduct.brand,
    sku: `${catCode}-${braCode}-${titleCode}`,
  });

  if (error) console.error("[addProduct]", error.message);
  return { ok: !error };
}

export async function updateProductById(
  id: string,
  product: ProductFormData,
): Promise<{ ok: boolean }> {
  const { error } = await supabase
    .from("products")
    .update({
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      category_id: product.categoryId,
      stock: product.stock,
      brand: product.brand,
      updated_at: new Date().toISOString(),
    })
    .eq("id", Number(id));

  return { ok: !error };
}

export async function deleteProduct(id: string): Promise<{ ok: boolean }> {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", Number(id));

  return { ok: !error };
}

//#endregion

//#region Categories

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) throw new Error(`Supabase error: ${error.message}`);
  return (data || []) as Category[];
}

//#endregion

///////////////////////  Customer ////////////////////////////////

export async function getProducts(
  page = 1,
  limit = 9,
  sort = "id",
  order = "desc",
): Promise<ProductsResponse> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // Map sort field to snake_case if needed
  const sortColumn = sort === "categoryId" ? "category_id" : sort;

  const { data, count, error } = await supabase
    .from("products")
    .select("*, categories(*)", { count: "exact" })
    .order(sortColumn, { ascending: order === "asc" })
    .range(from, to);

  if (error) throw new Error(`Supabase error: ${error.message}`);

  const total = count || 0;
  return {
    products: (data || []).map(mapProduct),
    total,
    limit,
    page,
    pages: limit > 0 ? Math.ceil(total / limit) : 1,
  };
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(*), reviews(*)")
      .eq("id", Number(id))
      .single();

    if (error || !data) return null;

    return mapProduct(data);
  } catch {
    return null;
  }
}

export async function getRelatedProducts(
  categoryId: number,
  excludeId: number,
): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(*)")
      .eq("category_id", categoryId)
      .neq("id", excludeId)
      .limit(4);

    if (error || !data) return [];

    return data.map(mapProduct);
  } catch {
    return [];
  }
}
