import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request)

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!sessionCookie) {
    const loginUrl = new URL('/login', request.url)

    // Preserve the requested path + query
    const redirectTo = request.nextUrl.pathname + request.nextUrl.search

    loginUrl.searchParams.set('redirect', redirectTo)

    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard',
    '/onboarding',
    '/accept-invitation/:path*',
    '/projects',
  ], // Specify the routes the middleware applies to
}
