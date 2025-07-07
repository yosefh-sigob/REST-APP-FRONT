"use client"

import type React from "react"

import type { User } from "@/interfaces/auth"
import {
  LayoutDashboard,
  Package,
  Users,
  Calendar,
  CreditCard,
  MessageSquare,
  BarChart3,
  Settings,
  UtensilsCrossed,
  ChefHat,
  Receipt,
  ClipboardList,
} from "lucide-react"

export interface NavigationItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  description?: string
}

export function getRoleNavigation(user: User | null): NavigationItem[] {
  if (!user) return []

  const baseNavigation: NavigationItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      description: "Vista general del restaurante",
    },
  ]

  switch (user.rol) {
    case "Administrador":
      return [
        ...baseNavigation,
        {
          title: "Productos",
          href: "/productos",
          icon: Package,
          description: "Gestión del menú y productos",
        },
        {
          title: "Mesas",
          href: "/mesas",
          icon: UtensilsCrossed,
          description: "Administración de mesas",
        },
        {
          title: "Clientes",
          href: "/clientes",
          icon: Users,
          description: "Base de datos de clientes",
        },
        {
          title: "Reservaciones",
          href: "/reservaciones",
          icon: Calendar,
          description: "Gestión de reservas",
        },
        {
          title: "Punto de Venta",
          href: "/ventas/pos",
          icon: CreditCard,
          description: "Sistema POS",
        },
        {
          title: "Encuestas SMS",
          href: "/encuestas/campanas",
          icon: MessageSquare,
          description: "Campañas de satisfacción",
        },
        {
          title: "Reportes",
          href: "/reportes",
          icon: BarChart3,
          description: "Análisis y estadísticas",
        },
        {
          title: "Configuración",
          href: "/configuracion",
          icon: Settings,
          description: "Configuración del sistema",
        },
      ]

    case "Gerente":
      return [
        ...baseNavigation,
        {
          title: "Productos",
          href: "/productos",
          icon: Package,
          description: "Gestión del menú",
        },
        {
          title: "Mesas",
          href: "/mesas",
          icon: UtensilsCrossed,
          description: "Estado de mesas",
        },
        {
          title: "Clientes",
          href: "/clientes",
          icon: Users,
          description: "Gestión de clientes",
        },
        {
          title: "Reservaciones",
          href: "/reservaciones",
          icon: Calendar,
          description: "Gestión de reservas",
        },
        {
          title: "Punto de Venta",
          href: "/ventas/pos",
          icon: CreditCard,
          description: "Sistema POS",
        },
        {
          title: "Reportes",
          href: "/reportes",
          icon: BarChart3,
          description: "Reportes de gestión",
        },
      ]

    case "Cajero":
      return [
        ...baseNavigation,
        {
          title: "Punto de Venta",
          href: "/ventas/pos",
          icon: CreditCard,
          description: "Sistema POS principal",
        },
        {
          title: "Clientes",
          href: "/clientes",
          icon: Users,
          description: "Información de clientes",
        },
        {
          title: "Facturas",
          href: "/facturas",
          icon: Receipt,
          description: "Gestión de facturas",
        },
        {
          title: "Reportes de Ventas",
          href: "/reportes/ventas",
          icon: BarChart3,
          description: "Reportes de caja",
        },
      ]

    case "Mesero":
      return [
        ...baseNavigation,
        {
          title: "Mis Mesas",
          href: "/mesero/mesas",
          icon: UtensilsCrossed,
          description: "Mesas asignadas",
        },
        {
          title: "Órdenes",
          href: "/mesero/ordenes",
          icon: ClipboardList,
          badge: "3",
          description: "Órdenes pendientes",
        },
        {
          title: "Reservaciones",
          href: "/reservaciones",
          icon: Calendar,
          description: "Reservas del día",
        },
        {
          title: "Clientes",
          href: "/clientes",
          icon: Users,
          description: "Información de clientes",
        },
      ]

    case "Cocinero":
      return [
        ...baseNavigation,
        {
          title: "Órdenes de Cocina",
          href: "/cocina/ordenes",
          icon: ChefHat,
          badge: "5",
          description: "Órdenes pendientes",
        },
        {
          title: "Inventario",
          href: "/inventario",
          icon: Package,
          description: "Control de inventario",
        },
        {
          title: "Recetas",
          href: "/recetas",
          icon: ClipboardList,
          description: "Libro de recetas",
        },
      ]

    default:
      return baseNavigation
  }
}

export function getRoleColor(rol: User["rol"]): string {
  switch (rol) {
    case "Administrador":
      return "bg-red-100 text-red-800"
    case "Gerente":
      return "bg-blue-100 text-blue-800"
    case "Cajero":
      return "bg-green-100 text-green-800"
    case "Mesero":
      return "bg-purple-100 text-purple-800"
    case "Cocinero":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
