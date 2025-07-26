"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { Users, Clock, MapPin, CheckCircle, AlertCircle, Utensils, Timer, Eye } from "lucide-react"
import type { Mesa, EstadisticasMesas, EstadoMesa } from "@/interfaces/mesas.interface"
import { actualizarMesa } from "@/actions/mesas.actions"

interface MeseroMesasViewProps {
  mesas: Mesa[]
  estadisticas: EstadisticasMesas
  meseroActual: string
}

export function MeseroMesasView({ mesas, estadisticas, meseroActual }: MeseroMesasViewProps) {
  const [selectedMesa, setSelectedMesa] = useState<Mesa | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [newEstado, setNewEstado] = useState<EstadoMesa>("libre")
  const [observaciones, setObservaciones] = useState("")
  const [clientes, setClientes] = useState(0)

  // Filtrar mesas asignadas al mesero actual y mesas libres
  const mesasAsignadas = mesas.filter((mesa) => mesa.mesero === meseroActual)
  const mesasLibres = mesas.filter((mesa) => mesa.estado === "libre")
  const todasLasMesas = mesas

  const getEstadoBadge = (estado: EstadoMesa) => {
    const variants = {
      libre: { variant: "secondary" as const, icon: CheckCircle, text: "Libre" },
      ocupada: { variant: "destructive" as const, icon: Users, text: "Ocupada" },
      reservada: { variant: "default" as const, icon: Clock, text: "Reservada" },
      limpieza: { variant: "outline" as const, icon: AlertCircle, text: "Limpieza" },
    }

    const config = variants[estado]
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    )
  }

  const handleActualizarMesa = async () => {
    if (!selectedMesa) return

    setIsUpdating(true)
    try {
      const result = await actualizarMesa(selectedMesa.id, {
        estado: newEstado,
        clientes: newEstado === "ocupada" ? clientes : undefined,
        mesero: newEstado === "ocupada" ? meseroActual : undefined,
        observaciones: observaciones || undefined,
      })

      if (result.success) {
        toast({
          title: "Mesa actualizada",
          description: result.message,
        })
        setSelectedMesa(null)
        // Recargar la página para obtener datos actualizados
        window.location.reload()
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
        description: "No se pudo actualizar la mesa",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const openEditDialog = (mesa: Mesa) => {
    setSelectedMesa(mesa)
    setNewEstado(mesa.estado)
    setObservaciones(mesa.observaciones || "")
    setClientes(mesa.clientes || 0)
  }

  const MesaCard = ({ mesa }: { mesa: Mesa }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Mesa {mesa.numero}</CardTitle>
          {getEstadoBadge(mesa.estado)}
        </div>
        <CardDescription className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {mesa.ubicacion}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            Capacidad: {mesa.capacidad}
          </span>
          {mesa.clientes && (
            <span className="flex items-center gap-1">
              <Utensils className="h-4 w-4" />
              Clientes: {mesa.clientes}
            </span>
          )}
        </div>

        {mesa.estado === "ocupada" && mesa.fechaOcupacion && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Timer className="h-4 w-4" />
            Ocupada desde: {new Date(mesa.fechaOcupacion).toLocaleTimeString()}
          </div>
        )}

        {mesa.estado === "reservada" && mesa.horaReserva && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            Reserva: {mesa.horaReserva}
          </div>
        )}

        {mesa.observaciones && (
          <p className="text-sm text-muted-foreground bg-muted p-2 rounded">{mesa.observaciones}</p>
        )}

        <div className="flex gap-2 pt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Eye className="h-4 w-4 mr-1" />
                Ver
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Mesa {mesa.numero} - Detalles</DialogTitle>
                <DialogDescription>Información completa de la mesa</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Estado</Label>
                    <div className="mt-1">{getEstadoBadge(mesa.estado)}</div>
                  </div>
                  <div>
                    <Label>Ubicación</Label>
                    <p className="text-sm mt-1">{mesa.ubicacion}</p>
                  </div>
                  <div>
                    <Label>Capacidad</Label>
                    <p className="text-sm mt-1">{mesa.capacidad} personas</p>
                  </div>
                  {mesa.clientes && (
                    <div>
                      <Label>Clientes actuales</Label>
                      <p className="text-sm mt-1">{mesa.clientes} personas</p>
                    </div>
                  )}
                </div>
                {mesa.observaciones && (
                  <div>
                    <Label>Observaciones</Label>
                    <p className="text-sm mt-1 bg-muted p-2 rounded">{mesa.observaciones}</p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="default" size="sm" className="flex-1" onClick={() => openEditDialog(mesa)}>
            Actualizar
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Mis Mesas</h1>
        <p className="text-muted-foreground">Gestiona las mesas asignadas y disponibles</p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Mis Mesas</p>
                <p className="text-2xl font-bold">{mesasAsignadas.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Disponibles</p>
                <p className="text-2xl font-bold">{mesasLibres.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Utensils className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Ocupadas</p>
                <p className="text-2xl font-bold">{estadisticas.mesasOcupadas}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Reservadas</p>
                <p className="text-2xl font-bold">{estadisticas.mesasReservadas}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs para diferentes vistas */}
      <Tabs defaultValue="asignadas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="asignadas">Mis Mesas ({mesasAsignadas.length})</TabsTrigger>
          <TabsTrigger value="disponibles">Disponibles ({mesasLibres.length})</TabsTrigger>
          <TabsTrigger value="todas">Todas ({todasLasMesas.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="asignadas" className="space-y-4">
          {mesasAsignadas.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No tienes mesas asignadas</h3>
                <p className="text-muted-foreground">Las mesas que te sean asignadas aparecerán aquí</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mesasAsignadas.map((mesa) => (
                <MesaCard key={mesa.id} mesa={mesa} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="disponibles" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mesasLibres.map((mesa) => (
              <MesaCard key={mesa.id} mesa={mesa} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="todas" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todasLasMesas.map((mesa) => (
              <MesaCard key={mesa.id} mesa={mesa} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal para actualizar mesa */}
      <Dialog open={!!selectedMesa} onOpenChange={() => setSelectedMesa(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Actualizar Mesa {selectedMesa?.numero}</DialogTitle>
            <DialogDescription>Cambia el estado y detalles de la mesa</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="estado">Estado</Label>
              <Select value={newEstado} onValueChange={(value: EstadoMesa) => setNewEstado(value)}>
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

            {newEstado === "ocupada" && (
              <div>
                <Label htmlFor="clientes">Número de clientes</Label>
                <Input
                  id="clientes"
                  type="number"
                  min="1"
                  max={selectedMesa?.capacidad || 10}
                  value={clientes}
                  onChange={(e) => setClientes(Number.parseInt(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Capacidad máxima: {selectedMesa?.capacidad} personas
                </p>
              </div>
            )}

            <div>
              <Label htmlFor="observaciones">Observaciones</Label>
              <Textarea
                id="observaciones"
                placeholder="Notas adicionales sobre la mesa..."
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setSelectedMesa(null)}>
                Cancelar
              </Button>
              <Button className="flex-1" onClick={handleActualizarMesa} disabled={isUpdating}>
                {isUpdating ? "Actualizando..." : "Actualizar Mesa"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
