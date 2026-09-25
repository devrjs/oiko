import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const publicRoutes = ['/', '/signup', '/forgot']

const protectedRoutes = [
  '/category',
  '/dashboard',
  '/finances',
  '/goals',
  '/pendencies',
  '/profile',
]

export default function proxy(request: NextRequest) {
  // Better Auth prefixa o cookie com __Secure- quando o servidor está em HTTPS,
  // mas o cookie sem prefixo ainda é usado em HTTP (desenvolvimento local).
  const sessionToken =
    request.cookies.get('__Secure-better-auth.session_token')?.value ??
    request.cookies.get('better-auth.session_token')?.value

  if (!sessionToken) {
    if (protectedRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  } else {
    if (publicRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}
