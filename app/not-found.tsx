"use client"

import { RouteNotFound } from "@/components/ui/route-not-found"

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto py-20">
        <RouteNotFound
          title="404 - Página no encontrada"
          message="Lo sentimos, la página que buscas no existe o ha sido movida. Verifica la URL o navega de regreso al inicio."
          className="min-h-[60vh]"
        />
        
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Si crees que esto es un error, contacta al administrador del sistema.
          </p>
        </div>
      </div>
    </div>
  )
}
