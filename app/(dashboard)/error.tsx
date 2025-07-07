"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Dashboard Error:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <div className="text-center space-y-4 max-w-md">
        <div className="flex justify-center">
          <AlertTriangle className="h-16 w-16 text-orange-500" />
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-900">
          Algo salió mal
        </h2>
        
        <p className="text-gray-600">
          Ocurrió un error inesperado. Por favor, intenta nuevamente.
        </p>
        
        {error.digest && (
          <p className="text-sm text-gray-500 font-mono">
            ID del error: {error.digest}
          </p>
        )}
        
        <div className="flex gap-3 justify-center">
          <Button
            onClick={reset}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reintentar
          </Button>
          
          <Button
            variant="outline"
            onClick={() => window.location.href = "/dashboard"}
          >
            Ir al Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
