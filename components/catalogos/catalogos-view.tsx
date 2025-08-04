"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Database,
  Package,
  Users,
  Ruler,
  Building,
  Warehouse,
  CreditCard,
  Table,
  ClipboardList,
  Calendar,
  Settings,
  Plus,
} from "lucide-react"

interface CatalogosViewProps {
  data: {
    totalCatalogos: number
    catalogosActivos: number
    catalogosInactivos: number
  }
}

interface CatalogoItem {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  count: number
  status: "active" | "pending" | "inactive"
  href: string
}

const catalogos: CatalogoItem[] = [
  {
    id: "grupos",
    title: "Grupos de Productos",
    description: "Categorías principales como Bebidas, Comidas, Postres",
    icon: Package,
    count: 8,
    status: "active",
    href: "/catalogos/grupos",
  },
  {
    id: "subgrupos",
    title: "Subgrupos",
    description: "Subcategorías dentro de cada grupo principal",
    icon: Package,
    count: 24,
    status: "active",
    href: "/catalogos/subgrupos",
  },
  {
    id: "unidades",
    title: "Unidades de Medida",
    description: "Kilogramos, litros, piezas, gramos, etc.",
    icon: Ruler,
    count: 12,
    status: "active",
    href: "/catalogos/unidades",
  },
  {
    id: "areas-produccion",
    title: "Áreas de Producción",
    description: "Cocina, Bar, Panadería, Repostería",
    icon: Building,
    count: 6,
    status: "active",
    href: "/catalogos/areas-produccion",
  },
  {
    id: "almacenes",
    title: "Almacenes",
    description: "Diferentes ubicaciones de almacenamiento",
    icon: Warehouse,
    count: 4,
    status: "active",
    href: "/catalogos/almacenes",
  },
  {
    id: "tipos-cliente",
    title: "Tipos de Cliente",
    description: "Regular, VIP, Corporativo, Estudiante",
    icon: Users,
    count: 5,
    status: "pending",
    href: "/catalogos/tipos-cliente",
  },
  {
    id: "metodos-pago",
    title: "Métodos de Pago",
    description: "Efectivo, Tarjeta, Transferencia, Digital",
    icon: CreditCard,
    count: 7,
    status: "active",
    href: "/catalogos/metodos-pago",
  },
  {
    id: "estados-mesa",
    title: "Estados de Mesa",
    description: "Disponible, Ocupada, Reservada, Mantenimiento",
    icon: Table,
    count: 4,
    status: "active",
    href: "/catalogos/estados-mesa",
  },
  {
    id: "estados-orden",
    title: "Estados de Orden",
    description: "Pendiente, En preparación, Lista, Entregada",
    icon: ClipboardList,
    count: 6,
    status: "active",
    href: "/catalogos/estados-orden",
  },
  {
    id: "tipos-reservacion",
    title: "Tipos de Reservación",
    description: "Normal, Evento, Corporativa, Especial",
    icon: Calendar,
    count: 4,
    status: "inactive",
    href: "/catalogos/tipos-reservacion",
  },
]

function getStatusColor(status: CatalogoItem["status"]) {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "inactive":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function getStatusText(status: CatalogoItem["status"]) {
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

export function CatalogosView({ data }: CatalogosViewProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Catálogos Maestros</h1>
          <p className="text-muted-foreground">Gestiona todos los catálogos que intervienen en el sistema</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Catálogo
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Catálogos</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalCatalogos}</div>
            <p className="text-xs text-muted-foreground">Catálogos configurados en el sistema</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Catálogos Activos</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{data.catalogosActivos}</div>
            <p className="text-xs text-muted-foreground">En uso actualmente</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Catálogos Inactivos</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{data.catalogosInactivos}</div>
            <p className="text-xs text-muted-foreground">Pendientes o deshabilitados</p>
          </CardContent>
        </Card>
      </div>

      {/* Catalogos Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {catalogos.map((catalogo) => {
          const IconComponent = catalogo.icon
          return (
            <Card key={catalogo.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{catalogo.title}</CardTitle>
                  </div>
                  <Badge className={getStatusColor(catalogo.status)}>{getStatusText(catalogo.status)}</Badge>
                </div>
                <CardDescription className="text-sm">{catalogo.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{catalogo.count}</div>
                  <Button variant="outline" size="sm">
                    Gestionar
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">registros configurados</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
