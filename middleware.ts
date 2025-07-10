import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Rutas que requieren autenticación
const protectedRoutes = [
  "/main",
  "/dashboard",
  "/cajero",
  "/mesero",
  "/cocina",
  "/productos",
  "/inventario",
  "/clientes",
  "/mesas",
  "/reservaciones",
  "/reportes",
  "/ventas",
  "/facturas",
  "/recetas",
  "/encuestas",
  "/configuracion",
]

// Rutas públicas que no requieren autenticación
const publicRoutes = ["/", "/login", "/acceso-denegado"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Verificar si la ruta requiere autenticación
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // Verificar si es una ruta pública
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route))

  // Si es una ruta protegida, verificar autenticación
  if (isProtectedRoute) {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      // Redirigir a página de acceso denegado con la URL original
      const url = new URL("/acceso-denegado", request.url)
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
