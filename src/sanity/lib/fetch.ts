import { client } from "../../../sanity-migration/sanityClient";

export async function sanityFetch({
  query,
  params,
}: {
  query: string;
  params?: Record<string, unknown>; // For generic key-value pairs
}) {
  return await client.fetch(query, params, { cache: "no-store" });
}

//const products: Product[] = await sanityFetch({ query:  });
//const data :Product= await sanityFetch({ query: });


import { allproducts } from "@/sanity/lib/queries";

export async function fetchAllProducts() {
  return await sanityFetch({ query: allproducts });
}

