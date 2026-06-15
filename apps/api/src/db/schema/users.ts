import { boolean, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  username: varchar('username', { length: 100 }).notNull().unique(),
  displayUsername: text('display_username'),
  createdAt: timestamp('created_at', {
    precision: 6,
    withTimezone: true,
  }).notNull(),
  updatedAt: timestamp('updated_at', {
    precision: 6,
    withTimezone: true,
  }).notNull(),
})
// type User = typeof users.$inferSelect

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  token: varchar('token', { length: 255 }).notNull().unique(),
  expiresAt: timestamp('expires_at', {
    precision: 6,
    withTimezone: true,
  }).notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at', {
    precision: 6,
    withTimezone: true,
  }).notNull(),
  updatedAt: timestamp('updated_at', {
    precision: 6,
    withTimezone: true,
  }).notNull(),
})
// type Session = typeof sessions.$inferSelect

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at', {
    precision: 6,
    withTimezone: true,
  }),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at', {
    precision: 6,
    withTimezone: true,
  }),
  scope: text('scope'),
  idToken: text('id_token'),
  password: text('password'),
  createdAt: timestamp('created_at', {
    precision: 6,
    withTimezone: true,
  }).notNull(),
  updatedAt: timestamp('updated_at', {
    precision: 6,
    withTimezone: true,
  }).notNull(),
})
// type Account = typeof accounts.$inferSelect

export const verifications = pgTable('verifications', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at', {
    precision: 6,
    withTimezone: true,
  }).notNull(),
  createdAt: timestamp('created_at', {
    precision: 6,
    withTimezone: true,
  }).notNull(),
  updatedAt: timestamp('updated_at', {
    precision: 6,
    withTimezone: true,
  }).notNull(),
})
// type Verification = typeof verifications.$inferSelect
