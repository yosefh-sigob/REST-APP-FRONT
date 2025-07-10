"use server"

import type { User, LoginCredentials } from "@/interfaces/auth"

// Base de datos mock de usuarios
const MOCK_USERS: User[] = [
  {
    id: "1",
    usuario: "admin",
    nombreCompleto: "Carlos Administrador",
    correo: "admin@restaurant.com",
    rol: "Administrador",
    nivelLicencia: "Franquicia",
    nombreEmpresa: "Restaurante El Buen Sabor",
    activo: true,
  },
  {
    id: "2",
    usuario: "gerente",
    nombreCompleto: "Ana Gerente",
    correo: "gerente@restaurant.com",
    rol: "Gerente",
    nivelLicencia: "Pro",
    nombreEmpresa: "Restaurante El Buen Sabor",
    activo: true,
  },
  {
    id: "3",
    usuario: "cajero",
    nombreCompleto: "Luis Cajero",
    correo: "cajero@restaurant.com",
    rol: "Cajero",
    nivelLicencia: "Lite",
    nombreEmpresa: "Restaurante El Buen Sabor",
    activo: true,
  },
  {
    id: "4",
    usuario: "mesero",
    nombreCompleto: "María Mesero",
    correo: "mesero@restaurant.com",
    rol: "Mesero",
    nivelLicencia: "Lite",
    nombreEmpresa: "Restaurante El Buen Sabor",
    activo: true,
  },
  {
    id: "5",
    usuario: "cocinero",
    nombreCompleto: "Pedro Cocinero",
    correo: "cocinero@restaurant.com",
    rol: "Cocinero",
    nivelLicencia: "Lite",
    nombreEmpresa: "Restaurante El Buen Sabor",
    activo: true,
  },
]

// Credenciales mock (en producción esto estaría en base de datos con hash)
const MOCK_CREDENTIALS = {
  admin: { contraseña: "admin123", pin: "1234" },
  gerente: { contraseña: "gerente123", pin: "2345" },
  cajero: { contraseña: "cajero123", pin: "3456" },
  mesero: { contraseña: "mesero123", pin: "4567" },
  cocinero: { contraseña: "cocinero123", pin: "5678" },
}

export async function authenticateUser(credentials: LoginCredentials): Promise<User | null> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const { usuario, contraseña, pin } = credentials

  // Buscar usuario
  const user = MOCK_USERS.find((u) => u.usuario === usuario && u.activo)
  if (!user) {
    return null
  }

  // Verificar credenciales
  const userCredentials = MOCK_CREDENTIALS[usuario as keyof typeof MOCK_CREDENTIALS]
  if (!userCredentials || userCredentials.contraseña !== contraseña || userCredentials.pin !== pin) {
    return null
  }

  // Actualizar último login
  return {
    ...user,
    ultimoLogin: new Date().toISOString(),
  }
}

export async function validateToken(token: string): Promise<User | null> {
  try {
    // En producción, aquí validarías el JWT
    const userData = JSON.parse(atob(token))
    const user = MOCK_USERS.find((u) => u.id === userData.id && u.activo)
    return user || null
  } catch {
    return null
  }
}

export async function generateToken(user: User): Promise<string> {
  // En producción, aquí generarías un JWT real
  return btoa(JSON.stringify({ id: user.id, timestamp: Date.now() }))
}
