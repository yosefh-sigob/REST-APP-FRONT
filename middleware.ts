import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Performance optimization headers
  const response = NextResponse.next()
  
  // Add performance headers for dashboard routes
  if (pathname.startsWith('/dashboard') || 
      pathname.startsWith('/productos') || 
      pathname.startsWith('/mesas') ||
      pathname.startsWith('/clientes') ||
      pathname.startsWith('/reservaciones') ||
      pathname.startsWith('/cajero') ||
      pathname.startsWith('/mesero') ||
      pathname.startsWith('/ventas')) {
    
    response.headers.set('Cache-Control', 'private, no-cache, no-store, max-age=0')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
