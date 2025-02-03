export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-14'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token= assertValue(
  process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  'Missing environment variable: NEXT_PUBLIC_SANITY_API_TOKEN'
)

export const gemini= assertValue(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  'Missing environment variable: NEXT_PUBLIC_GEMINI_API_KEY'
)

export const apiurl= assertValue(
  process.env.NEXT_PUBLIC_API_URL,
  'Missing environment variable: NEXT_PUBLIC_API_URL'
)
export const shippo= assertValue(
  process.env.NEXT_PUBLIC_SHIPPO_API_KEY,
  'Missing environment variable: NEXT_PUBLIC_SHIPPO_API_KEY'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
