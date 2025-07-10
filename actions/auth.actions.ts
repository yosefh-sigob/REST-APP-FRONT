"use server"

import type { User, LoginCredentials } from "@/interfaces/auth"

// Usuarios de demostración
const DEMO_USERS: User[] = [
  {
    id: "1",
    usuario: "admin",
    nombreCompleto: "Pedro Administrador",
    correo: "admin@restaurant.com",
    rol: "Administrador",
    nivelLicencia: "Pro",
    nombreEmpresa: "Restaurante Demo",
    activo: true,
  },
  {
    id: "2",
    usuario: "gerente",
    nombreCompleto: "María Gerente",
    correo: "gerente@restaurant.com",
    rol: "Gerente",
    nivelLicencia: "Pro",
    nombreEmpresa: "Restaurante Demo",
    activo: true,
  },
  {
    id: "3",
    usuario: "cajero",
    nombreCompleto: "Juan Cajero",
    correo: "cajero@restaurant.com",
    rol: "Cajero",
    nivelLicencia: "Lite",
    nombreEmpresa: "Restaurante Demo",
    activo: true,
  },
  {
    id: "4",
    usuario: "mesero",
    nombreCompleto: "Ana Mesera",
    correo: "mesero@restaurant.com",
    rol: "Mesero",
    nivelLicencia: "Lite",
    nombreEmpresa: "Restaurante Demo",
    activo: true,
  },
  {
    id: "5",
    usuario: "cocinero",
    nombreCompleto: "Carlos Cocinero",
    correo: "cocinero@restaurant.com",
    rol: "Cocinero",
    nivelLicencia: "Gratis",
    nombreEmpresa: "Restaurante Demo",
    activo: true,
  },
]

// Credenciales de demostración
const DEMO_CREDENTIALS = [
  { usuario: "admin", contraseña: "admin123", pin: "1234" },
  { usuario: "gerente", contraseña: "gerente123", pin: "2345" },
  { usuario: "cajero", contraseña: "cajero123", pin: "3456" },
  { usuario: "mesero", contraseña: "mesero123", pin: "4567" },
  { usuario: "cocinero", contraseña: "cocinero123", pin: "5678" },
]

export async function authenticateUser(credentials: LoginCredentials): Promise<User | null> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Buscar credenciales
  const validCredential = DEMO_CREDENTIALS.find(
    (cred) =>
      cred.usuario === credentials.usuario &&
      cred.contraseña === credentials.contraseña &&
      cred.pin === credentials.pin,
  )

  if (!validCredential) {
    return null
  }

  // Buscar usuario
  const user = DEMO_USERS.find((u) => u.usuario === validCredential.usuario)

  if (!user || !user.activo) {
    return null
  }

  // Actualizar último login
  const authenticatedUser: User = {
    ...user,
    ultimoLogin: new Date().toISOString(),
  }

  return authenticatedUser
}

export async function generateToken(user: User): Promise<string> {
  // En un entorno real, aquí generarías un JWT
  const tokenData = {
    userId: user.id,
    usuario: user.usuario,
    rol: user.rol,
    timestamp: Date.now(),
  }

  return btoa(JSON.stringify(tokenData))
}

export async function validateToken(token: string): Promise<User | null> {
  try {
    const tokenData = JSON.parse(atob(token))

    // Verificar que el token no haya expirado (7 días)
    const tokenAge = Date.now() - tokenData.timestamp
    const maxAge = 7 * 24 * 60 * 60 * 1000 // 7 días en milisegundos

    if (tokenAge > maxAge) {
      return null
    }

    // Buscar usuario
    const user = DEMO_USERS.find((u) => u.id === tokenData.userId)

    if (!user || !user.activo) {
      return null
    }

    return user
  } catch (error) {
    console.error("Error validando token:", error)
    return null
  }
}
