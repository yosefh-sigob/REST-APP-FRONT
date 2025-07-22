"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Users, Phone, Mail, MapPin, Filter, Plus, Search, Eye } from "lucide-react"
import { ReservacionDetailModal } from "./reservacion-detail-modal"
import type { ReservacionesViewProps, Reservacion } from "@/interfaces/reservaciones.interface"

export function ReservacionesView({ reservaciones }: ReservacionesViewProps) {
  const [filtroEstado, setFiltroEstado] = useState<string>("todos")
  const [busqueda, setBusqueda] = useState("")
  const [selectedReservacion, setSelectedReservacion] = useState<Reservacion | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const reservacionesFiltradas = reservaciones.filter((reservacion) => {
    const coincideBusqueda =
      reservacion.clienteNombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      reservacion.clienteEmail.toLowerCase().includes(busqueda.toLowerCase()) ||
      reservacion.clienteTelefono.includes(busqueda)

    const coincideEstado = filtroEstado === "todos" || reservacion.estado === filtroEstado

    return coincideBusqueda && coincideEstado
  })

  const getEstadoBadge = (estado: Reservacion["estado"]) => {
    const variants = {
      pendiente: "bg-yellow-100 text-yellow-800 border-yellow-200",
      confirmada: "bg-green-100 text-green-800 border-green-200",
      cancelada: "bg-red-100 text-red-800 border-red-200",
      completada: "bg-blue-100 text-blue-800 border-blue-200",
    }

    return <Badge className={`${variants[estado]} border`}>{estado.charAt(0).toUpperCase() + estado.slice(1)}</Badge>
  }

  const getTipoEventoBadge = (tipo?: string) => {
    if (!tipo) return null

    const variants = {
      cumpleanos: "bg-pink-100 text-pink-800",
      aniversario: "bg-purple-100 text-purple-800",
      negocio: "bg-gray-100 text-gray-800",
      familiar: "bg-orange-100 text-orange-800",
      otro: "bg-indigo-100 text-indigo-800",
    }

    return (
      <Badge variant="outline" className={variants[tipo as keyof typeof variants]}>
        {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
      </Badge>
    )
  }

  const handleVerDetalles = (reservacion: Reservacion) => {
    setSelectedReservacion(reservacion)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedReservacion(null)
  }

  const handleConfirmar = (id: string) => {
    // TODO: Implementar lógica para confirmar reservación
    console.log("Confirmar reservación:", id)
    handleCloseModal()
  }

  const handleCompletar = (id: string) => {
    // TODO: Implementar lógica para completar reservación
    console.log("Completar reservación:", id)
    handleCloseModal()
  }

  const handleCancelar = (id: string) => {
    // TODO: Implementar lógica para cancelar reservación
    console.log("Cancelar reservación:", id)
    handleCloseModal()
  }

  const handleEditar = (id: string) => {
    // TODO: Implementar lógica para editar reservación
    console.log("Editar reservación:", id)
    handleCloseModal()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reservaciones</h1>
          <p className="text-gray-600 mt-1">Gestiona las reservaciones del restaurante</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Reservación
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por nombre, email o teléfono..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="confirmada">Confirmada</SelectItem>
                  <SelectItem value="cancelada">Cancelada</SelectItem>
                  <SelectItem value="completada">Completada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Reservaciones */}
      <div className="grid gap-4">
        {reservacionesFiltradas.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-400 mb-2">
                <Calendar className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No hay reservaciones</h3>
              <p className="text-gray-600">No se encontraron reservaciones con los filtros aplicados.</p>
            </CardContent>
          </Card>
        ) : (
          reservacionesFiltradas.map((reservacion) => (
            <Card key={reservacion.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Información Principal */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">{reservacion.clienteNombre}</h3>
                      <div className="flex gap-2">
                        {getEstadoBadge(reservacion.estado)}
                        {getTipoEventoBadge(reservacion.tipoEvento)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span>{new Date(reservacion.fechaReservacion).toLocaleDateString("es-ES")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span>{reservacion.horaReservacion}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-orange-500" />
                        <span>{reservacion.numeroPersonas} personas</span>
                      </div>
                      {reservacion.mesaAsignada && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-orange-500" />
                          <span>Mesa {reservacion.mesaAsignada}</span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{reservacion.clienteEmail}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{reservacion.clienteTelefono}</span>
                      </div>
                    </div>

                    {reservacion.observaciones && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Observaciones:</span> {reservacion.observaciones}
                      </div>
                    )}
                  </div>

                  {/* Acciones */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-32">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                      onClick={() => handleVerDetalles(reservacion)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Ver Detalles
                    </Button>
                    {reservacion.estado === "pendiente" && (
                      <Button
                        size="sm"
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => handleConfirmar(reservacion.id)}
                      >
                        Confirmar
                      </Button>
                    )}
                    {reservacion.estado === "confirmada" && (
                      <Button
                        size="sm"
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleCompletar(reservacion.id)}
                      >
                        Completar
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{reservaciones.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {reservaciones.filter((r) => r.estado === "pendiente").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Confirmadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {reservaciones.filter((r) => r.estado === "confirmada").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Completadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {reservaciones.filter((r) => r.estado === "completada").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal de Detalles */}
      <ReservacionDetailModal
        reservacion={selectedReservacion}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirmar={handleConfirmar}
        onCompletar={handleCompletar}
        onCancelar={handleCancelar}
        onEditar={handleEditar}
      />
    </div>
  )
}
