import { and, count, desc, eq, ilike, inArray } from 'drizzle-orm'
import { Elysia, t } from 'elysia'
import { db } from '../db/drizzle-client'
import { finances } from '../db/schema'
import { isAuthenticated } from './auth-middleware'

export const financeRoutes = new Elysia()
  .use(isAuthenticated)
  .post(
    '/add/finance',
    async ({ body, session }) => {
      const { description, amount, date, type, category_id } = body
      const user_id = session?.user?.id
      if (!user_id) return

      const [new_finance] = await db
        .insert(finances)
        .values({
          description,
          amount,
          date: new Date(date),
          type,
          user_id: user_id,
          category_id: category_id === '' ? null : category_id,
        })
        .returning()

      return new_finance
    },
    {
      body: t.Object({
        description: t.String(),
        amount: t.Number(),
        date: t.String(),
        type: t.String(),
        category_id: t.Optional(t.String()),
      }),
      detail: {
        summary: 'Adicionar uma nova transação financeira',
        tags: ['Finanças'],
        responses: {
          200: {
            description: 'Transação adicionada com sucesso',
          },
          401: {
            description: 'Não autorizado',
          },
        },
      },
    }
  )
  .post(
    '/edit/finance',
    async ({ body, session }) => {
      const { finance_id, description, amount, date, type, category_id } = body
      const user_id = session?.user?.id
      if (!user_id) return

      const [updated_finance] = await db
        .update(finances)
        .set({
          description,
          amount,
          date: new Date(date),
          type,
          category_id: category_id === '' ? null : category_id,
        })
        .where(and(eq(finances.id, finance_id), eq(finances.user_id, user_id)))
        .returning()

      return updated_finance
    },
    {
      body: t.Object({
        finance_id: t.String(),
        description: t.String(),
        amount: t.Number(),
        date: t.String(),
        type: t.String(),
        category_id: t.Optional(t.String()),
      }),
      detail: {
        summary: 'Editar uma transação financeira existente',
        tags: ['Finanças'],
        responses: {
          200: {
            description: 'Transação atualizada com sucesso',
          },
          401: {
            description: 'Não autorizado',
          },
        },
      },
    }
  )
  .get(
    '/list/finance',
    async ({ query, session }) => {
      const user_id = session?.user?.id
      if (!user_id) return
      const page = Number(query.page || 1)
      const per_page = Number(query.per_page || 10)
      const category_id_param = query.category_id
      const search = query.search_description

      const conditions = [
        eq(finances.user_id, user_id),
        inArray(finances.type, ['Saída', 'Entrada']),
      ]

      if (category_id_param && category_id_param !== '') {
        conditions.push(eq(finances.category_id, category_id_param))
      }

      if (search && search !== '') {
        conditions.push(ilike(finances.description, `%${search}%`))
      }

      const where_clause = and(...conditions)

      const [finances_list, total_count] = await Promise.all([
        db
          .select()
          .from(finances)
          .where(where_clause)
          .orderBy(desc(finances.created_at))
          .limit(per_page)
          .offset((page - 1) * per_page),
        db.select({ val: count() }).from(finances).where(where_clause),
      ])

      return {
        total: total_count[0].val,
        finances: finances_list,
      }
    },
    {
      query: t.Object({
        page: t.Optional(t.String()),
        per_page: t.Optional(t.String()),
        category_id: t.Optional(t.String()),
        search_description: t.Optional(t.String()),
      }),
      detail: {
        summary: 'Listar transações financeiras (Entradas e Saídas)',
        tags: ['Finanças'],
        responses: {
          200: {
            description: 'Lista de transações paginada',
          },
          401: {
            description: 'Não autorizado',
          },
        },
      },
    }
  )
  .get(
    '/list/pendencies',
    async ({ query, session }) => {
      const user_id = session?.user?.id
      if (!user_id) return
      const page = Number(query.page || 1)
      const per_page = Number(query.per_page || 10)
      const category_id_param = query.category_id
      const search = query.search_description

      const conditions = [
        eq(finances.user_id, user_id),
        inArray(finances.type, ['Contas a pagar', 'Contas a receber']),
      ]

      if (category_id_param && category_id_param !== '') {
        conditions.push(eq(finances.category_id, category_id_param))
      }

      if (search && search !== '') {
        conditions.push(ilike(finances.description, `%${search}%`))
      }

      const where_clause = and(...conditions)

      const [pendencies_list, total_count] = await Promise.all([
        db
          .select()
          .from(finances)
          .where(where_clause)
          .orderBy(desc(finances.created_at))
          .limit(per_page)
          .offset((page - 1) * per_page),
        db.select({ val: count() }).from(finances).where(where_clause),
      ])

      return {
        total: total_count[0].val,
        pendencies: pendencies_list,
      }
    },
    {
      query: t.Object({
        page: t.Optional(t.String()),
        per_page: t.Optional(t.String()),
        category_id: t.Optional(t.String()),
        search_description: t.Optional(t.String()),
      }),
      detail: {
        summary: 'Listar pendências financeiras (Contas a pagar/receber)',
        tags: ['Finanças'],
        responses: {
          200: {
            description: 'Lista de pendências paginada',
          },
          401: {
            description: 'Não autorizado',
          },
        },
      },
    }
  )
  .get(
    '/total/finances',
    async ({ query, session }) => {
      const user_id = session?.user?.id
      if (!user_id) return
      const category_id_param = query.category_id

      const conditions = [eq(finances.user_id, user_id)]

      if (category_id_param && category_id_param !== '') {
        conditions.push(eq(finances.category_id, category_id_param))
      }

      const where_clause = and(...conditions)

      const finances_list = await db
        .select()
        .from(finances)
        .where(where_clause)
        .orderBy(desc(finances.created_at))

      const expenses = finances_list.reduce((acc, finance) => {
        if (finance.type === 'Saída') {
          return acc + finance.amount
        }
        return acc
      }, 0)

      const earnings = finances_list.reduce((acc, finance) => {
        if (finance.type === 'Entrada') {
          return acc + finance.amount
        }
        return acc
      }, 0)

      const profit = earnings - expenses

      const expenses_total_records = finances_list.filter(
        f => f.type === 'Saída'
      ).length
      const earnings_total_records = finances_list.filter(
        f => f.type === 'Entrada'
      ).length

      const latest_expenses = finances_list
        .filter(f => f.type === 'Saída')
        .slice(0, 3)
      const latest_earnings = finances_list
        .filter(f => f.type === 'Entrada')
        .slice(0, 3)

      const expenses_amounts: { x: Date; y: number }[] = []
      const earnings_amounts: { x: Date; y: number }[] = []

      finances_list.forEach(finance => {
        const date_key = finance.date.getTime()
        if (finance.type === 'Saída') {
          const existing = expenses_amounts.find(
            item => item.x.getTime() === date_key
          )
          if (existing) {
            existing.y += finance.amount
          } else {
            expenses_amounts.push({ x: finance.date, y: finance.amount })
          }
        } else if (finance.type === 'Entrada') {
          const existing = earnings_amounts.find(
            item => item.x.getTime() === date_key
          )
          if (existing) {
            existing.y += finance.amount
          } else {
            earnings_amounts.push({ x: finance.date, y: finance.amount })
          }
        }
      })

      expenses_amounts.sort((a, b) => a.x.getTime() - b.x.getTime())
      earnings_amounts.sort((a, b) => a.x.getTime() - b.x.getTime())

      return {
        expenses,
        earnings,
        profit,
        expensesTotalRecords: expenses_total_records,
        earningsTotalRecords: earnings_total_records,
        latestExpenses: latest_expenses,
        latestEarnings: latest_earnings,
        expensesAmounts: expenses_amounts,
        earningsAmounts: earnings_amounts,
      }
    },
    {
      query: t.Object({
        category_id: t.Optional(t.String()),
      }),
      detail: {
        summary: 'Obter resumos estatísticos financeiros',
        tags: ['Finanças'],
        responses: {
          200: {
            description: 'Resumo estatístico financeiro',
          },
          401: {
            description: 'Não autorizado',
          },
        },
      },
    }
  )
  .post(
    '/delete/finance',
    async ({ body, session }) => {
      const { finance_id } = body
      const user_id = session?.user?.id
      if (!user_id) return

      await db
        .delete(finances)
        .where(and(eq(finances.id, finance_id), eq(finances.user_id, user_id)))

      return { success: true }
    },
    {
      body: t.Object({
        finance_id: t.String(),
      }),
      detail: {
        summary: 'Excluir uma transação financeira',
        tags: ['Finanças'],
        responses: {
          200: {
            description: 'Transação excluída com sucesso',
          },
          401: {
            description: 'Não autorizado',
          },
        },
      },
    }
  )
