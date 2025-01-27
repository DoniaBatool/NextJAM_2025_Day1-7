import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { productId, quantityChange } = await req.json();

    // Validate the request body
    if (!productId || quantityChange === undefined) {
      return NextResponse.json({ error: "Product ID and quantity change are required" }, { status: 400 });
    }

    // Fetch the product by ID
    const product = await client.getDocument(productId);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.quantity === undefined || typeof product.quantity !== "number") {
      return NextResponse.json({ error: "Product quantity is not properly defined in the database" }, { status: 500 });
    }

    // Calculate the new stock value
    const newStock = product.quantity + quantityChange;

    // Ensure stock doesn't go below 0
    if (newStock < 0) {
      return NextResponse.json({ error: "Insufficient stock. Cannot reduce below 0." }, { status: 400 });
    }

    // Update the stock in Sanity
    const updatedProduct = await client.patch(productId).set({ quantity: newStock }).commit();

    return NextResponse.json({ message: "Stock updated successfully", updatedProduct }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating stock:", error);

    // Type guard to check if error is an instance of Error
    if (error instanceof Error) {
      return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


