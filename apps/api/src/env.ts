import { treeifyError, z } from 'zod'

const envSchema = z.object({
  BACKEND_API_PORT: z.coerce.number().default(3333),
  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().default(5432),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_NAME: z.string().min(1),
  BETTER_AUTH_SERVER_URL: z.string().url(),
  BETTER_AUTH_TRUSTED_ORIGINS: z.string().min(1),
  BETTER_AUTH_SECRET: z.string().min(1),
})

const parsed = envSchema.safeParse(process.env)

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
