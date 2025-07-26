"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UtensilsCrossed, Users, Clock, Plus, Eye, Edit, MapPin } from "lucide-react"
import type { Mesa, EstadisticasMesas } from "@/interfaces/mesas.interface"
import { MesaDetailModal } from "./mesa-detail-modal"
import { MesaEditModal } from "./mesa-edit-modal"

interface MesasViewProps {
  mesas: Mesa[]
  estadisticas: EstadisticasMesas
}

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

function formatearTiempo(fechaOcupacion?: string): string {
  if (!fechaOcupacion) return ""

  const ahora = new Date()
  const ocupacion = new Date(fechaOcupacion)
  const diferencia = ahora.getTime() - ocupacion.getTime()

  const minutos = Math.floor(diferencia / (1000 * 60))
  const horas = Math.floor(minutos / 60)

  if (horas > 0) {
    const minutosRestantes = minutos % 60
    return `${horas}h ${minutosRestantes}min`
  }

  return `${minutos} min`
}

export function MesasView({ mesas, estadisticas }: MesasViewProps) {
  const [selectedMesa, setSelectedMesa] = useState<Mesa | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleVerMesa = (mesa: Mesa) => {
    setSelectedMesa(mesa)
    setIsDetailModalOpen(true)
  }

  const handleEditarMesa = (mesa: Mesa) => {
    setSelectedMesa(mesa)
    setIsEditModalOpen(true)
  }

  const handleEditFromDetail = (mesa: Mesa) => {
    setIsDetailModalOpen(false)
    setIsEditModalOpen(true)
  }

  const handleCloseModals = () => {
    setIsDetailModalOpen(false)
    setIsEditModalOpen(false)
    setSelectedMesa(null)
  }

  const handleSuccessEdit = () => {
    handleCloseModals()
    // En una implementación real, aquí recargaríamos los datos
    window.location.reload()
  }

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
            <div className="text-2xl font-bold">{estadisticas.totalMesas}</div>
            <p className="text-xs text-gray-500 mt-1">Capacidad total: {estadisticas.capacidadTotal} personas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Ocupadas</CardTitle>
            <Users className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{estadisticas.mesasOcupadas}</div>
            <p className="text-xs text-gray-500 mt-1">{estadisticas.ocupacionPorcentaje}% ocupación</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Disponibles</CardTitle>
            <UtensilsCrossed className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{estadisticas.mesasLibres}</div>
            <p className="text-xs text-gray-500 mt-1">Listas para asignar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Reservadas</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{estadisticas.mesasReservadas}</div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {mesas.map((mesa) => (
              <Card key={mesa.id} className="hover:shadow-md transition-shadow flex flex-col">
                <CardContent className="p-4 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold">Mesa {mesa.numero}</h3>
                    <Badge className={getMesaStatusColor(mesa.estado)}>
                      {mesa.estado.charAt(0).toUpperCase() + mesa.estado.slice(1)}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4 flex-1">
                    <p className="text-sm text-gray-600">
                      <Users className="h-4 w-4 inline mr-1" />
                      Capacidad: {mesa.capacidad} personas
                    </p>

                    {mesa.ubicacion && (
                      <p className="text-sm text-gray-600">
                        <MapPin className="h-4 w-4 inline mr-1" />
                        {mesa.ubicacion}
                      </p>
                    )}

                    {mesa.estado === "ocupada" && (
                      <>
                        <p className="text-sm text-gray-600">
                          <Users className="h-4 w-4 inline mr-1" />
                          Ocupada: {mesa.clientes}/{mesa.capacidad}
                        </p>
                        <p className="text-sm text-gray-600">
                          <Clock className="h-4 w-4 inline mr-1" />
                          Tiempo: {mesa.fechaOcupacion ? formatearTiempo(mesa.fechaOcupacion) : mesa.tiempo}
                        </p>
                        {mesa.mesero && <p className="text-sm font-medium">Mesero: {mesa.mesero}</p>}
                      </>
                    )}

                    {mesa.estado === "reservada" && (
                      <>
                        <p className="text-sm text-gray-600">
                          <Clock className="h-4 w-4 inline mr-1" />
                          Reserva: {mesa.horaReserva}
                        </p>
                        {mesa.mesero && <p className="text-sm font-medium">Mesero: {mesa.mesero}</p>}
                      </>
                    )}

                    {mesa.estado === "limpieza" && (
                      <p className="text-sm text-gray-600">
                        <Clock className="h-4 w-4 inline mr-1" />
                        Tiempo restante: {mesa.tiempo}
                      </p>
                    )}
                  </div>

                  {/* Botones siempre en la parte inferior */}
                  <div className="flex space-x-2 mt-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => handleVerMesa(mesa)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Ver
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => handleEditarMesa(mesa)}
                    >
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

      {/* Modales */}
      <MesaDetailModal
        mesa={selectedMesa}
        isOpen={isDetailModalOpen}
        onClose={handleCloseModals}
        onEdit={handleEditFromDetail}
      />

      <MesaEditModal
        mesa={selectedMesa}
        isOpen={isEditModalOpen}
        onClose={handleCloseModals}
        onSuccess={handleSuccessEdit}
      />
    </div>
  )
}
