"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  Calendar,
  Clock,
  Users,
  Mail,
  Phone,
  MapPin,
  FileText,
  CheckCircle,
  XCircle,
  Edit,
  Clock3,
  Gift,
} from "lucide-react"
import type { Reservacion } from "@/interfaces/reservaciones.interface"

interface ReservacionDetailModalProps {
  reservacion: Reservacion | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirmar: (id: string) => void
  onCompletar: (id: string) => void
  onCancelar: (id: string) => void
  onEditar: (reservacion: Reservacion) => void
}

export function ReservacionDetailModal({
  reservacion,
  open,
  onOpenChange,
  onConfirmar,
  onCompletar,
  onCancelar,
  onEditar,
}: ReservacionDetailModalProps) {
  if (!reservacion) return null

  const getEstadoBadge = (estado: Reservacion["estado"]) => {
    const config = {
      pendiente: { variant: "secondary" as const, icon: Clock3, text: "Pendiente", color: "text-yellow-600" },
      confirmada: { variant: "default" as const, icon: CheckCircle, text: "Confirmada", color: "text-green-600" },
      completada: { variant: "default" as const, icon: CheckCircle, text: "Completada", color: "text-blue-600" },
      cancelada: { variant: "destructive" as const, icon: XCircle, text: "Cancelada", color: "text-red-600" },
    }

    const { variant, icon: Icon, text, color } = config[estado]

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
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatearFechaCorta = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDate = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatCreationDate = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Detalles de Reservación</span>
            <div className="flex items-center gap-2">
              {getEstadoBadge(reservacion.estado)}
              {reservacion.tipoEvento && getTipoEventoBadge(reservacion.tipoEvento)}
            </div>
          </DialogTitle>
          <DialogDescription>
            Información completa de la reservación para {reservacion.clienteNombre} el{" "}
            {formatDate(reservacion.fechaReservacion)} a las {reservacion.horaReservacion}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto">
          {/* Columna Izquierda - Información del Cliente */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-500" />
              Información del Cliente
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-700">Nombre:</span>
                <span className="text-gray-900">{reservacion.clienteNombre}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-700">Email:</span>
                <span className="text-gray-900 break-all">{reservacion.clienteEmail}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-700">Teléfono:</span>
                <span className="text-gray-900">{reservacion.clienteTelefono}</span>
              </div>
            </div>

            {/* Información del Sistema */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Información del Sistema</h3>
              <div className="text-xs text-gray-500 space-y-1 bg-gray-50 p-3 rounded">
                <div>ID: {reservacion.id}</div>
                <div>Creada: {formatCreationDate(reservacion.fechaCreacion)}</div>
              </div>
            </div>
          </div>

          {/* Columna Derecha - Detalles de la Reservación */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              Detalles de la Reservación
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span className="font-medium text-gray-700">Fecha:</span>
                <span className="text-gray-900">{formatDate(reservacion.fechaReservacion)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="font-medium text-gray-700">Hora:</span>
                <span className="text-gray-900">{reservacion.horaReservacion}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-orange-500" />
                <span className="font-medium text-gray-700">Personas:</span>
                <span className="text-gray-900">{reservacion.numeroPersonas}</span>
              </div>
              {reservacion.mesaAsignada && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span className="font-medium text-gray-700">Mesa:</span>
                  <span className="text-gray-900">Mesa {reservacion.mesaAsignada}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-700">Estado:</span>
                {getEstadoBadge(reservacion.estado)}
              </div>
              {reservacion.tipoEvento && (
                <div className="flex items-center gap-2 text-sm">
                  <Gift className="w-4 h-4 text-orange-500" />
                  <span className="font-medium text-gray-700">Evento:</span>
                  {getTipoEventoBadge(reservacion.tipoEvento)}
                </div>
              )}
            </div>
          </div>

          {/* Notas Adicionales - Fila completa */}
          {(reservacion.observaciones || reservacion.solicitudesEspeciales) && (
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-500" />
                Notas Adicionales
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {reservacion.observaciones && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-1 text-sm">Observaciones:</h4>
                    <p className="text-blue-800 text-sm">{reservacion.observaciones}</p>
                  </div>
                )}
                {reservacion.solicitudesEspeciales && (
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-1 text-sm">Solicitudes Especiales:</h4>
                    <p className="text-purple-800 text-sm">{reservacion.solicitudesEspeciales}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Acciones - Fuera del scroll */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t mt-4">
          <Button variant="outline" onClick={() => onEditar?.(reservacion.id)} className="flex-1 bg-transparent">
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </Button>

          {reservacion.estado === "pendiente" && (
            <>
              <Button onClick={() => onConfirmar?.(reservacion.id)} className="flex-1 bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirmar
              </Button>
              <Button
                variant="outline"
                onClick={() => onCancelar?.(reservacion.id)}
                className="flex-1 border-red-200 text-red-700 hover:bg-red-50"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
            </>
          )}

          {reservacion.estado === "confirmada" && (
            <Button onClick={() => onCompletar?.(reservacion.id)} className="flex-1 bg-blue-600 hover:bg-blue-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              Completar
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
