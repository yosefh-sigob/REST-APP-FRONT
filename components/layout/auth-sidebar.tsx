"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/contexts/auth-context"
import { getRoleNavigation, getRoleColor } from "./role-navigation"
import { useOptimizedNavigation } from "@/hooks/use-navigation"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, startTransition, useEffect } from "react"

interface AuthSidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export function AuthSidebar({ isCollapsed, onToggleCollapse }: AuthSidebarProps) {
  const { user } = useAuth()
  const pathname = usePathname()
  const navigation = getRoleNavigation(user)
  const { navigateTo, prefetchRoute } = useOptimizedNavigation()

  // Prefetch all navigation routes on mount
  useEffect(() => {
    navigation.forEach((item) => {
      prefetchRoute(item.href)
    })
  }, [navigation, prefetchRoute])

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

      {/* Navegación */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  prefetch={true}
                  className="block"
                >
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start h-10 transition-all duration-200",
                      isCollapsed ? "px-2" : "px-3",
                      isActive && "bg-orange-100 text-orange-900 hover:bg-orange-200",
                      !isActive && "hover:bg-gray-100 hover:text-gray-900"
                    )}
                    onClick={(e) => {
                      e.preventDefault()
                      navigateTo(item.href)
                    }}
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
