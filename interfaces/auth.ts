export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "manager" | "waiter" | "chef" | "cashier"
  licenseType: "gratis" | "lite" | "pro" | "franquicia"
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface AuthContextType {
  authState: AuthState
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => void
}
