"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Users, MapPin, Clock, User, FileText, Edit, Calendar } from "lucide-react"
import type { Mesa } from "@/interfaces/mesas.interface"

interface MesaDetailModalProps {
  mesa: Mesa | null
  isOpen: boolean
  onClose: () => void
  onEdit: (mesa: Mesa) => void
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

function formatearFecha(fecha: string): string {
  return new Date(fecha).toLocaleString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function calcularTiempoOcupacion(fechaOcupacion: string): string {
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

export function MesaDetailModal({ mesa, isOpen, onClose, onEdit }: MesaDetailModalProps) {
  if (!mesa) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Mesa {mesa.numero}</span>
            <Badge className={getMesaStatusColor(mesa.estado)}>
              {mesa.estado.charAt(0).toUpperCase() + mesa.estado.slice(1)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Información básica */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-gray-500" />
              <span>Capacidad: {mesa.capacidad} personas</span>
            </div>

            {mesa.ubicacion && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{mesa.ubicacion}</span>
              </div>
            )}
          </div>

          <Separator />

          {/* Información del estado actual */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700">Estado Actual</h4>

            {mesa.estado === "ocupada" && (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>
                    Clientes: {mesa.clientes}/{mesa.capacidad}
                  </span>
                </div>

                {mesa.fechaOcupacion && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>Tiempo ocupada: {calcularTiempoOcupacion(mesa.fechaOcupacion)}</span>
                  </div>
                )}

                {mesa.mesero && (
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>Mesero: {mesa.mesero}</span>
                  </div>
                )}
              </>
            )}

            {mesa.estado === "reservada" && (
              <>
                {mesa.horaReserva && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>Hora de reserva: {mesa.horaReserva}</span>
                  </div>
                )}

                {mesa.mesero && (
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>Mesero asignado: {mesa.mesero}</span>
                  </div>
                )}
              </>
            )}

            {mesa.estado === "limpieza" && mesa.tiempo && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>Tiempo restante: {mesa.tiempo}</span>
              </div>
            )}

            {mesa.estado === "libre" && <div className="text-sm text-green-600">Mesa disponible para asignar</div>}
          </div>

          {/* Observaciones */}
          {mesa.observaciones && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <h4 className="font-medium text-sm text-gray-700">Observaciones</h4>
                </div>
                <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{mesa.observaciones}</p>
              </div>
            </>
          )}

          {/* Información de fechas */}
          <Separator />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <h4 className="font-medium text-sm text-gray-700">Información</h4>
            </div>

            <div className="text-xs text-gray-500 space-y-1">
              <div>Creada: {formatearFecha(mesa.fechaCreacion)}</div>
              <div>Última actualización: {formatearFecha(mesa.fechaActualizacion)}</div>
              {mesa.fechaOcupacion && <div>Ocupada desde: {formatearFecha(mesa.fechaOcupacion)}</div>}
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2 pt-4">
          <Button variant="outline" onClick={() => onEdit(mesa)} className="flex-1">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
