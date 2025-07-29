/**
 * Configuración centralizada de rutas de la aplicación
 */

export const APP_ROUTES = {
  // Rutas públicas
  PUBLIC: {
    HOME: "/",
    LOGIN: "/login",
    ACCESS_DENIED: "/acceso-denegado",
  },

  // Rutas principales del dashboard
  DASHBOARD: {
    MAIN: "/main",
    CAJERO: "/cajero",
    MESERO: "/mesero",
    COCINA: "/cocina",
  },

  // Rutas de gestión
  MANAGEMENT: {
    PRODUCTOS: "/productos",
    INVENTARIO: "/inventario",
    CLIENTES: "/clientes", 
    MESAS: "/mesas",
    RESERVACIONES: "/reservaciones",
    RECETAS: "/recetas",
  },

  // Rutas de reportes y administración
  ADMIN: {
    REPORTES: "/reportes",
    VENTAS: "/ventas",
    FACTURAS: "/facturas",
    ENCUESTAS: "/encuestas",
    CONFIGURACION: "/configuracion",
  },
} as const

/**
 * Lista plana de todas las rutas válidas
 */
export const VALID_ROUTES: string[] = [
  // Rutas públicas
  ...Object.values(APP_ROUTES.PUBLIC),
  
  // Rutas del dashboard
  ...Object.values(APP_ROUTES.DASHBOARD),
  
  // Rutas de gestión
  ...Object.values(APP_ROUTES.MANAGEMENT),
  
  // Rutas de administración
  ...Object.values(APP_ROUTES.ADMIN),
]

/**
 * Rutas que requieren autenticación
 */
export const PROTECTED_ROUTES: string[] = [
  ...Object.values(APP_ROUTES.DASHBOARD),
  ...Object.values(APP_ROUTES.MANAGEMENT),
  ...Object.values(APP_ROUTES.ADMIN),
]

/**
 * Rutas públicas que no requieren autenticación
 */
export const PUBLIC_ROUTES: string[] = [
  ...Object.values(APP_ROUTES.PUBLIC),
]

/**
 * Verifica si una ruta es válida
 */
export function isValidRoute(path: string): boolean {
  // Verificar rutas exactas
  if (VALID_ROUTES.includes(path)) {
    return true
  }

  // Verificar rutas que comienzan con las rutas válidas (subrutas)
  return VALID_ROUTES.some(route => {
    if (route === "/") return false // Evitar falsos positivos con la ruta raíz
    return path.startsWith(route + "/")
  })
}

/**
 * Verifica si una ruta requiere autenticación
 */
export function isProtectedRoute(path: string): boolean {
  return PROTECTED_ROUTES.some(route => path.startsWith(route))
}

/**
 * Verifica si una ruta es pública
 */
export function isPublicRoute(path: string): boolean {
  return PUBLIC_ROUTES.some(route => path === route || path.startsWith(route))
}

/**
 * Obtiene la ruta de inicio según el estado de autenticación
 */
export function getHomeRoute(isAuthenticated: boolean): string {
  return isAuthenticated ? APP_ROUTES.DASHBOARD.MAIN : APP_ROUTES.PUBLIC.HOME
}
