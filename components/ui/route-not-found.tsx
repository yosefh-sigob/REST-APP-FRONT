"use client"

import { AlertTriangle, Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useOptimizedNavigation } from "@/hooks/use-navigation"

interface RouteNotFoundProps {
  title?: string
  message?: string
  showBackButton?: boolean
  showHomeButton?: boolean
  className?: string
}

/**
 * Componente reutilizable para mostrar mensajes de ruta no encontrada
 */
export function RouteNotFound({
  title = "Página no encontrada",
  message = "La página que buscas no existe o ha sido movida.",
  showBackButton = true,
  showHomeButton = true,
  className = ""
}: RouteNotFoundProps) {
  const { navigateBack, navigateToHome } = useOptimizedNavigation()

  return (
    <div className={`flex flex-col items-center justify-center p-6 ${className}`}>
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="bg-orange-100 p-4 rounded-full">
            <AlertTriangle className="h-16 w-16 text-orange-600" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900">
            {title}
          </h2>
          <p className="text-gray-600">
            {message}
          </p>
        </div>

        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            Verifica la URL o usa los botones de navegación para continuar.
          </AlertDescription>
        </Alert>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showBackButton && (
            <Button 
              onClick={navigateBack}
              variant="outline" 
              className="border-orange-200 text-orange-700 hover:bg-orange-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver atrás
            </Button>
          )}
          
          {showHomeButton && (
            <Button 
              onClick={navigateToHome}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Home className="h-4 w-4 mr-2" />
              Ir al inicio
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
