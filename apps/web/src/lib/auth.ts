import { cookies } from 'next/headers'

export interface User {
  sub: string
  username: string
  name: string
}

export async function getUser(): Promise<User> {
  const cookieStore = await cookies()
  const token = cookieStore.get('better-auth.session_token')?.value

  if (!token) {
    throw new Error('Unauthenticated.')
  }

  try {
    const backendUrl =
      process.env.INTERNAL_BACKEND_API_URL || 'http://localhost:3333'
    const response = await fetch(`${backendUrl}/api/auth/get-session`, {
      headers: {
        cookie: `better-auth.session_token=${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Unauthenticated.')
    }

    const data = await response.json()
    if (!data.user) {
      throw new Error('Unauthenticated.')
    }

    return {
      sub: data.user.id,
      username: data.user.username,
      name: data.user.name,
    }
  } catch (_error) {
    throw new Error('Unauthenticated.')
  }
}
