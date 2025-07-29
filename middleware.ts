import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { PROTECTED_ROUTES, PUBLIC_ROUTES, APP_ROUTES } from "@/lib/config/routes"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Verificar si la ruta requiere autenticación
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route))

  // Verificar si es una ruta pública
  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route))

  // Si es una ruta protegida, verificar autenticación
  if (isProtectedRoute) {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      // Redirigir a página de acceso denegado con la URL original
      const url = new URL(APP_ROUTES.PUBLIC.ACCESS_DENIED, request.url)
      url.searchParams.set("redirect", pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
