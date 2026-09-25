import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import { env } from './env'
import { auth } from './lib/auth'
import { authRoutes } from './modules/auth'
import { categoryRoutes } from './modules/categories'
import { financeRoutes } from './modules/finances'
import { goalRoutes } from './modules/goals'

const app = new Elysia()
  .use(
    cors({
      origin: true,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  )
  .use(
    swagger({
      path: '/swagger',
      documentation: {
        info: {
          title: 'Oiko API',
          version: '2.0.0',
          description:
            'API de alta performance usando Bun, Elysia, Drizzle ORM e Better Auth.',
        },
      },
    })
  )
  // Mount our modules
  .use(authRoutes)
  .use(categoryRoutes)
  .use(financeRoutes)
  .use(goalRoutes)
  // Better Auth integration catch-all
  .all('/api/auth/*', ({ request }) => auth.handler(request))
  .get('/health', () => {
    return { status: 'ok' }
  })
  .listen(env.BACKEND_API_PORT)

console.log(
  `🚀 Servidor Elysia ativo em: http://${app.server?.hostname}:${app.server?.port}`
)
console.log(
  `📖 Documentação Swagger disponível em: http://${app.server?.hostname}:${app.server?.port}/swagger`
)
