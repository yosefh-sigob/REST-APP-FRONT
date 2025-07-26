"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import type { Mesa, EstadoMesa } from "@/interfaces/mesas.interface"
import { actualizarMesa, obtenerMeseros } from "@/actions/mesas.actions"

interface MesaEditModalProps {
  mesa: Mesa | null
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function MesaEditModal({ mesa, isOpen, onClose, onSuccess }: MesaEditModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [meseros, setMeseros] = useState<string[]>([])
  const [formData, setFormData] = useState({
    estado: "" as EstadoMesa,
    clientes: 0,
    mesero: "",
    observaciones: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    if (mesa && isOpen) {
      setFormData({
        estado: mesa.estado,
        clientes: mesa.clientes || 0,
        mesero: mesa.mesero || "",
        observaciones: mesa.observaciones || "",
      })

      // Cargar meseros
      obtenerMeseros().then(setMeseros)
    }
  }, [mesa, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!mesa) return

    setIsLoading(true)

    try {
      const result = await actualizarMesa(mesa.id, {
        estado: formData.estado,
        clientes: formData.clientes,
        mesero: formData.mesero || undefined,
        observaciones: formData.observaciones || undefined,
      })

      if (result.success) {
        toast({
          title: "Mesa actualizada",
          description: result.message,
        })
        onSuccess()
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error inesperado al actualizar la mesa",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEstadoChange = (nuevoEstado: EstadoMesa) => {
    setFormData((prev) => ({
      ...prev,
      estado: nuevoEstado,
      // Resetear campos según el estado
      clientes: nuevoEstado === "libre" ? 0 : prev.clientes,
      mesero: nuevoEstado === "libre" ? "" : prev.mesero,
    }))
  }

  if (!mesa) return null

  const requiereMesero = formData.estado === "ocupada" || formData.estado === "reservada"
  const requiereClientes = formData.estado === "ocupada"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Mesa {mesa.numero}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Estado */}
          <div className="space-y-2">
            <Label htmlFor="estado">Estado</Label>
            <Select value={formData.estado} onValueChange={handleEstadoChange}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="libre">Libre</SelectItem>
                <SelectItem value="ocupada">Ocupada</SelectItem>
                <SelectItem value="reservada">Reservada</SelectItem>
                <SelectItem value="limpieza">Limpieza</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Número de clientes */}
          {requiereClientes && (
            <div className="space-y-2">
              <Label htmlFor="clientes">Número de clientes</Label>
              <Input
                id="clientes"
                type="number"
                min="1"
                max={mesa.capacidad}
                value={formData.clientes}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    clientes: Number.parseInt(e.target.value) || 0,
                  }))
                }
                placeholder={`Máximo ${mesa.capacidad} personas`}
                required={requiereClientes}
              />
              <p className="text-xs text-gray-500">Capacidad máxima: {mesa.capacidad} personas</p>
            </div>
          )}

          {/* Mesero */}
          {requiereMesero && (
            <div className="space-y-2">
              <Label htmlFor="mesero">Mesero asignado</Label>
              <Select
                value={formData.mesero}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    mesero: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar mesero" />
                </SelectTrigger>
                <SelectContent>
                  {meseros.map((mesero) => (
                    <SelectItem key={mesero} value={mesero}>
                      {mesero}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Observaciones */}
          <div className="space-y-2">
            <Label htmlFor="observaciones">Observaciones</Label>
            <Textarea
              id="observaciones"
              value={formData.observaciones}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  observaciones: e.target.value,
                }))
              }
              placeholder="Notas adicionales sobre la mesa..."
              rows={3}
            />
          </div>

          {/* Información de la mesa */}
          <div className="bg-gray-50 p-3 rounded text-sm">
            <div className="font-medium mb-1">Información de la mesa:</div>
            <div>Capacidad: {mesa.capacidad} personas</div>
            {mesa.ubicacion && <div>Ubicación: {mesa.ubicacion}</div>}
          </div>

          {/* Botones */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Guardar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
