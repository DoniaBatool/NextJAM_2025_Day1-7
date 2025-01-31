import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export const fetchCache = "force-no-store";

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

    if (typeof product.quantity !== "number") {
      return NextResponse.json({ error: "Invalid product quantity in database" }, { status: 500 });
    }

    // Return the stock quantity of the product
    return NextResponse.json({ stock: product.quantity }, { status: 200 });
  } catch (error) {
    console.error("Error fetching stock:", error);
    return NextResponse.json({ error: "Internal server error", details: error instanceof Error ? error.message : "" }, { status: 500 });
  }
}
