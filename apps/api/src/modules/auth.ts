import { and, eq } from 'drizzle-orm'
import { Elysia, t } from 'elysia'
import { db } from '../db/drizzle-client'
import { accounts, users } from '../db/schema'
import { isAuthenticated } from './auth-middleware'

export const authRoutes = new Elysia()
  .use(isAuthenticated)
  .get(
    '/me',
    async ({ session }) => {
      const u = session?.user
      if (!u) return
      return {
        name: u.name,
        username: u.username,
        email: u.email,
      }
    },
    {
      detail: {
        summary: 'Obter perfil do usuário atual logado',
        tags: ['Autenticação'],
        responses: {
          200: {
            description: 'Perfil retornado com sucesso',
          },
          401: {
            description: 'Não autorizado',
          },
        },
      },
    }
  )
  .post(
    '/edit/user',
    async ({ body, session }) => {
      const { name, password, username } = body
      const user_id = session?.user?.id
      if (!user_id) return

      if (password) {
        const password_hash = await Bun.password.hash(password, {
          algorithm: 'bcrypt',
          cost: 8,
        })
        await db
          .update(accounts)
          .set({ password: password_hash, updatedAt: new Date() })
          .where(
            and(
              eq(accounts.userId, user_id),
              eq(accounts.providerId, 'credential')
            )
          )
      }

      if (name) {
        await db
          .update(users)
          .set({ name, updatedAt: new Date() })
          .where(eq(users.id, user_id))
      }

      if (username) {
        await db
          .update(users)
          .set({ username, updatedAt: new Date() })
          .where(eq(users.id, user_id))
      }

      return { success: true }
    },
    {
      body: t.Object({
        name: t.Optional(t.String()),
        password: t.Optional(t.String()),
        username: t.Optional(t.String()),
      }),
      detail: {
        summary: 'Editar perfil do usuário',
        tags: ['Autenticação'],
        responses: {
          200: {
            description: 'Perfil atualizado com sucesso',
          },
          401: {
            description: 'Não autorizado',
          },
        },
      },
    }
  )
