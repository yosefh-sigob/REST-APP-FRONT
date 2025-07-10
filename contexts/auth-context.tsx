"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import type { User, LoginCredentials, AuthContextType } from "@/interfaces/auth"
import { authenticateUser, generateToken, validateToken } from "@/actions/auth.actions"

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!user

  // Verificar token al cargar la aplicación
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("auth-token")
        if (token) {
          // También establecer cookie para el middleware
          document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}` // 7 días

          const userData = await validateToken(token)
          if (userData) {
            setUser(userData)
          } else {
            localStorage.removeItem("auth-token")
            document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
          }
        }
      } catch (error) {
        console.error("Error verificando autenticación:", error)
        localStorage.removeItem("auth-token")
        document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true)
    try {
      const userData = await authenticateUser(credentials)

      if (userData) {
        const token = await generateToken(userData)

        // Guardar en localStorage y cookie
        localStorage.setItem("auth-token", token)
        document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}` // 7 días

        setUser(userData)

        toast.success(`¡Bienvenido, ${userData.nombreCompleto}!`)

        // Redirigir según el rol
        switch (userData.rol) {
          case "Administrador":
          case "Gerente":
            router.push("/main")
            break
          case "Cajero":
            router.push("/cajero")
            break
          case "Mesero":
            router.push("/mesero")
            break
          case "Cocinero":
            router.push("/cocina/ordenes")
            break
          default:
            router.push("/main")
        }

        return true
      } else {
        toast.error("Credenciales incorrectas")
        return false
      }
    } catch (error) {
      console.error("Error en login:", error)
      toast.error("Error al iniciar sesión")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Limpiar localStorage y cookie
    localStorage.removeItem("auth-token")
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

    setUser(null)
    toast.success("Sesión cerrada correctamente")
    router.push("/")
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
