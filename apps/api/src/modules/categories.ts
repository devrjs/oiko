import { and, count, desc, eq, ilike } from 'drizzle-orm'
import { Elysia, t } from 'elysia'
import { db } from '../db/drizzle-client'
import { categories, finances, goals } from '../db/schema'
import { isAuthenticated } from './auth-middleware'

export const categoryRoutes = new Elysia()
  .use(isAuthenticated)
  .post(
    '/add/category',
    async ({ body, session }) => {
      const { description } = body
      const user_id = session?.user?.id
      if (!user_id) return

      const [new_category] = await db
        .insert(categories)
        .values({
          description,
          user_id: user_id,
        })
        .returning()

      return new_category
    },
    {
      body: t.Object({
        description: t.String(),
      }),
      detail: {
        summary: 'Adicionar uma nova categoria',
        tags: ['Categoria'],
        responses: {
          200: {
            description: 'Categoria adicionada com sucesso',
          },
          401: {
            description: 'Não autorizado',
          },
        },
      },
    }
  )
  .get(
    '/list/categories',
    async ({ query, session }) => {
      const user_id = session?.user?.id
      if (!user_id) return
      const page = Number(query.page || 1)
      const per_page = Number(query.per_page || 10)
      const search = query.search_description

      const where_clause = search
        ? and(
            eq(categories.user_id, user_id),
            ilike(categories.description, `%${search}%`)
          )
        : eq(categories.user_id, user_id)

      const [categories_list, total_count] = await Promise.all([
        db
          .select()
          .from(categories)
          .where(where_clause)
          .orderBy(desc(categories.created_at))
          .limit(per_page)
          .offset((page - 1) * per_page),
        db.select({ val: count() }).from(categories).where(where_clause),
      ])

      return {
        total: total_count[0].val,
        categories: categories_list,
      }
    },
    {
      query: t.Object({
        page: t.Optional(t.String()),
        per_page: t.Optional(t.String()),
        search_description: t.Optional(t.String()),
      }),
      detail: {
        summary: 'Listar categorias com paginação e busca',
        tags: ['Categoria'],
        responses: {
          200: {
            description: 'Lista de categorias paginada',
          },
          401: {
            description: 'Não autorizado',
          },
        },
      },
    }
  )
  .get(
    '/all/categories',
    async ({ session }) => {
      const user_id = session?.user?.id
      if (!user_id) return

      const categories_list = await db
        .select()
        .from(categories)
        .where(eq(categories.user_id, user_id))
        .orderBy(desc(categories.created_at))

      return categories_list
    },
    {
      detail: {
        summary: 'Listar todas as categorias do usuário',
        tags: ['Categoria'],
        responses: {
          200: {
            description: 'Lista completa de categorias',
          },
          401: {
            description: 'Não autorizado',
          },
        },
      },
    }
  )
  .post(
    '/edit/category',
    async ({ body, session }) => {
      const { category_id, description } = body
      const user_id = session?.user?.id
      if (!user_id) return

      const [updated_category] = await db
        .update(categories)
        .set({ description })
        .where(and(eq(categories.id, category_id), eq(categories.user_id, user_id)))
        .returning()

      return updated_category
    },
    {
      body: t.Object({
        category_id: t.String(),
        description: t.String(),
      }),
      detail: {
        summary: 'Editar descrição de uma categoria',
        tags: ['Categoria'],
        responses: {
          200: {
            description: 'Categoria atualizada com sucesso',
          },
          401: {
            description: 'Não autorizado',
          },
        },
      },
    }
  )
  .post(
    '/delete/category',
    async ({ body, session }) => {
      const { category_id } = body
      const user_id = session?.user?.id
      if (!user_id) return

      await Promise.all([
        db
          .delete(finances)
          .where(
            and(
              eq(finances.category_id, category_id),
              eq(finances.user_id, user_id)
            )
          ),
        db
          .delete(goals)
          .where(
            and(eq(goals.category_id, category_id), eq(goals.user_id, user_id))
          ),
      ])

      await db
        .delete(categories)
        .where(and(eq(categories.id, category_id), eq(categories.user_id, user_id)))

      return { success: true }
    },
    {
      body: t.Object({
        category_id: t.String(),
      }),
      detail: {
        summary: 'Excluir uma categoria e suas relações',
        tags: ['Categoria'],
        responses: {
          200: {
            description: 'Categoria excluída com sucesso',
          },
          401: {
            description: 'Não autorizado',
          },
        },
      },
    }
  )
