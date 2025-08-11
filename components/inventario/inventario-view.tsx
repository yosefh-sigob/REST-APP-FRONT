"use client"

import { useState, useTransition } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { ViewToggle } from "@/components/ui/view-toggle"
import {
  Package,
  AlertTriangle,
  AlertCircle,
  XCircle,
  CheckCircle,
  Search,
  Filter,
  Calendar,
  MapPin,
  DollarSign,
  Edit,
} from "lucide-react"
import type {
  ItemInventario,
  EstadisticasInventario,
  FiltrosInventario,
  CategoriaInventario,
  EstadoInventario,
} from "@/interfaces/inventario.interface"
import { filtrarInventario, actualizarCantidadInventario } from "@/actions/inventario.actions"

interface InventarioViewProps {
  inventario: ItemInventario[]
  estadisticas: EstadisticasInventario
}

export default function InventarioView({ inventario: inventarioInicial, estadisticas }: InventarioViewProps) {
  const [inventario, setInventario] = useState<ItemInventario[]>(inventarioInicial)
  const [filtros, setFiltros] = useState<FiltrosInventario>({})
  const [itemSeleccionado, setItemSeleccionado] = useState<ItemInventario | null>(null)
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false)
  const [modalActualizarAbierto, setModalActualizarAbierto] = useState(false)
  const [nuevaCantidad, setNuevaCantidad] = useState<string>("")
  const [observaciones, setObservaciones] = useState("")
  const [isPending, startTransition] = useTransition()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const categorias: CategoriaInventario[] = [
    "Carnes",
    "Verduras",
    "Frutas",
    "Lácteos",
    "Granos",
    "Aceites",
    "Condimentos",
    "Pastas",
    "Bebidas",
    "Otros",
  ]
  const estados: EstadoInventario[] = ["disponible", "bajo_stock", "critico", "agotado", "vencido"]

  const aplicarFiltros = async (nuevosFiltros: FiltrosInventario) => {
    startTransition(async () => {
      const inventarioFiltrado = await filtrarInventario(nuevosFiltros)
      setInventario(inventarioFiltrado)
      setFiltros(nuevosFiltros)
    })
  }

  const limpiarFiltros = () => {
    setInventario(inventarioInicial)
    setFiltros({})
  }

  const obtenerColorEstado = (estado: EstadoInventario) => {
    switch (estado) {
      case "disponible":
        return "bg-green-100 text-green-800 border-green-200"
      case "bajo_stock":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "critico":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "agotado":
        return "bg-red-100 text-red-800 border-red-200"
      case "vencido":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const obtenerIconoEstado = (estado: EstadoInventario) => {
    switch (estado) {
      case "disponible":
        return <CheckCircle className="h-4 w-4" />
      case "bajo_stock":
        return <AlertTriangle className="h-4 w-4" />
      case "critico":
        return <AlertCircle className="h-4 w-4" />
      case "agotado":
        return <XCircle className="h-4 w-4" />
      case "vencido":
        return <XCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatearMoneda = (cantidad: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(cantidad)
  }

  const estaProximoVencer = (fechaVencimiento: string) => {
    const hoy = new Date()
    const vencimiento = new Date(fechaVencimiento)
    const diasRestantes = Math.ceil((vencimiento.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24))
    return diasRestantes <= 7 && diasRestantes >= 0
  }

  const abrirModalDetalle = (item: ItemInventario) => {
    setItemSeleccionado(item)
    setModalDetalleAbierto(true)
  }

  const abrirModalActualizar = (item: ItemInventario) => {
    setItemSeleccionado(item)
    setNuevaCantidad(item.cantidadActual.toString())
    setObservaciones("")
    setModalActualizarAbierto(true)
  }

  const actualizarCantidad = async () => {
    if (!itemSeleccionado || !nuevaCantidad) return

    startTransition(async () => {
      const resultado = await actualizarCantidadInventario({
        itemId: itemSeleccionado.id,
        cantidadActual: Number.parseFloat(nuevaCantidad),
        observaciones: observaciones || undefined,
      })

      if (resultado.success) {
        // Actualizar el item en la lista local
        const inventarioActualizado = inventario.map((item) =>
          item.id === itemSeleccionado.id ? { ...item, cantidadActual: Number.parseFloat(nuevaCantidad) } : item,
        )
        setInventario(inventarioActualizado)
        setModalActualizarAbierto(false)
      }
    })
  }

  const renderGridView = (items: ItemInventario[]) => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card key={item.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">{item.nombre}</CardTitle>
                <CardDescription>{item.categoria}</CardDescription>
              </div>
              <Badge className={obtenerColorEstado(item.estado)}>
                {obtenerIconoEstado(item.estado)}
                <span className="ml-1">{item.estado.replace("_", " ")}</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Cantidad</p>
                <p className="font-medium">
                  {item.cantidadActual} {item.unidad}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Mínimo</p>
                <p className="font-medium">
                  {item.cantidadMinima} {item.unidad}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Costo</p>
                <p className="font-medium">{formatearMoneda(item.costoUnitario)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Vencimiento</p>
                <p className={`font-medium ${estaProximoVencer(item.fechaVencimiento) ? "text-orange-600" : ""}`}>
                  {formatearFecha(item.fechaVencimiento)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{item.ubicacion}</span>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => abrirModalDetalle(item)} className="flex-1">
                Ver detalles
              </Button>
              <Button variant="outline" size="sm" onClick={() => abrirModalActualizar(item)}>
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderListView = (items: ItemInventario[]) => (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-6">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <div>
                  <h3 className="text-lg font-semibold">{item.nombre}</h3>
                  <p className="text-sm text-muted-foreground">{item.categoria}</p>
                </div>

                <div className="text-center">
                  <Badge className={obtenerColorEstado(item.estado)}>
                    {obtenerIconoEstado(item.estado)}
                    <span className="ml-1">{item.estado.replace("_", " ")}</span>
                  </Badge>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Cantidad</p>
                  <p className="font-medium">
                    {item.cantidadActual} {item.unidad}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Min: {item.cantidadMinima} {item.unidad}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Costo</p>
                  <p className="font-medium">{formatearMoneda(item.costoUnitario)}</p>
                  <p className="text-xs text-muted-foreground">
                    Valor: {formatearMoneda(item.cantidadActual * item.costoUnitario)}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => abrirModalDetalle(item)}>
                    Ver detalles
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => abrirModalActualizar(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const itemsDisponibles = inventario.filter((item) => item.estado === "disponible")
  const itemsBajoStock = inventario.filter((item) => item.estado === "bajo_stock" || item.estado === "critico")
  const itemsAgotados = inventario.filter((item) => item.estado === "agotado")
  const itemsProximosVencer = inventario.filter((item) => estaProximoVencer(item.fechaVencimiento))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventario</h1>
          <p className="text-muted-foreground">Gestiona el inventario de ingredientes y productos de la cocina</p>
        </div>
        <Card>
          <CardContent className="p-2">
            <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
          </CardContent>
        </Card>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estadisticas.totalItems}</div>
            <p className="text-xs text-muted-foreground">{estadisticas.itemsDisponibles} disponibles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bajo Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {estadisticas.itemsBajoStock + estadisticas.itemsCriticos}
            </div>
            <p className="text-xs text-muted-foreground">{estadisticas.itemsCriticos} críticos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatearMoneda(estadisticas.valorTotalInventario)}</div>
            <p className="text-xs text-muted-foreground">Valor del inventario actual</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Por Vencer</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{estadisticas.itemsProximosVencer}</div>
            <p className="text-xs text-muted-foreground">Próximos 7 días</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="busqueda">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="busqueda"
                  placeholder="Nombre, proveedor, ubicación..."
                  className="pl-8 w-52"
                  value={filtros.busqueda || ""}
                  onChange={(e) => aplicarFiltros({ ...filtros, busqueda: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Categoría</Label>
              <Select
                value={filtros.categoria || "todas"}
                onValueChange={(value) =>
                  aplicarFiltros({
                    ...filtros,
                    categoria: value === "todas" ? undefined : (value as CategoriaInventario),
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todas las categorías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las categorías</SelectItem>
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria} value={categoria}>
                      {categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Estado</Label>
              <Select
                value={filtros.estado || "todos"}
                onValueChange={(value) =>
                  aplicarFiltros({ ...filtros, estado: value === "todos" ? undefined : (value as EstadoInventario) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos los estados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  {estados.map((estado) => (
                    <SelectItem key={estado} value={estado}>
                      {estado.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end space-x-2">
              <Button
                variant="outline"
                onClick={() => aplicarFiltros({ ...filtros, proximosVencer: !filtros.proximosVencer })}
                className={filtros.proximosVencer ? "bg-orange-50 border-orange-200" : ""}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Por vencer
              </Button>
              <Button variant="outline" onClick={limpiarFiltros}>
                Limpiar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contenido principal */}
      <Tabs defaultValue="todos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="todos">Todos ({inventario.length})</TabsTrigger>
          <TabsTrigger value="disponibles">Disponibles ({itemsDisponibles.length})</TabsTrigger>
          <TabsTrigger value="bajo-stock">Bajo Stock ({itemsBajoStock.length})</TabsTrigger>
          <TabsTrigger value="agotados">Agotados ({itemsAgotados.length})</TabsTrigger>
          <TabsTrigger value="por-vencer">Por Vencer ({itemsProximosVencer.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="todos" className="space-y-4">
          {viewMode === "grid" ? renderGridView(inventario) : renderListView(inventario)}
        </TabsContent>

        <TabsContent value="disponibles">
          {viewMode === "grid" ? renderGridView(itemsDisponibles) : renderListView(itemsDisponibles)}
        </TabsContent>

        <TabsContent value="bajo-stock">
          {viewMode === "grid" ? renderGridView(itemsBajoStock) : renderListView(itemsBajoStock)}
        </TabsContent>

        <TabsContent value="agotados">
          {viewMode === "grid" ? renderGridView(itemsAgotados) : renderListView(itemsAgotados)}
        </TabsContent>

        <TabsContent value="por-vencer">
          {viewMode === "grid" ? renderGridView(itemsProximosVencer) : renderListView(itemsProximosVencer)}
        </TabsContent>
      </Tabs>

      {/* Modal de detalles */}
      <Dialog open={modalDetalleAbierto} onOpenChange={setModalDetalleAbierto}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              {itemSeleccionado?.nombre}
            </DialogTitle>
            <DialogDescription>Información detallada del item de inventario</DialogDescription>
          </DialogHeader>

          {itemSeleccionado && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Categoría</Label>
                    <p className="text-sm">{itemSeleccionado.categoria}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Estado</Label>
                    <Badge className={obtenerColorEstado(itemSeleccionado.estado)}>
                      {obtenerIconoEstado(itemSeleccionado.estado)}
                      <span className="ml-1">{itemSeleccionado.estado.replace("_", " ")}</span>
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Cantidad Actual</Label>
                    <p className="text-lg font-semibold">
                      {itemSeleccionado.cantidadActual} {itemSeleccionado.unidad}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Rango de Stock</Label>
                    <p className="text-sm">
                      Mín: {itemSeleccionado.cantidadMinima} {itemSeleccionado.unidad} - Máx:{" "}
                      {itemSeleccionado.cantidadMaxima} {itemSeleccionado.unidad}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Costo Unitario</Label>
                    <p className="text-lg font-semibold">{formatearMoneda(itemSeleccionado.costoUnitario)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Valor Total</Label>
                    <p className="text-lg font-semibold">
                      {formatearMoneda(itemSeleccionado.cantidadActual * itemSeleccionado.costoUnitario)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Proveedor</Label>
                    <p className="text-sm">{itemSeleccionado.proveedor}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Ubicación</Label>
                    <p className="text-sm flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {itemSeleccionado.ubicacion}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Fecha de Vencimiento</Label>
                  <p
                    className={`text-sm ${estaProximoVencer(itemSeleccionado.fechaVencimiento) ? "text-orange-600 font-medium" : ""}`}
                  >
                    {formatearFecha(itemSeleccionado.fechaVencimiento)}
                    {estaProximoVencer(itemSeleccionado.fechaVencimiento) && (
                      <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                        Próximo a vencer
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Última Actualización</Label>
                  <p className="text-sm">{formatearFecha(itemSeleccionado.fechaUltimaActualizacion)}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de actualización */}
      <Dialog open={modalActualizarAbierto} onOpenChange={setModalActualizarAbierto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Actualizar Cantidad
            </DialogTitle>
            <DialogDescription>Actualiza la cantidad actual de {itemSeleccionado?.nombre}</DialogDescription>
          </DialogHeader>

          {itemSeleccionado && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Cantidad Actual</Label>
                  <p className="text-lg font-semibold">
                    {itemSeleccionado.cantidadActual} {itemSeleccionado.unidad}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Rango Permitido</Label>
                  <p className="text-sm">
                    {itemSeleccionado.cantidadMinima} - {itemSeleccionado.cantidadMaxima} {itemSeleccionado.unidad}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nueva-cantidad">Nueva Cantidad</Label>
                <Input
                  id="nueva-cantidad"
                  type="number"
                  step="0.1"
                  min="0"
                  max={itemSeleccionado.cantidadMaxima}
                  value={nuevaCantidad}
                  onChange={(e) => setNuevaCantidad(e.target.value)}
                  placeholder={`Cantidad en ${itemSeleccionado.unidad}`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="observaciones">Observaciones (opcional)</Label>
                <Textarea
                  id="observaciones"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  placeholder="Motivo del cambio, notas adicionales..."
                  rows={3}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalActualizarAbierto(false)}>
              Cancelar
            </Button>
            <Button onClick={actualizarCantidad} disabled={isPending || !nuevaCantidad}>
              {isPending ? "Actualizando..." : "Actualizar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
