"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User, AuthState } from "@/interfaces/auth"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    // Simular verificación de autenticación
    const checkAuth = async () => {
      try {
        // Aquí iría la lógica real de verificación
        const token = localStorage.getItem("auth-token")
        if (token) {
          // Simular usuario autenticado
          setAuthState({
            user: {
              id: "1",
              email: "admin@restaurant.com",
              name: "Pedro",
              role: "admin",
              licenseType: "pro",
            },
            isAuthenticated: true,
            isLoading: false,
          })
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          })
        }
      } catch (error) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Simular login
      const mockUser: User = {
        id: "1",
        email,
        name: "Pedro",
        role: "admin",
        licenseType: "pro",
      }

      localStorage.setItem("auth-token", "mock-token")
      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (error) {
      throw new Error("Error al iniciar sesión")
    }
  }

  const logout = () => {
    localStorage.removeItem("auth-token")
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        isAuthenticated: authState.isAuthenticated,
        isLoading: authState.isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
