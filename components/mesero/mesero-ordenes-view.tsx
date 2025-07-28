"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, CheckCircle, AlertCircle, Package, DollarSign, Eye, Edit, Timer, User, MapPin } from "lucide-react"
import type { MeseroOrder, MeseroOrderStats, MeseroOrderStatus } from "@/interfaces/ordenes.interface"
import { updateMeseroOrdenStatus } from "@/actions/meseroOrdenes.actions"
import { toast } from "@/hooks/use-toast"

interface MeseroOrdenesViewProps {
  ordenes: MeseroOrder[]
  stats: MeseroOrderStats
  meseroId: string
}

const estadoColors = {
  pendiente: "bg-yellow-100 text-yellow-800 border-yellow-200",
  en_preparacion: "bg-blue-100 text-blue-800 border-blue-200",
  lista: "bg-green-100 text-green-800 border-green-200",
  entregada: "bg-gray-100 text-gray-800 border-gray-200",
  cancelada: "bg-red-100 text-red-800 border-red-200",
}

const estadoLabels = {
  pendiente: "Pendiente",
  en_preparacion: "En Preparación",
  lista: "Lista",
  entregada: "Entregada",
  cancelada: "Cancelada",
}

export function MeseroOrdenesView({ ordenes, stats, meseroId }: MeseroOrdenesViewProps) {
  const [selectedOrden, setSelectedOrden] = useState<MeseroOrder | null>(null)
  const [editingOrden, setEditingOrden] = useState<MeseroOrder | null>(null)
  const [nuevoEstado, setNuevoEstado] = useState<MeseroOrderStatus>("pendiente")
  const [observaciones, setObservaciones] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  const ordenesActivas = ordenes.filter((orden) => orden.estado !== "entregada" && orden.estado !== "cancelada")

  const ordenesEntregadas = ordenes.filter((orden) => orden.estado === "entregada")

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  const handleUpdateEstado = async () => {
    if (!editingOrden) return

    setIsUpdating(true)
    try {
      const result = await updateMeseroOrdenStatus(editingOrden.id, nuevoEstado, observaciones)

      if (result.success) {
        toast({
          title: "Estado actualizado",
          description: result.message,
        })
        setEditingOrden(null)
        setObservaciones("")
        // En una app real, aquí refrescaríamos los datos
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado de la orden",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const openEditModal = (orden: MeseroOrder) => {
    setEditingOrden(orden)
    setNuevoEstado(orden.estado)
    setObservaciones(orden.observaciones || "")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Mis Órdenes</h1>
        <p className="text-muted-foreground">Gestiona las órdenes asignadas a tus mesas</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pendientes</p>
                <p className="text-2xl font-bold">{stats.pendientes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Timer className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">En Preparación</p>
                <p className="text-2xl font-bold">{stats.enPreparacion}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Listas</p>
                <p className="text-2xl font-bold">{stats.listas}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Entregadas</p>
                <p className="text-2xl font-bold">{stats.entregadas}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de órdenes */}
      <Tabs defaultValue="activas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activas">Órdenes Activas ({ordenesActivas.length})</TabsTrigger>
          <TabsTrigger value="entregadas">Entregadas ({ordenesEntregadas.length})</TabsTrigger>
          <TabsTrigger value="todas">Todas ({ordenes.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="activas" className="space-y-4">
          {ordenesActivas.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hay órdenes activas</h3>
                <p className="text-muted-foreground">
                  Todas las órdenes han sido entregadas o no tienes órdenes asignadas.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ordenesActivas.map((orden) => (
                <Card key={orden.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">#{orden.id}</CardTitle>
                      <Badge className={estadoColors[orden.estado]}>{estadoLabels[orden.estado]}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>Mesa {orden.numeroMesa}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatTime(orden.fechaCreacion)}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {orden.clienteNombre && (
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{orden.clienteNombre}</span>
                      </div>
                    )}

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Productos ({orden.items.length})</p>
                      <div className="space-y-1">
                        {orden.items.slice(0, 2).map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>
                              {item.cantidad}x {item.nombre}
                            </span>
                            <span>{formatCurrency(item.subtotal)}</span>
                          </div>
                        ))}
                        {orden.items.length > 2 && (
                          <p className="text-xs text-muted-foreground">+{orden.items.length - 2} productos más</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-semibold">{formatCurrency(orden.total)}</span>
                      </div>
                      {orden.tiempoEstimado > 0 && (
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Timer className="h-4 w-4" />
                          <span>{orden.tiempoEstimado} min</span>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-transparent"
                            onClick={() => setSelectedOrden(orden)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Ver
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Detalles de Orden #{selectedOrden?.id}</DialogTitle>
                          </DialogHeader>
                          {selectedOrden && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium">Mesa</Label>
                                  <p>{selectedOrden.numeroMesa}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Estado</Label>
                                  <Badge className={estadoColors[selectedOrden.estado]}>
                                    {estadoLabels[selectedOrden.estado]}
                                  </Badge>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Cliente</Label>
                                  <p>{selectedOrden.clienteNombre || "No especificado"}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Hora</Label>
                                  <p>{formatTime(selectedOrden.fechaCreacion)}</p>
                                </div>
                              </div>

                              <div>
                                <Label className="text-sm font-medium">Productos</Label>
                                <div className="mt-2 space-y-2">
                                  {selectedOrden.items.map((item) => (
                                    <div
                                      key={item.id}
                                      className="flex justify-between items-center p-2 bg-muted rounded"
                                    >
                                      <div>
                                        <p className="font-medium">{item.nombre}</p>
                                        <p className="text-sm text-muted-foreground">
                                          Cantidad: {item.cantidad} | Precio: {formatCurrency(item.precio)}
                                        </p>
                                        {item.notas && <p className="text-sm text-blue-600">Nota: {item.notas}</p>}
                                      </div>
                                      <span className="font-semibold">{formatCurrency(item.subtotal)}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="flex justify-between items-center pt-4 border-t">
                                <span className="text-lg font-semibold">Total:</span>
                                <span className="text-lg font-bold text-green-600">
                                  {formatCurrency(selectedOrden.total)}
                                </span>
                              </div>

                              {selectedOrden.observaciones && (
                                <div>
                                  <Label className="text-sm font-medium">Observaciones</Label>
                                  <p className="mt-1 text-sm">{selectedOrden.observaciones}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="flex-1" onClick={() => openEditModal(orden)}>
                            <Edit className="h-4 w-4 mr-1" />
                            Actualizar
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Actualizar Orden #{editingOrden?.id}</DialogTitle>
                          </DialogHeader>
                          {editingOrden && (
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="estado">Nuevo Estado</Label>
                                <Select
                                  value={nuevoEstado}
                                  onValueChange={(value: MeseroOrderStatus) => setNuevoEstado(value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pendiente">Pendiente</SelectItem>
                                    <SelectItem value="en_preparacion">En Preparación</SelectItem>
                                    <SelectItem value="lista">Lista</SelectItem>
                                    <SelectItem value="entregada">Entregada</SelectItem>
                                    <SelectItem value="cancelada">Cancelada</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <Label htmlFor="observaciones">Observaciones</Label>
                                <Textarea
                                  id="observaciones"
                                  value={observaciones}
                                  onChange={(e) => setObservaciones(e.target.value)}
                                  placeholder="Agregar observaciones..."
                                  rows={3}
                                />
                              </div>

                              <div className="flex space-x-2 pt-4">
                                <Button onClick={handleUpdateEstado} disabled={isUpdating} className="flex-1">
                                  {isUpdating ? "Actualizando..." : "Actualizar Estado"}
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="entregadas" className="space-y-4">
          {ordenesEntregadas.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hay órdenes entregadas</h3>
                <p className="text-muted-foreground">Las órdenes entregadas aparecerán aquí.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ordenesEntregadas.map((orden) => (
                <Card key={orden.id} className="opacity-75">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">#{orden.id}</CardTitle>
                      <Badge className={estadoColors[orden.estado]}>{estadoLabels[orden.estado]}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>Mesa {orden.numeroMesa}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatTime(orden.fechaCreacion)}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">
                        {orden.items.length} producto{orden.items.length !== 1 ? "s" : ""}
                      </span>
                      <span className="font-semibold">{formatCurrency(orden.total)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="todas" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ordenes.map((orden) => (
              <Card
                key={orden.id}
                className={orden.estado === "entregada" ? "opacity-75" : "hover:shadow-md transition-shadow"}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">#{orden.id}</CardTitle>
                    <Badge className={estadoColors[orden.estado]}>{estadoLabels[orden.estado]}</Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>Mesa {orden.numeroMesa}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatTime(orden.fechaCreacion)}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {orden.items.length} producto{orden.items.length !== 1 ? "s" : ""}
                    </span>
                    <span className="font-semibold">{formatCurrency(orden.total)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
