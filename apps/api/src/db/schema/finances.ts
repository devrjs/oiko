import {
  doublePrecision,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import { users } from './users'

export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  description: text('description').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  user_id: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
})
export type Category = typeof categories.$inferSelect

export const finances = pgTable('finances', {
  id: uuid('id').defaultRandom().primaryKey(),
  description: text('description').notNull(),
  amount: doublePrecision('amount').notNull(),
  date: timestamp('date').notNull(),
  type: text('type').notNull(), // "income" | "expense"
  created_at: timestamp('created_at').defaultNow().notNull(),
  category_id: uuid('category_id').references(() => categories.id, {
    onDelete: 'set null',
  }),
  user_id: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
})
export type Finances = typeof finances.$inferSelect

export const goals = pgTable('goals', {
  id: uuid('id').defaultRandom().primaryKey(),
  starting_amount: doublePrecision('starting_amount').notNull(),
  target_amount: doublePrecision('target_amount').notNull(),
  target_date: timestamp('target_date').notNull(),
  category_id: uuid('category_id')
    .unique()
    .references(() => categories.id, { onDelete: 'set null' }),
  user_id: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
})
export type Goals = typeof goals.$inferSelect
