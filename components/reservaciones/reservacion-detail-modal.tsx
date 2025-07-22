"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, Users, Phone, Mail, MapPin, FileText, Gift, CheckCircle, XCircle, Edit } from "lucide-react"
import type { Reservacion } from "@/interfaces/reservaciones.interface"

interface ReservacionDetailModalProps {
  reservacion: Reservacion | null
  isOpen: boolean
  onClose: () => void
  onConfirmar?: (id: string) => void
  onCompletar?: (id: string) => void
  onCancelar?: (id: string) => void
  onEditar?: (id: string) => void
}

export function ReservacionDetailModal({
  reservacion,
  isOpen,
  onClose,
  onConfirmar,
  onCompletar,
  onCancelar,
  onEditar,
}: ReservacionDetailModalProps) {
  if (!reservacion) return null

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatCreationDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[80%] max-w-[90%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Detalles de Reservación</span>
            <div className="flex gap-2">
              {getEstadoBadge(reservacion.estado)}
              {getTipoEventoBadge(reservacion.tipoEvento)}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información del Cliente */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-500" />
              Información del Cliente
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-700">Nombre:</span>
                  <span className="text-gray-900">{reservacion.clienteNombre}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="text-gray-900">{reservacion.clienteEmail}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-700">Teléfono:</span>
                  <span className="text-gray-900">{reservacion.clienteTelefono}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Detalles de la Reservación */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              Detalles de la Reservación
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div className="space-y-3">
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
                  <span className="font-medium text-gray-700">Número de personas:</span>
                  <span className="text-gray-900">{reservacion.numeroPersonas}</span>
                </div>
              </div>
              <div className="space-y-3">
                {reservacion.mesaAsignada && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span className="font-medium text-gray-700">Mesa asignada:</span>
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
                    <span className="font-medium text-gray-700">Tipo de evento:</span>
                    {getTipoEventoBadge(reservacion.tipoEvento)}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Observaciones y Solicitudes Especiales */}
          {(reservacion.observaciones || reservacion.solicitudesEspeciales) && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-500" />
                  Notas Adicionales
                </h3>
                <div className="space-y-3">
                  {reservacion.observaciones && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Observaciones:</h4>
                      <p className="text-blue-800 text-sm">{reservacion.observaciones}</p>
                    </div>
                  )}
                  {reservacion.solicitudesEspeciales && (
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium text-purple-900 mb-2">Solicitudes Especiales:</h4>
                      <p className="text-purple-800 text-sm">{reservacion.solicitudesEspeciales}</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Información del Sistema */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">Información del Sistema</h3>
            <div className="text-xs text-gray-500 space-y-1">
              <div>ID de Reservación: {reservacion.id}</div>
              <div>Fecha de creación: {formatCreationDate(reservacion.fechaCreacion)}</div>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onEditar?.(reservacion.id)} className="flex-1 bg-transparent">
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>

            {reservacion.estado === "pendiente" && (
              <>
                <Button
                  onClick={() => onConfirmar?.(reservacion.id)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
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
        </div>
      </DialogContent>
    </Dialog>
  )
}
