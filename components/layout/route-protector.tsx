"use client"

import { useEffect } from "react"
import { useRouteValidation } from "@/hooks/use-route-validation"
import { useAuth } from "@/contexts/auth-context"

interface RouteProtectorProps {
  children: React.ReactNode
}

/**
 * Componente que protege las rutas y maneja navegación inválida
 */
export function RouteProtector({ children }: RouteProtectorProps) {
  const { isValidRoute, handleInvalidRoute } = useRouteValidation()
  const { isLoading } = useAuth()

  useEffect(() => {
    // Solo verificar rutas cuando la autenticación no esté cargando
    if (!isLoading) {
      handleInvalidRoute()
    }
  }, [isLoading, handleInvalidRoute])

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
