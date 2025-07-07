"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { loginSchema, type LoginFormData } from "@/schemas/auth.schemas"
import { useAuth } from "@/contexts/auth-context"
import { Eye, EyeOff, LogIn, User, Lock, Shield, ChefHat } from "lucide-react"

const DEMO_USERS = [
  { usuario: "admin", contraseña: "admin123", pin: "1234", rol: "Administrador", color: "bg-red-100 text-red-800" },
  { usuario: "gerente", contraseña: "gerente123", pin: "2345", rol: "Gerente", color: "bg-blue-100 text-blue-800" },
  { usuario: "cajero", contraseña: "cajero123", pin: "3456", rol: "Cajero", color: "bg-green-100 text-green-800" },
  { usuario: "mesero", contraseña: "mesero123", pin: "4567", rol: "Mesero", color: "bg-purple-100 text-purple-800" },
  {
    usuario: "cocinero",
    contraseña: "cocinero123",
    pin: "5678",
    rol: "Cocinero",
    color: "bg-orange-100 text-orange-800",
  },
]

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showPin, setShowPin] = useState(false)
  const { login, isLoading } = useAuth()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    await login(data)
  }

  const fillDemoUser = (demoUser: (typeof DEMO_USERS)[0]) => {
    setValue("usuario", demoUser.usuario)
    setValue("contraseña", demoUser.contraseña)
    setValue("pin", demoUser.pin)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo y Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ChefHat className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">AppRest</h1>
          <p className="text-gray-600">Sistema de Gestión de Restaurantes</p>
        </div>

        {/* Formulario de Login */}
        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center">Ingresa tus credenciales para acceder al sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Usuario */}
              <div className="space-y-2">
                <Label htmlFor="usuario">Usuario</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="usuario"
                    type="text"
                    placeholder="Ingresa tu usuario"
                    className="pl-10"
                    {...register("usuario")}
                  />
                </div>
                {errors.usuario && <p className="text-sm text-red-600">{errors.usuario.message}</p>}
              </div>

              {/* Contraseña */}
              <div className="space-y-2">
                <Label htmlFor="contraseña">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="contraseña"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    className="pl-10 pr-10"
                    {...register("contraseña")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.contraseña && <p className="text-sm text-red-600">{errors.contraseña.message}</p>}
              </div>

              {/* PIN */}
              <div className="space-y-2">
                <Label htmlFor="pin">PIN de Seguridad</Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="pin"
                    type={showPin ? "text" : "password"}
                    placeholder="PIN de 4 dígitos"
                    maxLength={4}
                    className="pl-10 pr-10"
                    {...register("pin")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.pin && <p className="text-sm text-red-600">{errors.pin.message}</p>}
              </div>

              {/* Botón de Login */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Iniciando sesión...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogIn className="h-4 w-4 mr-2" />
                    Iniciar Sesión
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Usuarios Demo */}
        <Card className="shadow-lg border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Usuarios de Demostración</CardTitle>
            <CardDescription>Haz clic en cualquier usuario para llenar automáticamente el formulario</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {DEMO_USERS.map((demoUser) => (
              <div key={demoUser.usuario}>
                <button
                  type="button"
                  onClick={() => fillDemoUser(demoUser)}
                  className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                  disabled={isLoading}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{demoUser.usuario}</p>
                      <p className="text-sm text-gray-500">
                        Contraseña: {demoUser.contraseña} • PIN: {demoUser.pin}
                      </p>
                    </div>
                    <Badge className={demoUser.color}>{demoUser.rol}</Badge>
                  </div>
                </button>
                {demoUser.usuario !== DEMO_USERS[DEMO_USERS.length - 1].usuario && <Separator className="mt-3" />}
              </div>
            ))}
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
