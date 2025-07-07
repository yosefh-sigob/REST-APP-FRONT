import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AppRest - Sistema de Gestión de Restaurantes",
  description: "Sistema completo de gestión para restaurantes con POS, inventario, reservaciones y más",
  keywords: ["restaurante", "pos", "gestión", "inventario", "reservaciones"],
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
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "white",
                color: "black",
                border: "1px solid #e5e7eb",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
