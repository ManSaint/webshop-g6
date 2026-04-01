"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addProduct, deleteProduct, updateProductById } from "@/lib/db";
import type { ProductFormData } from "@/lib/types";

export type ActionState = {
  message?: string;
  data: unknown;
  errors?: Record<string, string[]>;
  timestamp: number;
} | null;

export async function addProductActionState(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const title = formData.get("title") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;
  const thumbnail = formData.get("thumbnail") as string;
  const categoryId = formData.get("categoryId") as string;
  const stock = formData.get("stock") as string;
  const brand = formData.get("brand") as string;

  const newProduct: ProductFormData = {
    title,
    brand,
    description,
    thumbnail,
    price: parseInt(price, 10),
    categoryId: parseInt(categoryId, 10),
    stock: parseInt(stock, 10),
  };

  if (!/^https?:\/\/.+/.test(newProduct.thumbnail)) {
    const state: ActionState = {
      data: newProduct,
      errors: {
        thumbnail: [
          "Please enter a valid image URL starting with http or https",
        ],
      },
      timestamp: Date.now(),
    };
    return state;
  }

  if (newProduct.price < 10 || newProduct.price > 100_000) {
    return {
      data: newProduct,
      errors: { price: ["Price must be between 10 and 100,000"] },
      timestamp: Date.now(),
    };
  }

  //   if (title.length < 3 || title.length > 20) {
  //   return {
  //     message: "Title must be between 3 and 20 characters",
  //     data: newProduct,
  //     timestamp: Date.now(),
  //   };
  // }

  try {
    await addProduct(newProduct);
  } catch (error) {
    return {
      message: "Something went wrong... " + (error instanceof Error ? error.message : ""),
      data: newProduct,
      timestamp: Date.now(),
    };
  }

  revalidatePath("/");
  redirect("/?status=success");
}

export async function updateProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;
  const thumbnail = formData.get("thumbnail") as string;
  const categoryId = formData.get("categoryId") as string;
  const stock = formData.get("stock") as string;
  const brand = formData.get("brand") as string;

  const newProduct = {
    title,
    brand,
    description,
    thumbnail,
    price: parseInt(price, 10),
    categoryId: parseInt(categoryId, 10),
    stock: parseInt(stock, 10),
  };

  try {
    await updateProductById(id, newProduct);
  } catch (error) {
    throw error;
  }

  revalidatePath("/");
  redirect("/?status=updated");
}

/* Delete product */

export async function deleteProductActionState(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const id = formData.get("id") as string;

  try {
    await deleteProduct(id);
  } catch (error) {
    return {
      message: "Failed to delete product: " + (error instanceof Error ? error.message : ""),
      data: null,
      timestamp: Date.now(),
    };
  }

  revalidatePath("/", "layout");

  return {
    message: "Product deleted successfully",
    data: null,
    timestamp: Date.now(),
  };
}
