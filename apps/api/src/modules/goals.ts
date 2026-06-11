import { and, eq } from 'drizzle-orm'
import { Elysia, t } from 'elysia'
import { db } from '../db/drizzle-client'
import { finances, goals } from '../db/schema'
import { isAuthenticated } from './auth-middleware'

export const goalRoutes = new Elysia()
  .use(isAuthenticated)
  .post(
    '/add/goals',
    async ({ body, session }) => {
      const { starting_amount, target_amount, target_date, category_id } = body
      const user_id = (session as NonNullable<typeof session>).user.id

      const [new_goal] = await db
        .insert(goals)
        .values({
          starting_amount: starting_amount,
          target_amount: target_amount,
          target_date: new Date(target_date),
          category_id: category_id === '' ? null : category_id,
          user_id: user_id,
        })
        .returning()

      return new_goal
    },
    {
      body: t.Object({
        starting_amount: t.Number(),
        target_amount: t.Number(),
        target_date: t.String(),
        category_id: t.Optional(t.String()),
      }),
      detail: {
        summary: 'Adicionar uma nova meta financeira',
        tags: ['Metas'],
        responses: {
          200: {
            description: 'Meta adicionada com sucesso',
          },
          401: {
            description: 'Não autorizado',
          },
        },
      },
    }
  )
  .post(
    '/edit/goals',
    async ({ body, session }) => {
      const {
        goal_id,
        starting_amount,
        target_amount,
        target_date,
        category_id,
      } = body
      const user_id = (session as NonNullable<typeof session>).user.id

      const [updated_goal] = await db
        .update(goals)
        .set({
          starting_amount: starting_amount,
          target_amount: target_amount,
          target_date: new Date(target_date),
          category_id: category_id === '' ? null : category_id,
        })
        .where(and(eq(goals.id, goal_id), eq(goals.user_id, user_id)))
        .returning()

      return updated_goal
    },
    {
      body: t.Object({
        goal_id: t.String(),
        starting_amount: t.Number(),
        target_amount: t.Number(),
        target_date: t.String(),
        category_id: t.Optional(t.String()),
      }),
      detail: {
        summary: 'Editar uma meta financeira existente',
        tags: ['Metas'],
        responses: {
          200: {
            description: 'Meta atualizada com sucesso',
          },
          401: {
            description: 'Não autorizado',
          },
        },
      },
    }
  )
  .get(
    '/view/goals',
    async ({ query, session }) => {
      const user_id = (session as NonNullable<typeof session>).user.id
      const category_id_param = query.category_id

      const goals_condition = [eq(goals.user_id, user_id)]
      const finances_condition = [eq(finances.user_id, user_id)]

      if (category_id_param && category_id_param !== '') {
        goals_condition.push(eq(goals.category_id, category_id_param))
        finances_condition.push(eq(finances.category_id, category_id_param))
      }

      const [found_goal] = await db
        .select()
        .from(goals)
        .where(and(...goals_condition))
        .limit(1)

      const finances_list = await db
        .select()
        .from(finances)
        .where(and(...finances_condition))

      const expenses = finances_list.reduce((acc, f) => {
        if (f.type === 'Saída') {
          return acc + f.amount
        }
        return acc
      }, 0)

      const earnings = finances_list.reduce((acc, f) => {
        if (f.type === 'Entrada') {
          return acc + f.amount
        }
        return acc
      }, 0)

      const profit = earnings - expenses
      const current_amount = found_goal ? found_goal.starting_amount + profit : 0

      const calculate_percentage_reached = (
        starting: number,
        current: number,
        target: number
      ): string => {
        if (starting < target) {
          const percentage = ((current - starting) / (target - starting)) * 100
          return `${percentage.toFixed(2)}%`
        } else if (starting > target) {
          const percentage = ((starting - current) / (starting - target)) * 100
          return `${percentage.toFixed(2)}%`
        }
        return '0%'
      }

      const status_message = (): string => {
        if (!found_goal?.target_date) {
          return 'Meta não definida!'
        }

        const now = new Date()
        const target_date_obj = new Date(found_goal.target_date)

        if (now > target_date_obj) {
          if (current_amount >= found_goal.target_amount) {
            return 'Meta alcançada!'
          } else {
            return 'Meta não alcançada!'
          }
        }
        return 'Em andamento!'
      }

      return {
        id: found_goal?.id || null,
        starting_amount: found_goal?.starting_amount || 0,
        target_amount: found_goal?.target_amount || 0,
        target_date: found_goal?.target_date || new Date(),
        current_amount: current_amount,
        percentage_reached: calculate_percentage_reached(
          found_goal?.starting_amount || 0,
          current_amount,
          found_goal?.target_amount || 0
        ),
        status_message: status_message(),
      }
    },
    {
      query: t.Object({
        category_id: t.Optional(t.String()),
      }),
      detail: {
        summary: 'Visualizar status de uma meta financeira',
        tags: ['Metas'],
        responses: {
          200: {
            description: 'Status da meta retornado',
          },
          401: {
            description: 'Não autorizado',
          },
        },
      },
    }
  )
  .post(
    '/delete/goals',
    async ({ body, session }) => {
      const { goal_id } = body
      const user_id = (session as NonNullable<typeof session>).user.id

      await db
        .delete(goals)
        .where(and(eq(goals.id, goal_id), eq(goals.user_id, user_id)))

      return { success: true }
    },
    {
      body: t.Object({
        goal_id: t.String(),
      }),
      detail: {
        summary: 'Excluir uma meta financeira',
        tags: ['Metas'],
        responses: {
          200: {
            description: 'Meta excluída com sucesso',
          },
          401: {
            description: 'Não autorizado',
          },
        },
      },
    }
  )
