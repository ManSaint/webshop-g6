import { API_URL } from "@/lib/config";
import type { Product, ProductFormData, ProductsResponse } from "@/lib/types";
import "server-only";

//#region GET

export async function getInventoryProducts() {
  const response = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return data.products || [];
}

export async function getProductsFromParams(
  limit: string,
  page: string,
  query: string,
): Promise<ProductsResponse> {
  const params = new URLSearchParams({
    _limit: limit.toString(),
    _page: page.toString(),
    q: query.toString(),
  });

  try {
    const response = await fetch(`${API_URL}/products/?${params}`).then((res) =>
      res.json(),
    );

    return response;
  } catch {
    throw new Error("Api is down eh");
  }
}

export async function getProductsWithLimitAndPage(
  limit = "5",
  page = "1",
): Promise<ProductsResponse> {
  const params = new URLSearchParams({
    _limit: limit.toString(),
    _page: page.toString(),
  });

  try {
    const response = await fetch(`${API_URL}/products/?${params}`).then((res) =>
      res.json(),
    );

    return await response;
  } catch {
    throw new Error("Api is down eh");
  }
}

export async function getProductsFromQuery(
  query: string,
): Promise<ProductsResponse> {
  try {
    const response = await fetch(`${API_URL}/products/?q=${query}`).then(
      (res) => res.json(),
    );

    return await response;
  } catch {
    throw new Error("Api is down eh");
  }
}

//#endregion

//#region POST

export async function addProduct(newProduct: ProductFormData) {
  const res = await fetch(`${API_URL}/products/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });

  // const data = await res.json();
  // console.log("Added product:", data);

  return res;
}


export async function updateProductById(id: string, product: ProductFormData) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  return res;
}
//#endregion


///////////////////////  Customer ////////////////////////////////

export async function getProducts(
  page = 1,
  limit = 8,
  sort = "id",
  order = "desc"
): Promise<ProductsResponse> {

  const params = new URLSearchParams({
    _page: page.toString(),
    _limit: limit.toString(),
    _sort: sort,
    _order: order,
    _expand: "category",
  });

  try {
    const response = await fetch(
      `${API_URL}/products?${params}`

    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return await response.json();

  } catch {
    throw new Error("API is down...");
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await fetch(
      `${API_URL}/products/${id}?_expand=category`,
      { cache: "no-store" }
    );

    if (!response.ok) return null;

    return await response.json();
  } catch {
    return null;
  }
}

export async function getRelatedProducts(
  categoryId: number,
  excludeId: number
): Promise<Product[]> {
  try {
    const response = await fetch(
      `${API_URL}/products?categoryId=${categoryId}&_limit=5&_expand=category`,
      { cache: "no-store" }
    );

    if (!response.ok) return [];

    const data = await response.json();
    const products: Product[] = data.products || data;
    return products.filter((p) => p.id !== excludeId).slice(0, 4);
  } catch {
    return [];
  }
}
