import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { isValidRoute, getHomeRoute } from "@/lib/config/routes"

/**
 * Hook personalizado para manejar la navegación y validación de rutas
 */
export function useRouteValidation() {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  /**
   * Navega de forma segura al inicio según el estado de autenticación
   */
  const navigateToSafeHome = () => {
    const homeRoute = getHomeRoute(isAuthenticated)
    router.push(homeRoute)
  }

  /**
   * Navega de forma segura hacia atrás o al inicio
   */
  const navigateBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      navigateToSafeHome()
    }
  }

  /**
   * Maneja rutas inválidas redirigiendo apropiadamente
   */
  const handleInvalidRoute = () => {
    if (!isValidRoute(pathname)) {
      navigateToSafeHome()
    }
  }

  return {
    isValidRoute,
    navigateToSafeHome,
    navigateBack,
    handleInvalidRoute,
    currentPath: pathname,
    isAuthenticated
  }
}
