"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Eye,
  Calendar,
  Clock,
  Users,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Clock3,
  Filter,
  Grid3X3,
  List,
} from "lucide-react"
import type { Reservacion, ReservacionesViewProps } from "@/interfaces/reservaciones.interface"
import { ReservacionDetailModal } from "./reservacion-detail-modal"
import { CrearReservacionForm } from "./crear-reservacion-form"

type ViewMode = "grid" | "list"

export function ReservacionesView({ reservaciones: reservacionesIniciales }: ReservacionesViewProps) {
  const [reservaciones, setReservaciones] = useState<Reservacion[]>(reservacionesIniciales)
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroEstado, setFiltroEstado] = useState<string>("todos")
  const [selectedReservacion, setSelectedReservacion] = useState<Reservacion | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>("list")

  // Función para refrescar la lista después de crear una nueva reservación
  const handleReservacionCreada = () => {
    // En una aplicación real, aquí harías un refetch de los datos
    // Por ahora, simplemente cerramos el modal y mostramos un mensaje
    window.location.reload() // Temporal: recargar la página para ver la nueva reservación
  }

  // Filtrar reservaciones
  const reservacionesFiltradas = useMemo(() => {
    return reservaciones.filter((reservacion) => {
      const matchesSearch =
        reservacion.clienteNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservacion.clienteEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservacion.clienteTelefono.includes(searchTerm)

      const matchesEstado = filtroEstado === "todos" || reservacion.estado === filtroEstado

      return matchesSearch && matchesEstado
    })
  }, [reservaciones, searchTerm, filtroEstado])

  // Estadísticas
  const estadisticas = useMemo(() => {
    const total = reservaciones.length
    const pendientes = reservaciones.filter((r) => r.estado === "pendiente").length
    const confirmadas = reservaciones.filter((r) => r.estado === "confirmada").length
    const completadas = reservaciones.filter((r) => r.estado === "completada").length
    const canceladas = reservaciones.filter((r) => r.estado === "cancelada").length

    return { total, pendientes, confirmadas, completadas, canceladas }
  }, [reservaciones])

  const handleVerDetalles = (reservacion: Reservacion) => {
    setSelectedReservacion(reservacion)
    setModalOpen(true)
  }

  const getEstadoBadge = (estado: Reservacion["estado"]) => {
    const config = {
      pendiente: { variant: "secondary" as const, icon: Clock3, text: "Pendiente" },
      confirmada: { variant: "default" as const, icon: CheckCircle, text: "Confirmada" },
      completada: { variant: "default" as const, icon: CheckCircle, text: "Completada" },
      cancelada: { variant: "destructive" as const, icon: XCircle, text: "Cancelada" },
    }

    const { variant, icon: Icon, text } = config[estado]

    return (
      <Badge variant={variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {text}
      </Badge>
    )
  }

  const getTipoEventoBadge = (tipo: string) => {
    const config = {
      cumpleanos: { color: "bg-pink-100 text-pink-800", text: "Cumpleaños" },
      aniversario: { color: "bg-red-100 text-red-800", text: "Aniversario" },
      negocio: { color: "bg-blue-100 text-blue-800", text: "Negocio" },
      familiar: { color: "bg-green-100 text-green-800", text: "Familiar" },
      otro: { color: "bg-gray-100 text-gray-800", text: "Otro" },
    }

    const { color, text } = config[tipo as keyof typeof config] || config.otro

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${color}`}>{text}</span>
    )
  }

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatearHora = (hora: string) => {
    return hora
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reservaciones</h1>
          <p className="text-gray-600">Gestiona las reservaciones del restaurante</p>
        </div>
        <div className="flex items-center gap-4">
          <CrearReservacionForm onReservacionCreada={handleReservacionCreada} />
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar por nombre, email o teléfono..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center border rounded-lg p-1">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="h-8 w-8 p-0"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="h-8 w-8 p-0"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
        <Select value={filtroEstado} onValueChange={setFiltroEstado}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los estados</SelectItem>
            <SelectItem value="pendiente">Pendientes</SelectItem>
            <SelectItem value="confirmada">Confirmadas</SelectItem>
            <SelectItem value="completada">Completadas</SelectItem>
            <SelectItem value="cancelada">Canceladas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {viewMode === "grid" ? (
        /* Vista Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reservacionesFiltradas.length === 0 ? (
            <div className="col-span-full">
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay reservaciones</h3>
                  <p className="text-gray-600">
                    {searchTerm || filtroEstado !== "todos"
                      ? "No se encontraron reservaciones con los filtros aplicados."
                      : "Aún no hay reservaciones registradas."}
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            reservacionesFiltradas.map((reservacion) => (
              <Card key={reservacion.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{reservacion.clienteNombre}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {getEstadoBadge(reservacion.estado)}
                          {reservacion.tipoEvento && getTipoEventoBadge(reservacion.tipoEvento)}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{formatearFecha(reservacion.fechaReservacion)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{formatearHora(reservacion.horaReservacion)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{reservacion.numeroPersonas} personas</span>
                      </div>
                      {reservacion.mesaAsignada && (
                        <div className="text-sm font-medium">Mesa {reservacion.mesaAsignada}</div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span className="truncate">{reservacion.clienteEmail}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{reservacion.clienteTelefono}</span>
                      </div>
                    </div>

                    {reservacion.observaciones && (
                      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded line-clamp-2">
                        <strong>Observaciones:</strong> {reservacion.observaciones}
                      </p>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleVerDetalles(reservacion)}
                      className="w-full gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      Ver Detalles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      ) : (
        /* Vista Lista */
        <div className="grid gap-4">
          {reservacionesFiltradas.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay reservaciones</h3>
                <p className="text-gray-600">
                  {searchTerm || filtroEstado !== "todos"
                    ? "No se encontraron reservaciones con los filtros aplicados."
                    : "Aún no hay reservaciones registradas."}
                </p>
              </CardContent>
            </Card>
          ) : (
            reservacionesFiltradas.map((reservacion) => (
              <Card key={reservacion.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Información principal */}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <h3 className="text-lg font-semibold text-gray-900">{reservacion.clienteNombre}</h3>
                        <div className="flex items-center gap-2">
                          {getEstadoBadge(reservacion.estado)}
                          {reservacion.tipoEvento && getTipoEventoBadge(reservacion.tipoEvento)}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatearFecha(reservacion.fechaReservacion)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{formatearHora(reservacion.horaReservacion)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{reservacion.numeroPersonas} personas</span>
                        </div>
                        {reservacion.mesaAsignada && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Mesa {reservacion.mesaAsignada}</span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span className="truncate">{reservacion.clienteEmail}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{reservacion.clienteTelefono}</span>
                        </div>
                      </div>

                      {reservacion.observaciones && (
                        <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          <strong>Observaciones:</strong> {reservacion.observaciones}
                        </p>
                      )}
                    </div>

                    {/* Acciones */}
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVerDetalles(reservacion)}
                        className="gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Modal de detalles */}
      <ReservacionDetailModal
        reservacion={selectedReservacion}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onConfirmar={() => {}}
        onCompletar={() => {}}
        onCancelar={() => {}}
        onEditar={() => {}}
      />
    </div>
  )
}
