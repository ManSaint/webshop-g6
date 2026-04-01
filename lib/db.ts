import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type { CartItem, Category, Product, ProductFormData, ProductsResponse, WishlistItem } from "@/lib/types";
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
    category: row.categories ? (row.categories as Product["category"]) : undefined,
    price: Number(row.price),
    discountPercentage: row.discount_percentage ? Number(row.discount_percentage) : undefined,
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
  const { data, error } = await supabase.from("products").select("*").order("id", { ascending: false });

  if (error) throw new Error(`Supabase error: ${error.message}`);
  return (data || []).map(mapProduct);
}

export async function getProductsFromParams(limit: string, page: string, query: string): Promise<ProductsResponse> {
  const pageNum = Number.parseInt(page, 10) || 1;
  const limitNum = Number.parseInt(limit, 10) || 10;
  const from = (pageNum - 1) * limitNum;
  const to = from + limitNum - 1;

  let q = supabase.from("products").select("*, categories(*)", { count: "exact" });

  if (query) {
    q = q.ilike("title", `%${query}%`);
  }

  const { data, count, error } = await q.range(from, to).order("id", { ascending: false });

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

export async function getProductsWithLimitAndPage(limit = "5", page = "1"): Promise<ProductsResponse> {
  return getProductsFromParams(limit, page, "");
}

export async function getProductsFromQuery(query: string): Promise<ProductsResponse> {
  return getProductsFromParams("10", "1", query);
}

//#endregion

//#region POST

export async function addProduct(newProduct: ProductFormData): Promise<{ ok: boolean }> {
  // Generate SKU: CAT-BRA-TIT
  const { data: cat } = await supabase.from("categories").select("slug").eq("id", newProduct.categoryId).single();

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

export async function updateProductById(id: string, product: ProductFormData): Promise<{ ok: boolean }> {
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
  const { error } = await supabase.from("products").delete().eq("id", Number(id));

  return { ok: !error };
}

//#endregion

//#region Categories

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from("categories").select("*").order("name");

  if (error) throw new Error(`Supabase error: ${error.message}`);
  return (data || []) as Category[];
}

//#endregion

///////////////////////  Customer ////////////////////////////////

export async function getProducts(page = 1, limit = 9, sort = "id", order = "desc"): Promise<ProductsResponse> {
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

export async function getRelatedProducts(categoryId: number, excludeId: number): Promise<Product[]> {
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

//#region Batch product fetch

export async function getProductsByIds(ids: number[]): Promise<Product[]> {
  if (ids.length === 0) return [];

  const { data, error } = await supabase
    .from("products")
    .select("*, categories(*)")
    .in("id", ids);

  if (error) throw new Error(`Supabase error: ${error.message}`);
  return (data || []).map(mapProduct);
}

//#endregion

//#region Wishlist

export async function getWishlistItems(userId: string): Promise<WishlistItem[]> {
  const { data, error } = await supabase
    .from("wishlist")
    .select("product_id")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Supabase error: ${error.message}`);
  return (data || []).map((row) => ({ productId: row.product_id as number }));
}

export async function addWishlistItem(userId: string, productId: number): Promise<{ ok: boolean }> {
  const { error } = await supabase
    .from("wishlist")
    .upsert({ user_id: userId, product_id: productId }, { onConflict: "user_id,product_id" });

  if (error) console.error("[addWishlistItem]", error.message);
  return { ok: !error };
}

export async function removeWishlistItem(userId: string, productId: number): Promise<{ ok: boolean }> {
  const { error } = await supabase
    .from("wishlist")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);

  if (error) console.error("[removeWishlistItem]", error.message);
  return { ok: !error };
}

export async function mergeWishlistItems(userId: string, productIds: number[]): Promise<{ ok: boolean }> {
  if (productIds.length === 0) return { ok: true };

  const rows = productIds.map((pid) => ({ user_id: userId, product_id: pid }));
  const { error } = await supabase
    .from("wishlist")
    .upsert(rows, { onConflict: "user_id,product_id" });

  if (error) console.error("[mergeWishlistItems]", error.message);
  return { ok: !error };
}

//#endregion

//#region Cart

export async function getCartItems(userId: string): Promise<CartItem[]> {
  const { data, error } = await supabase
    .from("cart")
    .select("product_id, quantity, price_at_add")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Supabase error: ${error.message}`);
  return (data || []).map((row) => ({
    productId: row.product_id as number,
    quantity: row.quantity as number,
    priceAtAdd: Number(row.price_at_add),
  }));
}

export async function upsertCartItem(
  userId: string,
  item: CartItem,
): Promise<{ ok: boolean }> {
  const { error } = await supabase
    .from("cart")
    .upsert(
      {
        user_id: userId,
        product_id: item.productId,
        quantity: item.quantity,
        price_at_add: item.priceAtAdd,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,product_id" },
    );

  if (error) console.error("[upsertCartItem]", error.message);
  return { ok: !error };
}

export async function removeCartItem(userId: string, productId: number): Promise<{ ok: boolean }> {
  const { error } = await supabase
    .from("cart")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);

  if (error) console.error("[removeCartItem]", error.message);
  return { ok: !error };
}

export async function clearCartItems(userId: string): Promise<{ ok: boolean }> {
  const { error } = await supabase
    .from("cart")
    .delete()
    .eq("user_id", userId);

  if (error) console.error("[clearCartItems]", error.message);
  return { ok: !error };
}

export async function updateCartItemQuantity(
  userId: string,
  productId: number,
  quantity: number,
): Promise<{ ok: boolean }> {
  if (quantity <= 0) {
    return removeCartItem(userId, productId);
  }

  const { error } = await supabase
    .from("cart")
    .update({ quantity, updated_at: new Date().toISOString() })
    .eq("user_id", userId)
    .eq("product_id", productId);

  if (error) console.error("[updateCartItemQuantity]", error.message);
  return { ok: !error };
}

export async function mergeCartItems(
  userId: string,
  localItems: CartItem[],
): Promise<{ ok: boolean }> {
  if (localItems.length === 0) return { ok: true };

  const serverItems = await getCartItems(userId);
  const serverMap = new Map(serverItems.map((i) => [i.productId, i]));

  const upsertRows = localItems.map((local) => {
    const existing = serverMap.get(local.productId);
    return {
      user_id: userId,
      product_id: local.productId,
      quantity: existing ? existing.quantity + local.quantity : local.quantity,
      price_at_add: existing ? existing.priceAtAdd : local.priceAtAdd,
      updated_at: new Date().toISOString(),
    };
  });

  const { error } = await supabase
    .from("cart")
    .upsert(upsertRows, { onConflict: "user_id,product_id" });

  if (error) console.error("[mergeCartItems]", error.message);
  return { ok: !error };
}

//#endregion
