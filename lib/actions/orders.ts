"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { Order, OrderStatus } from "@/types/supabase";

export async function getUserOrders(userId: string | null): Promise<Order[]> {
  if (!userId) {
    return [];
  }

  const supabase = await createClient();

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  return orders || [];
}

export async function createOrder(orderData: any) {
  const supabase = await createClient();

  const { data: order, error } = await supabase
    .from("orders")
    .insert(orderData)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create order: ${error.message}`);
  }

  revalidatePath("/dashboard");
  return order;
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const supabase = await createClient();

  const updateData: any = {
    status,
    updated_at: new Date().toISOString(),
  };

  const { error } = await (supabase as any)
    .from("orders")
    .update(updateData)
    .eq("id", orderId);

  if (error) {
    throw new Error(`Failed to update order: ${error.message}`);
  }

  revalidatePath("/admin/orders");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function getAllOrders(): Promise<Order[]> {
  const supabase = await createClient();

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all orders:", error);
    return [];
  }

  return orders || [];
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  const supabase = await createClient();

  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (error) {
    console.error("Error fetching order:", error);
    return null;
  }

  return order;
}
