"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UtensilsCrossed, ClipboardList, Users, Clock, CheckCircle, AlertCircle, Plus, Eye } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const MESERO_STATS = [
  {
    title: "Mesas Asignadas",
    value: "8",
    subtitle: "De 12 disponibles",
    icon: UtensilsCrossed,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Órdenes Activas",
    value: "5",
    subtitle: "En proceso",
    icon: ClipboardList,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "Clientes Atendidos",
    value: "24",
    subtitle: "En este turno",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Tiempo Promedio",
    value: "45 min",
    subtitle: "Por mesa",
    icon: Clock,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
]

const MESAS_STATUS = [
  { numero: 1, estado: "ocupada", clientes: 4, tiempo: "25 min", orden: "#1234" },
  { numero: 2, estado: "libre", clientes: 0, tiempo: null, orden: null },
  { numero: 3, estado: "ocupada", clientes: 2, tiempo: "15 min", orden: "#1235" },
  { numero: 4, estado: "reservada", clientes: 6, tiempo: "19:30", orden: null },
  { numero: 5, estado: "ocupada", clientes: 3, tiempo: "40 min", orden: "#1236" },
  { numero: 6, estado: "libre", clientes: 0, tiempo: null, orden: null },
  { numero: 7, estado: "ocupada", clientes: 2, tiempo: "10 min", orden: "#1237" },
  { numero: 8, estado: "libre", clientes: 0, tiempo: null, orden: null },
]

function getMesaStatusColor(estado: string) {
  switch (estado) {
    case "ocupada":
      return "bg-red-100 text-red-800 border-red-200"
    case "libre":
      return "bg-green-100 text-green-800 border-green-200"
    case "reservada":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

function getMesaIcon(estado: string) {
  switch (estado) {
    case "ocupada":
      return <AlertCircle className="h-4 w-4" />
    case "libre":
      return <CheckCircle className="h-4 w-4" />
    case "reservada":
      return <Clock className="h-4 w-4" />
    default:
      return <UtensilsCrossed className="h-4 w-4" />
  }
}

export function MeseroView() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Panel de Mesero</h1>
          <p className="text-gray-600 mt-1">Gestiona tus mesas asignadas y órdenes activas</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          <UtensilsCrossed className="h-4 w-4 mr-2" />
          {user.rol}
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MESERO_STATS.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Mesas Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Estado de Mesas</CardTitle>
          <CardDescription>Vista general de todas las mesas asignadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {MESAS_STATUS.map((mesa) => (
              <Card key={mesa.numero} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold">Mesa {mesa.numero}</h3>
                    <Badge className={getMesaStatusColor(mesa.estado)}>
                      {getMesaIcon(mesa.estado)}
                      <span className="ml-1 capitalize">{mesa.estado}</span>
                    </Badge>
                  </div>

                  {mesa.estado === "ocupada" && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <Users className="h-4 w-4 inline mr-1" />
                        {mesa.clientes} clientes
                      </p>
                      <p className="text-sm text-gray-600">
                        <Clock className="h-4 w-4 inline mr-1" />
                        {mesa.tiempo}
                      </p>
                      <p className="text-sm font-medium">Orden: {mesa.orden}</p>
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Eye className="h-3 w-3 mr-1" />
                          Ver
                        </Button>
                        <Button size="sm" className="flex-1">
                          <Plus className="h-3 w-3 mr-1" />
                          Agregar
                        </Button>
                      </div>
                    </div>
                  )}

                  {mesa.estado === "libre" && (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500 mb-3">Mesa disponible</p>
                      <Button size="sm" className="w-full">
                        <Plus className="h-3 w-3 mr-1" />
                        Asignar Clientes
                      </Button>
                    </div>
                  )}

                  {mesa.estado === "reservada" && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <Users className="h-4 w-4 inline mr-1" />
                        {mesa.clientes} personas
                      </p>
                      <p className="text-sm text-gray-600">
                        <Clock className="h-4 w-4 inline mr-1" />
                        Reserva: {mesa.tiempo}
                      </p>
                      <Button size="sm" variant="outline" className="w-full mt-3 bg-transparent">
                        <Eye className="h-3 w-3 mr-1" />
                        Ver Reserva
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Órdenes Pendientes */}
      <Card>
        <CardHeader>
          <CardTitle>Órdenes Pendientes</CardTitle>
          <CardDescription>Órdenes que requieren tu atención</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { orden: "#1234", mesa: 1, estado: "En cocina", tiempo: "15 min", items: 3 },
              { orden: "#1235", mesa: 3, estado: "Listo", tiempo: "2 min", items: 2 },
              { orden: "#1236", mesa: 5, estado: "En preparación", tiempo: "8 min", items: 4 },
              { orden: "#1237", mesa: 7, estado: "Tomando orden", tiempo: "Ahora", items: 0 },
            ].map((orden) => (
              <div key={orden.orden} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <ClipboardList className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {orden.orden} - Mesa {orden.mesa}
                    </p>
                    <p className="text-sm text-gray-500">
                      {orden.items > 0 ? `${orden.items} items` : "Sin items"} • {orden.tiempo}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">{orden.estado}</Badge>
                  <Button size="sm">Ver Detalles</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
