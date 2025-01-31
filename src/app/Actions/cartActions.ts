"use server";

import { revalidatePath } from "next/cache";

// Fetch stock from database
export async function getStockAction(productId: string): Promise<number> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getStock?productId=${productId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      console.error("Error fetching stock:", await res.text());
      return 0;
    }

    const data = await res.json();
    return data.stock ?? 0;
  } catch (error) {
    console.error("Error fetching stock:", error);
    return 0;
  }
}

// Update stock in the database
export async function updateStockAction(productId: string, quantityChange: number): Promise<number> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/updateStock`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantityChange }),
    });

    if (!res.ok) {
      console.error("Error updating stock:", await res.text());
      return 0;
    }

    const data = await res.json();

    // Revalidate the cart page to get fresh stock data
    revalidatePath("/cart");

    return data.newStock ?? 0;
  } catch (error) {
    console.error("Error updating stock:", error);
    return 0;
  }
}
