"use server"

import type { User, LoginCredentials } from "@/interfaces/auth"

// Mock data para desarrollo
const MOCK_USERS: User[] = [
  {
    id: "1",
    email: "admin@restaurant.com",
    nombreCompleto: "Pedro Administrador",
    nombreEmpresa: "Restaurante El Buen Sabor",
    rol: "Administrador",
    nivelLicencia: "Pro",
    pin: "1234",
    activo: true,
    fechaCreacion: new Date().toISOString(),
    ultimoLogin: new Date().toISOString(),
  },
  {
    id: "2",
    email: "mesero@restaurant.com",
    nombreCompleto: "Juan Mesero",
    nombreEmpresa: "Restaurante El Buen Sabor",
    rol: "Mesero",
    nivelLicencia: "Lite",
    pin: "5678",
    activo: true,
    fechaCreacion: new Date().toISOString(),
    ultimoLogin: new Date().toISOString(),
  },
]

export async function authenticateUser(credentials: LoginCredentials): Promise<User | null> {
  try {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Buscar usuario por email
    const user = MOCK_USERS.find((u) => u.email === credentials.email)

    if (!user || !user.activo) {
      return null
    }

    // En un caso real, aquí verificarías la contraseña hasheada
    // Por ahora, aceptamos cualquier contraseña para desarrollo

    // Verificar PIN si se proporciona
    if (credentials.pin && user.pin !== credentials.pin) {
      return null
    }

    // Actualizar último login
    user.ultimoLogin = new Date().toISOString()

    return user
  } catch (error) {
    console.error("Error en authenticateUser:", error)
    return null
  }
}

export async function generateToken(user: User): Promise<string> {
  // En un caso real, generarías un JWT real
  return `mock-token-${user.id}-${Date.now()}`
}

export async function validateToken(token: string): Promise<User | null> {
  try {
    // En un caso real, validarías el JWT
    if (!token.startsWith("mock-token-")) {
      return null
    }

    const userId = token.split("-")[2]
    const user = MOCK_USERS.find((u) => u.id === userId)

    return user || null
  } catch (error) {
    console.error("Error en validateToken:", error)
    return null
  }
}
