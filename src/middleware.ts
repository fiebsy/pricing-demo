import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const HIDDEN_ROUTES = ['/org']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Block hidden routes in production
  if (process.env.NODE_ENV === 'production') {
    const isHiddenRoute = HIDDEN_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    )

    if (isHiddenRoute) {
      return NextResponse.rewrite(new URL('/404', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/org/:path*'],
}
