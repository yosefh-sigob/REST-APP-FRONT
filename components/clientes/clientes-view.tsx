"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ViewToggle } from "@/components/ui/view-toggle"
import { Users, Search, Plus, Phone, Mail, Calendar, Star } from "lucide-react"
import type { Cliente } from "@/interfaces/clientes.interface"
import Link from "next/link"

interface ClientesViewProps {
  clientes: Cliente[]
}

type ViewMode = "grid" | "list"

export function ClientesView({ clientes }: ClientesViewProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.telefono.includes(searchTerm),
  )

  const totalClientes = clientes.length
  const clientesActivos = clientes.filter(
    (c) => new Date(c.ultimaVisita) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  ).length
  const gastoPromedio = totalClientes > 0 ? clientes.reduce((acc, c) => acc + c.gastoTotal, 0) / totalClientes : 0
  const calificacionPromedio =
    totalClientes > 0 ? clientes.reduce((acc, c) => acc + c.calificacion, 0) / totalClientes : 0

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

      {/* Search and View Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Card className="flex-1">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar clientes por nombre, email o teléfono..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>
          </CardContent>
        </Card>
      </div>

      {viewMode === "grid" ? (
        /* Vista Grid */
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
                      <Link href={`/clientes/${cliente.id}`}>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          Ver Historial
                        </Button>
                      </Link>
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
      ) : (
        /* Vista Lista */
        <div className="space-y-4">
          {filteredClientes.map((cliente) => (
            <Card key={cliente.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-6">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder-user.jpg" alt={cliente.nombre} />
                    <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-600 text-white text-lg">
                      {cliente.nombre
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{cliente.nombre}</h3>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{cliente.calificacion}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2" />
                        {cliente.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        {cliente.telefono}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">{cliente.totalVisitas}</span> visitas
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-green-600">${cliente.gastoTotal}</span> total
                      </div>
                      <div className="text-xs text-gray-500">
                        Última: {new Date(cliente.ultimaVisita).toLocaleDateString("es-ES")}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      {cliente.preferencias.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {cliente.preferencias.slice(0, 2).map((pref, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {pref}
                            </Badge>
                          ))}
                          {cliente.preferencias.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{cliente.preferencias.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}
                      <div className="flex space-x-2">
                        <Link href={`/clientes/${cliente.id}`}>
                          <Button size="sm" variant="outline">
                            Ver Historial
                          </Button>
                        </Link>
                        <Button size="sm">Contactar</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

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
