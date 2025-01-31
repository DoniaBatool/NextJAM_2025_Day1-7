import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export const fetchCache = "force-no-store";

export async function POST(req: NextRequest) {
  try {
    const { productId, quantityChange } = await req.json();

    if (!productId || typeof quantityChange !== "number") {
      return NextResponse.json({ error: "Product ID and valid quantity change are required" }, { status: 400 });
    }

    console.log("Fetching product:", productId);

    // Fetch the product by ID
    const product = await client.getDocument(productId);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (typeof product.quantity !== "number") {
      return NextResponse.json({ error: "Invalid product quantity in database" }, { status: 500 });
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

    return NextResponse.json({ message: "Stock updated successfully", newStock }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating stock:", error);

    return NextResponse.json({ error: "Internal server error", details: error instanceof Error ? error.message : "" }, { status: 500 });
  }
}
