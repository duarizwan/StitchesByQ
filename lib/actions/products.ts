"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { Product, ProductInsert } from "@/types/supabase";

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return products || [];
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient();

  const productData: any = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: parseFloat(formData.get("price") as string),
    category: formData.get("category") as string,
    image_url: formData.get("image_url") as string,
    features: JSON.parse((formData.get("features") as string) || "[]"),
  };

  const { error } = await (supabase as any).from("products").insert([productData]);

  if (error) {
    throw new Error(`Failed to create product: ${error.message}`);
  }

  revalidatePath("/admin/products");
  return { success: true };
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    throw new Error(`Failed to delete product: ${error.message}`);
  }

  revalidatePath("/admin/products");
  return { success: true };
}
