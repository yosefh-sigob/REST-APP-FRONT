"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User, LoginCredentials, AuthContextType } from "@/interfaces/auth"
import { authenticateUser, generateToken, validateToken } from "@/actions/auth.actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const TOKEN_KEY = "restaurant_auth_token"
const USER_KEY = "restaurant_user_data"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Verificar token al cargar la aplicación
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem(TOKEN_KEY)
        const userData = localStorage.getItem(USER_KEY)

        if (token && userData) {
          const validUser = await validateToken(token)
          if (validUser) {
            setUser(validUser)
          } else {
            // Token inválido, limpiar storage
            localStorage.removeItem(TOKEN_KEY)
            localStorage.removeItem(USER_KEY)
          }
        }
      } catch (error) {
        console.error("Error al inicializar autenticación:", error)
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setIsLoading(true)
      const authenticatedUser = await authenticateUser(credentials)

      if (authenticatedUser) {
        const token = await generateToken(authenticatedUser)

        // Guardar en localStorage
        localStorage.setItem(TOKEN_KEY, token)
        localStorage.setItem(USER_KEY, JSON.stringify(authenticatedUser))

        setUser(authenticatedUser)

        toast.success(`¡Bienvenido, ${authenticatedUser.nombreCompleto}!`)

        // Redireccionar al dashboard
        router.push("/dashboard")

        return true
      } else {
        toast.error("Credenciales incorrectas. Verifica usuario, contraseña y PIN.")
        return false
      }
    } catch (error) {
      console.error("Error en login:", error)
      toast.error("Error al iniciar sesión. Intenta nuevamente.")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Limpiar storage
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)

    // Limpiar estado
    setUser(null)

    toast.success("Sesión cerrada correctamente")

    // Redireccionar al login
    router.push("/")
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
