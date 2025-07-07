"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Search, Plus, Phone, Mail, Calendar, Star } from "lucide-react"

const CLIENTES_DATA = [
  {
    id: 1,
    nombre: "Juan Pérez",
    email: "juan.perez@email.com",
    telefono: "+52 555 123 4567",
    fechaRegistro: "2024-01-15",
    ultimaVisita: "2024-01-20",
    totalVisitas: 12,
    gastoTotal: 2450.5,
    preferencias: ["Vegetariano", "Sin gluten"],
    calificacion: 4.8,
  },
  {
    id: 2,
    nombre: "María García",
    email: "maria.garcia@email.com",
    telefono: "+52 555 234 5678",
    fechaRegistro: "2024-01-10",
    ultimaVisita: "2024-01-19",
    totalVisitas: 8,
    gastoTotal: 1680.25,
    preferencias: ["Vegano"],
    calificacion: 4.9,
  },
  {
    id: 3,
    nombre: "Carlos López",
    email: "carlos.lopez@email.com",
    telefono: "+52 555 345 6789",
    fechaRegistro: "2024-01-05",
    ultimaVisita: "2024-01-18",
    totalVisitas: 15,
    gastoTotal: 3200.75,
    preferencias: ["Carnes", "Picante"],
    calificacion: 4.7,
  },
  {
    id: 4,
    nombre: "Ana Martín",
    email: "ana.martin@email.com",
    telefono: "+52 555 456 7890",
    fechaRegistro: "2024-01-12",
    ultimaVisita: "2024-01-17",
    totalVisitas: 6,
    gastoTotal: 980.0,
    preferencias: ["Mariscos"],
    calificacion: 4.6,
  },
]

export function ClientesView() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredClientes = CLIENTES_DATA.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.telefono.includes(searchTerm),
  )

  const totalClientes = CLIENTES_DATA.length
  const clientesActivos = CLIENTES_DATA.filter(
    (c) => new Date(c.ultimaVisita) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  ).length
  const gastoPromedio = CLIENTES_DATA.reduce((acc, c) => acc + c.gastoTotal, 0) / totalClientes

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Clientes</h1>
          <p className="text-gray-600 mt-1">Administra la base de datos de clientes del restaurante</p>
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Cliente
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Clientes</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalClientes}</div>
            <p className="text-xs text-gray-500 mt-1">Registrados en el sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Clientes Activos</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{clientesActivos}</div>
            <p className="text-xs text-gray-500 mt-1">Últimos 30 días</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Gasto Promedio</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">${gastoPromedio.toFixed(2)}</div>
            <p className="text-xs text-gray-500 mt-1">Por cliente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Calificación Promedio</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">4.75</div>
            <p className="text-xs text-gray-500 mt-1">Satisfacción general</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar clientes por nombre, email o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clientes List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredClientes.map((cliente) => (
          <Card key={cliente.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder-user.jpg" alt={cliente.nombre} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
                    {cliente.nombre
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{cliente.nombre}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{cliente.calificacion}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      {cliente.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {cliente.telefono}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Última visita: {new Date(cliente.ultimaVisita).toLocaleDateString("es-ES")}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-sm">
                      <span className="font-medium">{cliente.totalVisitas}</span> visitas •
                      <span className="font-medium text-green-600"> ${cliente.gastoTotal}</span> total
                    </div>
                  </div>

                  {cliente.preferencias.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {cliente.preferencias.map((pref, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {pref}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      Ver Historial
                    </Button>
                    <Button size="sm" className="flex-1">
                      Contactar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClientes.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron clientes</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? "Intenta con otros términos de búsqueda" : "Aún no hay clientes registrados"}
            </p>
            <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Primer Cliente
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
