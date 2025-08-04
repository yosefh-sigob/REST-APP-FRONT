"use client"

import { useEffect } from "react"
import Link from "next/link"
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
    // Log the error to an error reporting service
    console.error("Dashboard Error:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 bg-gray-50">
      <div className="text-center space-y-4 max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center">
          <AlertTriangle className="h-16 w-16 text-orange-500" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800">Algo salió mal</h2>

        <p className="text-gray-600">
          Ocurrió un error inesperado en el dashboard. Por favor, intenta recargar la página o contacta a soporte si el
          problema persiste.
        </p>

        {error.digest && (
          <p className="text-xs text-gray-500 bg-gray-100 p-2 rounded font-mono">ID del error: {error.digest}</p>
        )}

        <div className="flex gap-3 justify-center pt-4">
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reintentar
          </Button>

          <Button variant="outline" asChild>
            <Link href="/dashboard">Ir al Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
