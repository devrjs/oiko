import { treeifyError, z } from 'zod'

const isServer = typeof window === 'undefined'

const envSchema = z.object({
  NEXT_PUBLIC_BACKEND_API_URL: z.url(),
  INTERNAL_BACKEND_API_URL: isServer ? z.url() : z.url().optional(),
})

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_BACKEND_API_URL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  INTERNAL_BACKEND_API_URL: process.env.INTERNAL_BACKEND_API_URL,
})

if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables:',
    Object.fromEntries(
      Object.entries(treeifyError(parsed.error).properties ?? {}).map(
        ([k, v]) => [k, v.errors]
      )
    )
  )
  throw new Error('Invalid environment variables')
}

export const env = parsed.data
