

import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Get the productId from the URL query parameters
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Fetch the product from Sanity
    const product = await client.getDocument(productId);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Return the stock quantity of the product
    return NextResponse.json({ stock: product.quantity }, { status: 200 });
  } catch (error) {
    console.error("Error fetching stock:", error);
    return NextResponse.json({ error: "Error fetching stock" }, { status: 500 });
  }
}