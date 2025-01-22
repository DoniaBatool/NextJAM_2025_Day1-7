// sanityClient.ts
import { createClient } from '@sanity/client';
import dotenv from "dotenv"

dotenv.config()
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Replace with your project ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,        // Or your dataset name
  apiVersion: '2025-01-14',     // Today's date or latest API version
  useCdn: false,                // Disable CDN for real-time updates
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
});