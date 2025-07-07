export interface User {
  id: string
  usuario: string
  nombreCompleto: string
  correo: string
  rol: "Administrador" | "Gerente" | "Cajero" | "Mesero" | "Cocinero"
  nivelLicencia: "Gratis" | "Lite" | "Pro" | "Franquicia"
  nombreEmpresa: string
  ultimoLogin?: string
  activo: boolean
}

export interface LoginCredentials {
  usuario: string
  contraseña: string
  pin: string
}

export interface AuthContextType {
  user: User | null
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}
