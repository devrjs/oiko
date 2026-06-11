import { Elysia } from 'elysia'
import { auth } from '../lib/auth'

const authMiddleware = new Elysia()
  .derive({ as: 'global' }, async ({ request }) => {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (session) {
      return {
        session,
      }
    }

    return {
      session: null,
    }
  })

export const isAuthenticated = new Elysia()
  .use(authMiddleware)
  .onBeforeHandle(({ session, set }) => {
    if (!session?.user) {
      set.status = 401
      return 'Unauthorized'
    }
  })
