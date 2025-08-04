"use client"

import {
  Database,
  LayoutGrid,
  Shapes,
  Ruler,
  Warehouse,
  Users,
  CreditCard,
  Armchair,
  ClipboardList,
  CalendarClock,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface CatalogoData {
  title: string
  count: number
  status: "active" | "pending" | "inactive"
}

interface CatalogosViewProps {
  catalogos: CatalogoData[]
}

const catalogoDetails = {
  "Grupos de Productos": {
    description: "Categorías principales de productos.",
    icon: Shapes,
    href: "/catalogos/grupos",
  },
  Subgrupos: {
    description: "Subcategorías dentro de cada grupo.",
    icon: LayoutGrid,
    href: "/catalogos/subgrupos",
  },
  "Unidades de Medida": {
    description: "Unidades para inventario y recetas (kg, lt, pz).",
    icon: Ruler,
    href: "/catalogos/unidades",
  },
  "Áreas de Producción": {
    description: "Define las áreas como Cocina, Bar, etc.",
    icon: Warehouse,
    href: "/catalogos/areas-produccion",
  },
  Almacenes: {
    description: "Gestiona las diferentes bodegas o almacenes.",
    icon: Database,
    href: "/catalogos/almacenes",
  },
  "Tipos de Cliente": {
    description: "Clasifica a tus clientes (Regular, VIP, etc.).",
    icon: Users,
    href: "/catalogos/tipos-cliente",
  },
  "Métodos de Pago": {
    description: "Configura los métodos de pago aceptados.",
    icon: CreditCard,
    href: "/catalogos/metodos-pago",
  },
  "Estados de Mesa": {
    description: "Define los estados de las mesas (Disponible, Ocupada).",
    icon: Armchair,
    href: "/catalogos/estados-mesa",
  },
  "Estados de Orden": {
    description: "Gestiona los estados de las órdenes (Pendiente, Lista).",
    icon: ClipboardList,
    href: "/catalogos/estados-orden",
  },
  "Tipos de Reservación": {
    description: "Configura los tipos de reservaciones.",
    icon: CalendarClock,
    href: "/catalogos/tipos-reservacion",
  },
} as const

export function CatalogosView({ catalogos }: CatalogosViewProps) {
  const enrichedCatalogos = catalogos.map((c) => ({
    ...c,
    ...(catalogoDetails[c.title as keyof typeof catalogoDetails] || {}),
  }))

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "pending":
        return "secondary"
      case "inactive":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activo"
      case "pending":
        return "Pendiente"
      case "inactive":
        return "Inactivo"
      default:
        return "Desconocido"
    }
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Database className="h-8 w-8" />
          Catálogos del Sistema
        </h1>
        <p className="text-muted-foreground mt-1">Gestiona los catálogos maestros que alimentan el sistema.</p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {enrichedCatalogos.map((catalogo) => (
          <Link
            href={catalogo.href || "#"}
            key={catalogo.title}
            className="transform transition-transform duration-300 hover:scale-105"
          >
            <Card className="h-full hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{catalogo.title}</CardTitle>
                {catalogo.icon && <catalogo.icon className="h-4 w-4 text-muted-foreground" />}
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground h-8">{catalogo.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <Badge variant={getBadgeVariant(catalogo.status)}>{getStatusText(catalogo.status)}</Badge>
                  <div className="text-sm font-semibold">{catalogo.count} registros</div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
