"use client"

import { useRouter, usePathname } from "next/navigation"
import { useCallback, startTransition } from "react"

export function useOptimizedNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const navigateTo = useCallback((href: string) => {
    if (pathname === href) return
    
    startTransition(() => {
      router.push(href)
    })
  }, [router, pathname])

  const prefetchRoute = useCallback((href: string) => {
    router.prefetch(href)
  }, [router])

  return {
    navigateTo,
    prefetchRoute,
    currentPath: pathname
  }
}
