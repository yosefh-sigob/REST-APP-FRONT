"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Loader2, Save, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Mesa } from "@/interfaces/mesas.interface"
import { actualizarEstadoMesa } from "@/actions/mesas.actions"

interface MesaEditModalProps {
  mesa: Mesa | null
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const MESEROS_DISPONIBLES = [
  "Juan Pérez",
  "María García",
  "Carlos López",
  "Ana Martín",
  "Luis Rodríguez",
  "Carmen Jiménez",
  "Pedro Sánchez",
  "Laura Fernández",
]

export function MesaEditModal({ mesa, isOpen, onClose, onSuccess }: MesaEditModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    estado: mesa?.estado || "libre",
    clientes: mesa?.clientes || 0,
    mesero: mesa?.mesero || "",
    observaciones: mesa?.observaciones || "",
  })
  const { toast } = useToast()

  if (!mesa) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await actualizarEstadoMesa(mesa.id, formData.estado as Mesa["estado"])

      toast({
        title: "Mesa actualizada",
        description: "Los cambios se han guardado correctamente.",
      })

      onSuccess()
      onClose()
    } catch (error) {
      console.error("Error al actualizar mesa:", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar la mesa. Intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEstadoChange = (nuevoEstado: string) => {
    setFormData((prev) => ({
      ...prev,
      estado: nuevoEstado,
      // Resetear campos según el estado
      clientes: nuevoEstado === "libre" ? 0 : prev.clientes,
      mesero: nuevoEstado === "libre" ? "" : prev.mesero,
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Mesa {mesa.numero}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Básica */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Número de Mesa</Label>
                  <Input value={mesa.numero} disabled className="bg-gray-50" />
                </div>
                <div>
                  <Label>Capacidad</Label>
                  <Input value={`${mesa.capacidad} personas`} disabled className="bg-gray-50" />
                </div>
              </div>
              <div>
                <Label>Ubicación</Label>
                <Input value={mesa.ubicacion || ""} disabled className="bg-gray-50" />
              </div>
            </CardContent>
          </Card>

          {/* Estado y Asignación */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Estado y Asignación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="estado">Estado de la Mesa</Label>
                <Select value={formData.estado} onValueChange={handleEstadoChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="libre">Libre</SelectItem>
                    <SelectItem value="ocupada">Ocupada</SelectItem>
                    <SelectItem value="reservada">Reservada</SelectItem>
                    <SelectItem value="limpieza">En Limpieza</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(formData.estado === "ocupada" || formData.estado === "reservada") && (
                <>
                  <div>
                    <Label htmlFor="mesero">Mesero Asignado</Label>
                    <Select
                      value={formData.mesero}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, mesero: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar mesero" />
                      </SelectTrigger>
                      <SelectContent>
                        {MESEROS_DISPONIBLES.map((mesero) => (
                          <SelectItem key={mesero} value={mesero}>
                            {mesero}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.estado === "ocupada" && (
                    <div>
                      <Label htmlFor="clientes">Número de Clientes</Label>
                      <Input
                        id="clientes"
                        type="number"
                        min="1"
                        max={mesa.capacidad}
                        value={formData.clientes}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, clientes: Number.parseInt(e.target.value) || 0 }))
                        }
                        placeholder="Número de clientes"
                      />
                    </div>
                  )}
                </>
              )}

              <div>
                <Label htmlFor="observaciones">Observaciones</Label>
                <Textarea
                  id="observaciones"
                  value={formData.observaciones}
                  onChange={(e) => setFormData((prev) => ({ ...prev, observaciones: e.target.value }))}
                  placeholder="Observaciones adicionales..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Acciones */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Cambios
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
