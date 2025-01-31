

import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export const fetchCache = "force-no-store";

export async function POST(req: NextRequest) {
  try {
    const { productId, quantityChange } = await req.json();

    if (!productId || quantityChange === undefined) {
      return NextResponse.json({ error: "Product ID and quantity change are required" }, { status: 400 });
    }

    console.log("Fetching product:", productId);

    // Fetch the product by ID
    const product = await client.getDocument(productId);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.quantity === undefined || typeof product.quantity !== "number") {
      return NextResponse.json({ error: "Product quantity is not properly defined in the database" }, { status: 500 });
    }

    console.log(`Current stock: ${product.quantity}, Change requested: ${quantityChange}`);

    // Calculate new stock
    const newStock = product.quantity + quantityChange;

    if (newStock < 0) {
      return NextResponse.json({ error: "Insufficient stock. Cannot reduce below 0." }, { status: 400 });
    }

    console.log(`Updating stock for ${productId} to ${newStock}`);

    // Update stock in Sanity with proper write permissions
    const updatedProduct = await client
      .patch(productId)
      .set({ quantity: newStock })
      .commit({ autoGenerateArrayKeys: true });

    console.log("Stock updated successfully:", updatedProduct);

    return NextResponse.json({ message: "Stock updated successfully", updatedProduct }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating stock:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}



