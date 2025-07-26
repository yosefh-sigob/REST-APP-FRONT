"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Users, Clock, MapPin, User, FileText, Calendar } from "lucide-react"
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

export function MesaDetailModal({ mesa, isOpen, onClose, onEdit }: MesaDetailModalProps) {
  if (!mesa) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span>Mesa {mesa.numero}</span>
            <Badge className={getMesaStatusColor(mesa.estado)}>
              {mesa.estado.charAt(0).toUpperCase() + mesa.estado.slice(1)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información Básica */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Información Básica</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Capacidad: {mesa.capacidad} personas</span>
                </div>
                {mesa.ubicacion && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{mesa.ubicacion}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Estado Actual */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Estado Actual</h3>
              <div className="space-y-3">
                {mesa.estado === "ocupada" && (
                  <>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        Clientes: {mesa.clientes}/{mesa.capacidad}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        Tiempo ocupada: {mesa.fechaOcupacion ? formatearTiempo(mesa.fechaOcupacion) : mesa.tiempo}
                      </span>
                    </div>
                    {mesa.mesero && (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">Mesero: {mesa.mesero}</span>
                      </div>
                    )}
                    {mesa.fechaOcupacion && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">Ocupada desde: {new Date(mesa.fechaOcupacion).toLocaleString()}</span>
                      </div>
                    )}
                  </>
                )}

                {mesa.estado === "reservada" && (
                  <>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Hora de reserva: {mesa.horaReserva}</span>
                    </div>
                    {mesa.mesero && (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">Mesero asignado: {mesa.mesero}</span>
                      </div>
                    )}
                  </>
                )}

                {mesa.estado === "limpieza" && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Tiempo restante: {mesa.tiempo}</span>
                  </div>
                )}

                {mesa.estado === "libre" && (
                  <div className="flex items-center gap-2 text-green-600">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-medium">Mesa disponible para asignar</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Observaciones */}
          {mesa.observaciones && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Observaciones
                </h3>
                <p className="text-sm text-gray-600">{mesa.observaciones}</p>
              </CardContent>
            </Card>
          )}

          <Separator />

          {/* Acciones */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
            <Button
              onClick={() => onEdit(mesa)}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
            >
              Editar Mesa
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
