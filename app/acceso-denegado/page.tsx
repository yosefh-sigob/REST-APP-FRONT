"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, LogIn, ArrowLeft, AlertTriangle } from "lucide-react"

export default function AccesoDenegadoPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null)

  useEffect(() => {
    const redirect = searchParams.get("redirect")
    if (redirect) {
      setRedirectUrl(redirect)
    }
  }, [searchParams])

  const handleGoToLogin = () => {
    router.push("/")
  }

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Icono y Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Acceso Denegado</h1>
            <p className="text-gray-600">Necesitas iniciar sesión para acceder a esta página</p>
          </div>
        </div>

        {/* Información de la ruta */}
        {redirectUrl && (
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              Intentaste acceder a: <code className="bg-orange-100 px-1 py-0.5 rounded text-sm">{redirectUrl}</code>
            </AlertDescription>
          </Alert>
        )}

        {/* Card principal */}
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Sesión Requerida</CardTitle>
            <CardDescription>
              Para acceder al sistema de gestión del restaurante, debes autenticarte con tus credenciales.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Botón principal - Ir al Login */}
            <Button
              onClick={handleGoToLogin}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
              size="lg"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Iniciar Sesión
            </Button>

            {/* Botón secundario - Regresar */}
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="w-full border-gray-300 hover:bg-gray-50 bg-transparent"
              size="lg"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Regresar
            </Button>
          </CardContent>
        </Card>

        {/* Información adicional */}
        <Card className="shadow-sm border-gray-200">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-gray-900">¿Necesitas ayuda?</h3>
              <p className="text-sm text-gray-600">
                Si tienes problemas para acceder, contacta al administrador del sistema.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>© 2024 AppRest. Sistema de Gestión de Restaurantes</p>
        </div>
      </div>
    </div>
  )
}
