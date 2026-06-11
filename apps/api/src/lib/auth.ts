import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { username } from 'better-auth/plugins'
import { db } from '../db/drizzle-client'
import * as schema from '../db/schema'
import { env } from '../env'

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_SERVER_URL,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),
  trustedOrigins: env.BETTER_AUTH_TRUSTED_ORIGINS.split(','),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    username(),
  ],
})
