import { boolean, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  email_verified: boolean('email_verified').notNull(),
  image: text('image'),
  username: varchar('username', { length: 100 }).notNull().unique(),
  display_username: text('display_username'),
  created_at: timestamp('created_at', {
    precision: 6,
    withTimezone: true,
  }).notNull(),
  updated_at: timestamp('updated_at', {
    precision: 6,
    withTimezone: true,
  }).notNull(),
})
export type User = typeof users.$inferSelect

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  user_id: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  token: varchar('token', { length: 255 }).notNull().unique(),
  expires_at: timestamp('expires_at', {
    precision: 6,
    withTimezone: true,
  }).notNull(),
  ip_address: text('ip_address'),
  user_agent: text('user_agent'),
  created_at: timestamp('created_at', {
    precision: 6,
    withTimezone: true,
  }).notNull(),
  updated_at: timestamp('updated_at', {
    precision: 6,
    withTimezone: true,
  }).notNull(),
})
export type Session = typeof sessions.$inferSelect

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  user_id: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  account_id: text('account_id').notNull(),
  provider_id: text('provider_id').notNull(),
  access_token: text('access_token'),
  refresh_token: text('refresh_token'),
  access_token_expires_at: timestamp('access_token_expires_at', {
    precision: 6,
    withTimezone: true,
  }),
  refresh_token_expires_at: timestamp('refresh_token_expires_at', {
    precision: 6,
    withTimezone: true,
  }),
  scope: text('scope'),
  id_token: text('id_token'),
  password: text('password'),
  created_at: timestamp('created_at', {
    precision: 6,
    withTimezone: true,
  }).notNull(),
  updated_at: timestamp('updated_at', {
    precision: 6,
    withTimezone: true,
  }).notNull(),
})
export type Account = typeof accounts.$inferSelect

export const verifications = pgTable('verifications', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expires_at: timestamp('expires_at', {
    precision: 6,
    withTimezone: true,
  }).notNull(),
  created_at: timestamp('created_at', {
    precision: 6,
    withTimezone: true,
  }).notNull(),
  updated_at: timestamp('updated_at', {
    precision: 6,
    withTimezone: true,
  }).notNull(),
})
export type Verification = typeof verifications.$inferSelect
