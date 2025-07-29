"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle, Home, RefreshCw } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error)
  }, [error])

  const getHomeLink = () => {
    return isAuthenticated ? "/main" : "/"
  }

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 p-6">
          <div className="text-center space-y-6 max-w-md">
            <div className="flex justify-center">
              <div className="bg-red-100 p-4 rounded-full">
                <AlertCircle className="h-16 w-16 text-red-600" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-gray-900">¡Ups!</h1>
              <h2 className="text-2xl font-semibold text-gray-800">
                Algo salió mal
              </h2>
            </div>
            
            <p className="text-gray-600 leading-relaxed">
              Hemos encontrado un problema inesperado. Nuestro equipo ha sido 
              notificado y está trabajando para solucionarlo.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={reset}
                variant="outline" 
                className="border-red-200 text-red-700 hover:bg-red-50"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Intentar de nuevo
              </Button>
              
              <Button asChild className="bg-orange-600 hover:bg-orange-700">
                <Link href={getHomeLink()}>
                  <Home className="h-4 w-4 mr-2" />
                  Ir al inicio
                </Link>
              </Button>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Error ID: {error.digest}
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
