"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { AuthHeader } from "./auth-header"
import { AuthSidebar } from "./auth-sidebar"
import { Skeleton } from "@/components/ui/skeleton"

interface AuthenticatedLayoutProps {
  children: React.ReactNode
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Close sidebar on route change (mobile)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          {/* Sidebar skeleton */}
          <div className="hidden lg:block w-64 bg-white border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <Skeleton className="h-8 w-32" />
            </div>
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>
            <div className="p-3 space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-11 w-full" />
              ))}
            </div>
          </div>

          {/* Main content skeleton */}
          <div className="flex-1">
            {/* Header skeleton */}
            <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>

            {/* Content skeleton */}
            <div className="p-6 space-y-6">
              <Skeleton className="h-8 w-64" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Skeleton className="h-64 w-full lg:col-span-2" />
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Not authenticated - this should not happen as the page should redirect
  if (!isAuthenticated) {
    return null
  }

  // Authenticated layout
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <AuthSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

        <div className="flex-1 flex flex-col min-h-screen">
          <AuthHeader onToggleSidebar={toggleSidebar} />

          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  )
}
