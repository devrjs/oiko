import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectURL = new URL('/', request.url)
  const sessionToken = request.cookies.get('better-auth.session_token')?.value

  if (sessionToken) {
    try {
      const backendUrl = process.env.INTERNAL_BACKEND_API_URL || 'http://localhost:3333'
      await fetch(`${backendUrl}/api/auth/sign-out`, {
        method: 'POST',
        headers: {
          cookie: `better-auth.session_token=${sessionToken}`,
        },
      })
    } catch (error) {
      console.error('Failed to call Better Auth sign-out:', error)
    }
  }

  const response = NextResponse.redirect(redirectURL)
  response.cookies.delete('better-auth.session_token')
  return response
}
