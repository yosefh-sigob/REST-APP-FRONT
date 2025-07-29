"use client"

import { RouteNotFound } from "@/components/ui/route-not-found"

export default function DashboardNotFound() {
  return (
    <RouteNotFound
      title="Página no encontrada en Dashboard"
      message="La página que buscas no existe dentro del dashboard o ha sido movida. Verifica la URL o usa el menú de navegación."
      className="min-h-[60vh]"
    />
  )
}
