"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/contexts/auth-context"
import { getRoleNavigation, getRoleColor } from "./role-navigation"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface AuthSidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export function AuthSidebar({ isCollapsed, onToggleCollapse }: AuthSidebarProps) {
  const { user } = useAuth()
  const pathname = usePathname()
  const navigation = getRoleNavigation(user)

  if (!user) return null

  return (
    <div
      className={cn(
        "relative flex flex-col bg-white border-r transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header del Sidebar */}
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">AR</span>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">AppRest</h2>
              <p className="text-xs text-gray-500">Gestión</p>
            </div>
          </div>
        )}

        <Button variant="ghost" size="icon" onClick={onToggleCollapse} className="h-8 w-8">
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Información del Usuario */}
      {!isCollapsed && (
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {user.nombreCompleto
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.nombreCompleto}</p>
              <Badge className={`text-xs mt-1 ${getRoleColor(user.rol)}`}>{user.rol}</Badge>
            </div>
          </div>
        </div>
      )}

      {/* Navegación */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start h-10",
                      isCollapsed ? "px-2" : "px-3",
                      isActive && "bg-orange-100 text-orange-900 hover:bg-orange-200",
                    )}
                  >
                    <Icon className={cn("h-4 w-4", isCollapsed ? "" : "mr-3")} />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left">{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </Button>
                </Link>
              )
            })}
          </nav>
        </div>
      </ScrollArea>

      {/* Footer del Sidebar */}
      {!isCollapsed && (
        <div className="p-4 border-t">
          <div className="text-center">
            <p className="text-xs text-gray-500">{user.nombreEmpresa}</p>
            <Badge variant="outline" className="text-xs mt-1">
              Plan {user.nivelLicencia}
            </Badge>
          </div>
        </div>
      )}
    </div>
  )
}
