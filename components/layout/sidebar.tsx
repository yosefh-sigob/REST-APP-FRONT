"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Package,
  UserCheck,
  Calendar,
  MessageSquare,
  CreditCard,
  ChefHat,
  Home,
  Menu,
  X,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Mesas", href: "/mesas", icon: Users },
  { name: "Productos", href: "/productos", icon: Package },
  { name: "Clientes", href: "/clientes", icon: UserCheck },
  { name: "Reservaciones", href: "/reservaciones", icon: Calendar },
  { name: "Encuestas", href: "/encuestas/crear", icon: MessageSquare },
  { name: "Punto de Venta", href: "/ventas/pos", icon: CreditCard },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="bg-white shadow-md">
          {isCollapsed ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "restaurant-sidebar fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isCollapsed ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-amber-800">
            <div className="flex items-center space-x-3">
              <ChefHat className="h-8 w-8 text-amber-300" />
              <div>
                <h2 className="text-xl font-bold text-amber-100">AppRest</h2>
                <p className="text-xs text-amber-300">Gestión Restaurante</p>
              </div>
            </div>
          </div>

          {/* Botón de regreso al inicio */}
          <div className="px-4 py-4 border-b border-amber-800">
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="w-full border-amber-300 text-amber-100 hover:bg-amber-800 bg-transparent"
              >
                <Home className="h-4 w-4 mr-2" />
                Volver al Inicio
              </Button>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-amber-800 text-amber-100 shadow-lg"
                      : "text-amber-200 hover:bg-amber-800/50 hover:text-amber-100",
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-amber-800">
            <p className="text-xs text-amber-300 text-center">© 2024 AppRest v1.0</p>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isCollapsed && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden" onClick={() => setIsCollapsed(false)} />
      )}
    </>
  )
}
