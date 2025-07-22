"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Clock,
  Users,
  Mail,
  Phone,
  MapPin,
  FileText,
  Star,
  CheckCircle,
  XCircle,
  Edit,
  Clock3,
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
        </DialogHeader>

        <div className="space-y-6">
          {/* Información del Cliente */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Información del Cliente</h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{reservacion.clienteNombre}</p>
                  <p className="text-sm text-gray-500">Nombre completo</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Mail className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{reservacion.clienteEmail}</p>
                  <p className="text-sm text-gray-500">Correo electrónico</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Phone className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{reservacion.clienteTelefono}</p>
                  <p className="text-sm text-gray-500">Teléfono</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Detalles de la Reservación */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Detalles de la Reservación</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{formatearFecha(reservacion.fechaReservacion)}</p>
                  <p className="text-sm text-gray-500">Fecha</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{reservacion.horaReservacion}</p>
                  <p className="text-sm text-gray-500">Hora</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{reservacion.numeroPersonas} personas</p>
                  <p className="text-sm text-gray-500">Comensales</p>
                </div>
              </div>

              {reservacion.mesaAsignada && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Mesa {reservacion.mesaAsignada}</p>
                    <p className="text-sm text-gray-500">Mesa asignada</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notas Adicionales */}
          {(reservacion.observaciones || reservacion.solicitudesEspeciales) && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Notas Adicionales</h3>

                {reservacion.observaciones && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-start gap-2">
                      <FileText className="h-4 w-4 text-gray-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Observaciones</p>
                        <p className="text-sm text-gray-700 mt-1">{reservacion.observaciones}</p>
                      </div>
                    </div>
                  </div>
                )}

                {reservacion.solicitudesEspeciales && (
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Solicitudes Especiales</p>
                        <p className="text-sm text-gray-700 mt-1">{reservacion.solicitudesEspeciales}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          <Separator />

          {/* Información del Sistema */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-900">Información del Sistema</h3>
            <div className="text-xs text-gray-500 space-y-1">
              <p>
                <strong>ID:</strong> {reservacion.id}
              </p>
              <p>
                <strong>Creada:</strong> {formatearFechaCorta(reservacion.fechaCreacion)}
              </p>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button variant="outline" onClick={() => onEditar(reservacion)} className="gap-2">
              <Edit className="h-4 w-4" />
              Editar
            </Button>

            {reservacion.estado === "pendiente" && (
              <>
                <Button onClick={() => onConfirmar(reservacion.id)} className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Confirmar
                </Button>
                <Button variant="destructive" onClick={() => onCancelar(reservacion.id)} className="gap-2">
                  <XCircle className="h-4 w-4" />
                  Cancelar
                </Button>
              </>
            )}

            {reservacion.estado === "confirmada" && (
              <Button onClick={() => onCompletar(reservacion.id)} className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Completar
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
