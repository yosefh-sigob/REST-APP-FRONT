"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Database,
  Package,
  Tags,
  Scale,
  Building2,
  Warehouse,
  Users,
  CreditCard,
  Table,
  ClipboardList,
  Calendar,
} from "lucide-react"

const CATALOGOS = [
  {
    id: "grupos",
    title: "Grupos de Productos",
    description: "Categorías principales de productos",
    icon: Package,
    count: 8,
    status: "active",
    color: "bg-blue-500",
  },
  {
    id: "subgrupos",
    title: "Subgrupos",
    description: "Subcategorías dentro de cada grupo",
    icon: Tags,
    count: 24,
    status: "active",
    color: "bg-green-500",
  },
  {
    id: "unidades",
    title: "Unidades de Medida",
    description: "Unidades para productos e inventario",
    icon: Scale,
    count: 12,
    status: "active",
    color: "bg-purple-500",
  },
  {
    id: "areas-produccion",
    title: "Áreas de Producción",
    description: "Zonas de preparación de alimentos",
    icon: Building2,
    count: 5,
    status: "active",
    color: "bg-orange-500",
  },
  {
    id: "almacenes",
    title: "Almacenes",
    description: "Ubicaciones de almacenamiento",
    icon: Warehouse,
    count: 3,
    status: "active",
    color: "bg-cyan-500",
  },
  {
    id: "tipos-cliente",
    title: "Tipos de Cliente",
    description: "Clasificación de clientes",
    icon: Users,
    count: 4,
    status: "active",
    color: "bg-pink-500",
  },
  {
    id: "metodos-pago",
    title: "Métodos de Pago",
    description: "Formas de pago disponibles",
    icon: CreditCard,
    count: 6,
    status: "active",
    color: "bg-emerald-500",
  },
  {
    id: "estados-mesa",
    title: "Estados de Mesa",
    description: "Estados posibles de las mesas",
    icon: Table,
    count: 4,
    status: "active",
    color: "bg-indigo-500",
  },
  {
    id: "estados-orden",
    title: "Estados de Orden",
    description: "Estados del flujo de órdenes",
    icon: ClipboardList,
    count: 6,
    status: "pending",
    color: "bg-yellow-500",
  },
  {
    id: "tipos-reservacion",
    title: "Tipos de Reservación",
    description: "Clasificación de reservaciones",
    icon: Calendar,
    count: 3,
    status: "active",
    color: "bg-red-500",
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Activo
        </Badge>
      )
    case "pending":
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Pendiente
        </Badge>
      )
    case "inactive":
      return (
        <Badge variant="secondary" className="bg-gray-100 text-gray-800">
          Inactivo
        </Badge>
      )
    default:
      return <Badge variant="secondary">Desconocido</Badge>
  }
}

export function CatalogosView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Database className="h-8 w-8 mr-3" />
          Catálogos Maestros
        </h1>
        <p className="text-gray-600 mt-2">
          Gestiona todos los catálogos maestros que intervienen en la operación del restaurante
        </p>
      </div>

      {/* Grid de Catálogos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {CATALOGOS.map((catalogo) => {
          const Icon = catalogo.icon
          return (
            <Card key={catalogo.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${catalogo.color} text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  {getStatusBadge(catalogo.status)}
                </div>
                <CardTitle className="text-lg">{catalogo.title}</CardTitle>
                <CardDescription className="text-sm">{catalogo.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{catalogo.count}</span>
                  <span className="text-sm text-gray-500">registros</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
