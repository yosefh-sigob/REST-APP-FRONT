export interface User {
  id: string
  email: string
  nombreCompleto?: string
  nombreEmpresa?: string
  rol?: string
  nivelLicencia?: string
  ultimoLogin?: string
  pin?: string
  activo?: boolean
  fechaCreacion?: string
  fechaActualizacion?: string
}

export interface LoginCredentials {
  email: string
  password: string
  pin?: string
}

export interface AuthContextType {
  user: User | null
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}
