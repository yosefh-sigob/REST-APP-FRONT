"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UtensilsCrossed, Users, Clock, Plus, Eye, Edit } from "lucide-react"

const MESAS_DATA = [
  { id: 1, numero: 1, capacidad: 4, estado: "ocupada", clientes: 4, tiempo: "45 min", mesero: "Juan Pérez" },
  { id: 2, numero: 2, capacidad: 2, estado: "libre", clientes: 0, tiempo: null, mesero: null },
  { id: 3, numero: 3, capacidad: 6, estado: "ocupada", clientes: 6, tiempo: "30 min", mesero: "María García" },
  { id: 4, numero: 4, capacidad: 4, estado: "reservada", clientes: 4, tiempo: "19:30", mesero: "Carlos López" },
  { id: 5, numero: 5, capacidad: 2, estado: "libre", clientes: 0, tiempo: null, mesero: null },
  { id: 6, numero: 6, capacidad: 8, estado: "ocupada", clientes: 8, tiempo: "1h 15min", mesero: "Ana Martín" },
  { id: 7, numero: 7, capacidad: 4, estado: "limpieza", clientes: 0, tiempo: "5 min", mesero: null },
  { id: 8, numero: 8, capacidad: 2, estado: "libre", clientes: 0, tiempo: null, mesero: null },
]

function getMesaStatusColor(estado: string) {
  switch (estado) {
    case "ocupada":
      return "bg-red-100 text-red-800 border-red-200"
    case "libre":
      return "bg-green-100 text-green-800 border-green-200"
    case "reservada":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "limpieza":
      return "bg-blue-100 text-blue-800 border-blue-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function MesasView() {
  const mesasOcupadas = MESAS_DATA.filter((mesa) => mesa.estado === "ocupada").length
  const mesasLibres = MESAS_DATA.filter((mesa) => mesa.estado === "libre").length
  const mesasReservadas = MESAS_DATA.filter((mesa) => mesa.estado === "reservada").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Mesas</h1>
          <p className="text-gray-600 mt-1">Administra el estado y ocupación de las mesas del restaurante</p>
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Mesa
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Mesas</CardTitle>
            <UtensilsCrossed className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{MESAS_DATA.length}</div>
            <p className="text-xs text-gray-500 mt-1">
              Capacidad total: {MESAS_DATA.reduce((acc, mesa) => acc + mesa.capacidad, 0)} personas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Ocupadas</CardTitle>
            <Users className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{mesasOcupadas}</div>
            <p className="text-xs text-gray-500 mt-1">
              {Math.round((mesasOcupadas / MESAS_DATA.length) * 100)}% ocupación
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Disponibles</CardTitle>
            <UtensilsCrossed className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{mesasLibres}</div>
            <p className="text-xs text-gray-500 mt-1">Listas para asignar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Reservadas</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{mesasReservadas}</div>
            <p className="text-xs text-gray-500 mt-1">Próximas reservas</p>
          </CardContent>
        </Card>
      </div>

      {/* Mesas Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Estado de Mesas</CardTitle>
          <CardDescription>Vista general de todas las mesas del restaurante</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {MESAS_DATA.map((mesa) => (
              <Card key={mesa.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold">Mesa {mesa.numero}</h3>
                    <Badge className={getMesaStatusColor(mesa.estado)}>
                      {mesa.estado.charAt(0).toUpperCase() + mesa.estado.slice(1)}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      <Users className="h-4 w-4 inline mr-1" />
                      Capacidad: {mesa.capacidad} personas
                    </p>

                    {mesa.estado === "ocupada" && (
                      <>
                        <p className="text-sm text-gray-600">
                          <Users className="h-4 w-4 inline mr-1" />
                          Ocupada: {mesa.clientes}/{mesa.capacidad}
                        </p>
                        <p className="text-sm text-gray-600">
                          <Clock className="h-4 w-4 inline mr-1" />
                          Tiempo: {mesa.tiempo}
                        </p>
                        <p className="text-sm font-medium">Mesero: {mesa.mesero}</p>
                      </>
                    )}

                    {mesa.estado === "reservada" && (
                      <>
                        <p className="text-sm text-gray-600">
                          <Clock className="h-4 w-4 inline mr-1" />
                          Reserva: {mesa.tiempo}
                        </p>
                        <p className="text-sm font-medium">Mesero: {mesa.mesero}</p>
                      </>
                    )}

                    {mesa.estado === "limpieza" && (
                      <p className="text-sm text-gray-600">
                        <Clock className="h-4 w-4 inline mr-1" />
                        Tiempo restante: {mesa.tiempo}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Eye className="h-3 w-3 mr-1" />
                      Ver
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
