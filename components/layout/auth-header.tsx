"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"
import { getRoleColor } from "./role-navigation"
import { User, Settings, LogOut, ChevronDown, Bell, Menu, ChefHat } from "lucide-react"

interface AuthHeaderProps {
  onToggleSidebar?: () => void
  showSidebarToggle?: boolean
}

export function AuthHeader({ onToggleSidebar, showSidebarToggle = true }: AuthHeaderProps) {
  const { user, logout } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)

  if (!user) return null

  const initials = user.nombreCompleto
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center px-4 md:px-6">
        {/* Logo y Toggle Sidebar */}
        <div className="flex items-center space-x-4">
          {showSidebarToggle && (
            <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          )}

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <ChefHat className="h-4 w-4 text-white" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-semibold text-gray-900">AppRest</h1>
            </div>
          </div>
        </div>

        {/* Información de la empresa */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900">{user.nombreEmpresa}</p>
            <p className="text-xs text-gray-500">Sistema de Gestión</p>
          </div>
        </div>

        {/* Acciones del usuario */}
        <div className="flex items-center space-x-2">
          {/* Notificaciones */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </Button>

          {/* Información del usuario */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.nombreCompleto}</p>
              <div className="flex items-center space-x-2">
                <Badge className={`text-xs ${getRoleColor(user.rol)}`}>{user.rol}</Badge>
                <Badge variant="outline" className="text-xs">
                  {user.nivelLicencia}
                </Badge>
              </div>
            </div>
          </div>

          {/* Menú del usuario */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-user.jpg" alt={user.nombreCompleto} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="absolute -bottom-1 -right-1 h-3 w-3 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.nombreCompleto}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.correo}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className={`text-xs ${getRoleColor(user.rol)}`}>{user.rol}</Badge>
                    <Badge variant="outline" className="text-xs">
                      {user.nivelLicencia}
                    </Badge>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
