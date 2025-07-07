"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Phone, Plus, Eye, Edit, CheckCircle, XCircle } from "lucide-react"

const RESERVACIONES_DATA = [
  {
    id: 1,
    cliente: "Juan Pérez",
    telefono: "+52 555 123 4567",
    fecha: "2024-01-25",
    hora: "19:30",
    personas: 4,
    mesa: 5,
    estado: "confirmada",
    notas: "Cumpleaños, necesita mesa cerca de la ventana",
    mesero: "Carlos López",
  },
  {
    id: 2,
    cliente: "María García",
    telefono: "+52 555 234 5678",
    fecha: "2024-01-25",
    hora: "20:00",
    personas: 2,
    mesa: 12,
    estado: "pendiente",
    notas: "Cena romántica",
    mesero: "Ana Martín",
  },
  {
    id: 3,
    cliente: "Carlos Rodríguez",
    telefono: "+52 555 345 6789",
    fecha: "2024-01-25",
    hora: "18:00",
    personas: 8,
    mesa: 1,
    estado: "confirmada",
    notas: "Cena de negocios, requiere privacidad",
    mesero: "Juan Pérez",
  },
  {
    id: 4,
    cliente: "Laura Martín",
    telefono: "+52 555 456 7890",
    fecha: "2024-01-26",
    hora: "19:00",
    personas: 6,
    mesa: 8,
    estado: "cancelada",
    notas: "Cancelada por el cliente",
    mesero: null,
  },
  {
    id: 5,
    cliente: "Pedro Sánchez",
    telefono: "+52 555 567 8901",
    fecha: "2024-01-26",
    hora: "20:30",
    personas: 3,
    mesa: 15,
    estado: "pendiente",
    notas: "Primera visita al restaurante",
    mesero: "María García",
  },
]

function getEstadoColor(estado: string) {
  switch (estado) {
    case "confirmada":
      return "bg-green-100 text-green-800"
    case "pendiente":
      return "bg-yellow-100 text-yellow-800"
    case "cancelada":
      return "bg-red-100 text-red-800"
    case "completada":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function getEstadoIcon(estado: string) {
  switch (estado) {
    case "confirmada":
      return <CheckCircle className="h-4 w-4" />
    case "pendiente":
      return <Clock className="h-4 w-4" />
    case "cancelada":
      return <XCircle className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

export function ReservacionesView() {
  const [selectedDate, setSelectedDate] = useState("2024-01-25")

  const reservacionesHoy = RESERVACIONES_DATA.filter((r) => r.fecha === selectedDate)
  const confirmadas = reservacionesHoy.filter((r) => r.estado === "confirmada").length
  const pendientes = reservacionesHoy.filter((r) => r.estado === "pendiente").length
  const totalPersonas = reservacionesHoy.reduce((acc, r) => acc + r.personas, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Reservaciones</h1>
          <p className="text-gray-600 mt-1">Administra las reservas del restaurante</p>
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Reservación
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Reservas Hoy</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{reservacionesHoy.length}</div>
            <p className="text-xs text-gray-500 mt-1">Total programadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Confirmadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{confirmadas}</div>
            <p className="text-xs text-gray-500 mt-1">Listas para recibir</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendientes}</div>
            <p className="text-xs text-gray-500 mt-1">Por confirmar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Personas</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{totalPersonas}</div>
            <p className="text-xs text-gray-500 mt-1">Esperadas hoy</p>
          </CardContent>
        </Card>
      </div>

      {/* Reservaciones List */}
      <Card>
        <CardHeader>
          <CardTitle>Reservaciones del Día</CardTitle>
          <CardDescription>
            Reservas programadas para{" "}
            {new Date(selectedDate).toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reservacionesHoy.map((reservacion) => (
              <Card key={reservacion.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{reservacion.cliente}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {reservacion.hora}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {reservacion.personas} personas
                          </span>
                          <span className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            {reservacion.telefono}
                          </span>
                        </div>
                        {reservacion.notas && <p className="text-sm text-gray-500 mt-2">{reservacion.notas}</p>}
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge className={getEstadoColor(reservacion.estado)}>
                          {getEstadoIcon(reservacion.estado)}
                          <span className="ml-1 capitalize">{reservacion.estado}</span>
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        Mesa {reservacion.mesa}
                        {reservacion.mesero && <div className="text-xs">Mesero: {reservacion.mesero}</div>}
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <Eye className="h-3 w-3 mr-1" />
                          Ver
                        </Button>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <Edit className="h-3 w-3 mr-1" />
                          Editar
                        </Button>
                        {reservacion.estado === "pendiente" && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Confirmar
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {reservacionesHoy.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay reservaciones</h3>
              <p className="text-gray-600 mb-4">No hay reservas programadas para este día</p>
              <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                <Plus className="h-4 w-4 mr-2" />
                Crear Primera Reservación
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
