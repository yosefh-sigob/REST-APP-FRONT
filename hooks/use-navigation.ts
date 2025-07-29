"use client"

import { useRouter, usePathname } from "next/navigation"
import { useCallback, startTransition } from "react"
import { useAuth } from "@/contexts/auth-context"
import { isValidRoute, getHomeRoute } from "@/lib/config/routes"

export function useOptimizedNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  /**
   * Navega de forma segura verificando que la ruta sea válida
   */
  const navigateTo = useCallback((href: string) => {
    if (pathname === href) return
    
    // Verificar si la ruta es válida antes de navegar
    if (!isValidRoute(href)) {
      console.warn(`Attempted navigation to invalid route: ${href}`)
      // Redirigir al inicio seguro
      href = getHomeRoute(isAuthenticated)
    }
    
    startTransition(() => {
      router.push(href)
    })
  }, [router, pathname, isAuthenticated])

  /**
   * Navega al inicio según el estado de autenticación
   */
  const navigateToHome = useCallback(() => {
    const homeRoute = getHomeRoute(isAuthenticated)
    navigateTo(homeRoute)
  }, [isAuthenticated, navigateTo])

  /**
   * Navega hacia atrás de forma segura
   */
  const navigateBack = useCallback(() => {
    if (window.history.length > 1) {
      router.back()
    } else {
      navigateToHome()
    }
  }, [router, navigateToHome])

  const prefetchRoute = useCallback((href: string) => {
    // Solo hacer prefetch de rutas válidas
    if (isValidRoute(href)) {
      router.prefetch(href)
    }
  }, [router])

  return {
    navigateTo,
    navigateToHome,
    navigateBack,
    prefetchRoute,
    isValidRoute,
    currentPath: pathname
  }
}
