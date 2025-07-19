import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { OrdersProvider } from "@/contexts/orders-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AppRest - Sistema de Gestión de Restaurantes",
  description: "Sistema completo para la gestión de restaurantes",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <OrdersProvider>
              {children}
              <Toaster />
            </OrdersProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
