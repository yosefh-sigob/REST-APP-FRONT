"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, ArrowRight } from "lucide-react"
import Link from "next/link"

interface CatalogoItem {
  title: string
  count: number
  status: "active" | "inactive" | "pending"
}

interface CatalogosViewProps {
  catalogos: CatalogoItem[]
}

const catalogoRoutes: Record<string, string> = {
  "Grupos de Productos": "/catalogos/grupos",
  Subgrupos: "/catalogos/subgrupos",
  "Unidades de Medida": "/catalogos/unidades",
  "Áreas de Producción": "/catalogos/areas-produccion",
  Almacenes: "/catalogos/almacenes",
  "Tipos de Cliente": "/catalogos/tipos-cliente",
  "Métodos de Pago": "/catalogos/metodos-pago",
  "Estados de Mesa": "/catalogos/estados-mesa",
  "Estados de Orden": "/catalogos/estados-orden",
  "Tipos de Reservación": "/catalogos/tipos-reservacion",
}

const getStatusColor = (status: CatalogoItem["status"]) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800"
    case "inactive":
      return "bg-red-100 text-red-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusText = (status: CatalogoItem["status"]) => {
  switch (status) {
    case "active":
      return "Activo"
    case "inactive":
      return "Inactivo"
    case "pending":
      return "Pendiente"
    default:
      return "Desconocido"
  }
}

export function CatalogosView({ catalogos }: CatalogosViewProps) {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Database className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Catálogos Maestros</h1>
        </div>
        <p className="text-gray-600">Gestiona todos los catálogos maestros del sistema de restaurante</p>
      </div>

      {/* Grid de Catálogos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {catalogos.map((catalogo) => {
          const route = catalogoRoutes[catalogo.title]

          return (
            <Link key={catalogo.title} href={route || "#"}>
              <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer group border-gray-200 hover:border-blue-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {catalogo.title}
                    </CardTitle>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">{catalogo.count}</span>
                      <span className="text-sm text-gray-500">registros</span>
                    </div>
                    <Badge className={getStatusColor(catalogo.status)}>{getStatusText(catalogo.status)}</Badge>
                  </div>
                  <CardDescription className="mt-2 text-sm">{getDescription(catalogo.title)}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function getDescription(title: string): string {
  const descriptions: Record<string, string> = {
    "Grupos de Productos": "Categorías principales de productos del menú",
    Subgrupos: "Subcategorías dentro de cada grupo de productos",
    "Unidades de Medida": "Unidades para inventario y recetas",
    "Áreas de Producción": "Áreas donde se preparan los productos",
    Almacenes: "Ubicaciones de almacenamiento de inventario",
    "Tipos de Cliente": "Clasificación de clientes del restaurante",
    "Métodos de Pago": "Formas de pago aceptadas",
    "Estados de Mesa": "Estados posibles de las mesas",
    "Estados de Orden": "Estados del flujo de órdenes",
    "Tipos de Reservación": "Clasificación de reservaciones",
  }

  return descriptions[title] || "Gestión de catálogo maestro"
}
