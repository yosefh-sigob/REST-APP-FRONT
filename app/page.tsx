"use client"

import { useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { LoginForm } from "@/components/auth/login-form"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-4">
            <Skeleton className="w-16 h-16 rounded-full mx-auto" />
            <Skeleton className="h-8 w-32 mx-auto" />
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return null // Se redirigirá automáticamente
  }

  return <LoginForm />
}
