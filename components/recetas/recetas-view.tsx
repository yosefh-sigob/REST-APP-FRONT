"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ChefHat,
  Clock,
  Users,
  DollarSign,
  Search,
  Filter,
  Eye,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  BookOpen,
  Timer,
  Star,
} from "lucide-react"
import type { Receta, EstadisticasRecetas } from "@/interfaces/recetas.interface"
import { actualizarEstadoReceta } from "@/actions/recetas.actions"

interface RecetasViewProps {
  recetas: Receta[]
  estadisticas: EstadisticasRecetas
  categorias: string[]
}

export default function RecetasView({ recetas: recetasIniciales, estadisticas, categorias }: RecetasViewProps) {
  const [recetas, setRecetas] = useState(recetasIniciales)
  const [busqueda, setBusqueda] = useState("")
  const [categoriaFiltro, setCategoriaFiltro] = useState("all")
  const [dificultadFiltro, setDificultadFiltro] = useState("all")
  const [estadoFiltro, setEstadoFiltro] = useState("all")
  const [recetaSeleccionada, setRecetaSeleccionada] = useState<Receta | null>(null)
  const [cargandoEstado, setCargandoEstado] = useState<string | null>(null)

  // Filtrar recetas
  const recetasFiltradas = recetas.filter((receta) => {
    const coincideBusqueda =
      receta.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      receta.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    const coincideCategoria = categoriaFiltro === "all" || receta.categoria === categoriaFiltro
    const coincideDificultad = dificultadFiltro === "all" || receta.dificultad === dificultadFiltro
    const coincideEstado = estadoFiltro === "all" || receta.estado === estadoFiltro

    return coincideBusqueda && coincideCategoria && coincideDificultad && coincideEstado
  })

  const recetasActivas = recetasFiltradas.filter((r) => r.estado === "Activa")
  const recetasInactivas = recetasFiltradas.filter((r) => r.estado === "Inactiva")

  const limpiarFiltros = () => {
    setBusqueda("")
    setCategoriaFiltro("all")
    setDificultadFiltro("all")
    setEstadoFiltro("all")
  }

  const cambiarEstadoReceta = async (recetaId: string, nuevoEstado: "Activa" | "Inactiva") => {
    setCargandoEstado(recetaId)
    try {
      const exito = await actualizarEstadoReceta(recetaId, nuevoEstado)
      if (exito) {
        setRecetas(recetas.map((receta) => (receta.id === recetaId ? { ...receta, estado: nuevoEstado } : receta)))
      }
    } catch (error) {
      console.error("Error al cambiar estado:", error)
    } finally {
      setCargandoEstado(null)
    }
  }

  const getDificultadColor = (dificultad: string) => {
    switch (dificultad) {
      case "Fácil":
        return "bg-green-100 text-green-800"
      case "Intermedio":
        return "bg-yellow-100 text-yellow-800"
      case "Difícil":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatearTiempo = (minutos: number) => {
    if (minutos < 60) return `${minutos} min`
    const horas = Math.floor(minutos / 60)
    const mins = minutos % 60
    return `${horas}h ${mins > 0 ? `${mins}m` : ""}`
  }

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(precio)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Recetas</h1>
          <p className="text-gray-600">Administra las recetas de tu cocina</p>
        </div>
        <Button className="w-fit">
          <ChefHat className="h-4 w-4 mr-2" />
          Nueva Receta
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Recetas</p>
                <p className="text-2xl font-bold">{estadisticas.total}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Recetas Activas</p>
                <p className="text-2xl font-bold text-green-600">{estadisticas.activas}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Costo Promedio</p>
                <p className="text-2xl font-bold">{formatearPrecio(estadisticas.costoPromedio)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tiempo Promedio</p>
                <p className="text-2xl font-bold">{Math.round(estadisticas.tiempoPromedioPreparacion)} min</p>
              </div>
              <Timer className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar recetas..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoriaFiltro} onValueChange={setCategoriaFiltro}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categorias.map((categoria) => (
                  <SelectItem key={categoria} value={categoria}>
                    {categoria}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={dificultadFiltro} onValueChange={setDificultadFiltro}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Dificultad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="Fácil">Fácil</SelectItem>
                <SelectItem value="Intermedio">Intermedio</SelectItem>
                <SelectItem value="Difícil">Difícil</SelectItem>
              </SelectContent>
            </Select>

            <Select value={estadoFiltro} onValueChange={setEstadoFiltro}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="Activa">Activa</SelectItem>
                <SelectItem value="Inactiva">Inactiva</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={limpiarFiltros} className="w-full lg:w-auto bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Limpiar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de recetas por pestañas */}
      <Tabs defaultValue="todas" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="todas">Todas ({recetasFiltradas.length})</TabsTrigger>
          <TabsTrigger value="activas">Activas ({recetasActivas.length})</TabsTrigger>
          <TabsTrigger value="inactivas">Inactivas ({recetasInactivas.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="todas" className="space-y-4">
          <RecetasGrid
            recetas={recetasFiltradas}
            onVerDetalle={setRecetaSeleccionada}
            onCambiarEstado={cambiarEstadoReceta}
            cargandoEstado={cargandoEstado}
            getDificultadColor={getDificultadColor}
            formatearTiempo={formatearTiempo}
            formatearPrecio={formatearPrecio}
          />
        </TabsContent>

        <TabsContent value="activas" className="space-y-4">
          <RecetasGrid
            recetas={recetasActivas}
            onVerDetalle={setRecetaSeleccionada}
            onCambiarEstado={cambiarEstadoReceta}
            cargandoEstado={cargandoEstado}
            getDificultadColor={getDificultadColor}
            formatearTiempo={formatearTiempo}
            formatearPrecio={formatearPrecio}
          />
        </TabsContent>

        <TabsContent value="inactivas" className="space-y-4">
          <RecetasGrid
            recetas={recetasInactivas}
            onVerDetalle={setRecetaSeleccionada}
            onCambiarEstado={cambiarEstadoReceta}
            cargandoEstado={cargandoEstado}
            getDificultadColor={getDificultadColor}
            formatearTiempo={formatearTiempo}
            formatearPrecio={formatearPrecio}
          />
        </TabsContent>
      </Tabs>

      {/* Modal de detalles de receta */}
      <Dialog open={!!recetaSeleccionada} onOpenChange={() => setRecetaSeleccionada(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ChefHat className="h-5 w-5" />
              {recetaSeleccionada?.nombre}
            </DialogTitle>
          </DialogHeader>

          {recetaSeleccionada && <RecetaDetalle receta={recetaSeleccionada} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Componente para la grilla de recetas
interface RecetasGridProps {
  recetas: Receta[]
  onVerDetalle: (receta: Receta) => void
  onCambiarEstado: (id: string, estado: "Activa" | "Inactiva") => void
  cargandoEstado: string | null
  getDificultadColor: (dificultad: string) => string
  formatearTiempo: (minutos: number) => string
  formatearPrecio: (precio: number) => string
}

function RecetasGrid({
  recetas,
  onVerDetalle,
  onCambiarEstado,
  cargandoEstado,
  getDificultadColor,
  formatearTiempo,
  formatearPrecio,
}: RecetasGridProps) {
  if (recetas.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <ChefHat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay recetas</h3>
          <p className="text-gray-600">No se encontraron recetas con los filtros aplicados.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recetas.map((receta) => (
        <Card key={receta.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-video relative overflow-hidden bg-gray-100">
            <img src={receta.imagen || "/placeholder.svg"} alt={receta.nombre} className="w-full h-full object-cover" />
            <div className="absolute top-2 right-2">
              <Badge
                variant={receta.estado === "Activa" ? "default" : "secondary"}
                className={receta.estado === "Activa" ? "bg-green-600" : "bg-gray-500"}
              >
                {receta.estado}
              </Badge>
            </div>
          </div>

          <CardContent className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-lg mb-1">{receta.nombre}</h3>
              <p className="text-sm text-gray-600 mb-2">{receta.descripcion}</p>
              <Badge className={getDificultadColor(receta.dificultad)} variant="secondary">
                {receta.dificultad}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>{formatearTiempo(receta.tiempoPreparacion)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-gray-500" />
                <span>{receta.porciones} porciones</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span>Costo: {formatearPrecio(receta.costo)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-gray-500" />
                <span>Precio: {formatearPrecio(receta.precio)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <Button variant="outline" size="sm" onClick={() => onVerDetalle(receta)}>
                <Eye className="h-4 w-4 mr-1" />
                Ver Detalle
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCambiarEstado(receta.id, receta.estado === "Activa" ? "Inactiva" : "Activa")}
                disabled={cargandoEstado === receta.id}
              >
                {receta.estado === "Activa" ? (
                  <ToggleRight className="h-4 w-4 text-green-600" />
                ) : (
                  <ToggleLeft className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Componente para el detalle de la receta
function RecetaDetalle({ receta }: { receta: Receta }) {
  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(precio)
  }

  const formatearTiempo = (minutos: number) => {
    if (minutos < 60) return `${minutos} min`
    const horas = Math.floor(minutos / 60)
    const mins = minutos % 60
    return `${horas}h ${mins > 0 ? `${mins}m` : ""}`
  }

  return (
    <div className="space-y-6">
      {/* Información básica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <img
            src={receta.imagen || "/placeholder.svg"}
            alt={receta.nombre}
            className="w-full h-48 object-cover rounded-lg"
          />

          <div className="space-y-2">
            <h4 className="font-semibold">Información General</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                Categoría: <span className="font-medium">{receta.categoria}</span>
              </div>
              <div>
                Dificultad: <span className="font-medium">{receta.dificultad}</span>
              </div>
              <div>
                Tiempo: <span className="font-medium">{formatearTiempo(receta.tiempoPreparacion)}</span>
              </div>
              <div>
                Porciones: <span className="font-medium">{receta.porciones}</span>
              </div>
              <div>
                Costo: <span className="font-medium">{formatearPrecio(receta.costo)}</span>
              </div>
              <div>
                Precio: <span className="font-medium">{formatearPrecio(receta.precio)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Ingredientes</h4>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {receta.ingredientes.map((ingrediente, index) => (
                <div key={index} className="flex justify-between text-sm bg-gray-50 p-2 rounded">
                  <span>{ingrediente.nombre}</span>
                  <span className="font-medium">
                    {ingrediente.cantidad} {ingrediente.unidad}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Instrucciones */}
      <div>
        <h4 className="font-semibold mb-3">Instrucciones de Preparación</h4>
        <div className="space-y-3">
          {receta.instrucciones.map((instruccion, index) => (
            <div key={index} className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                {instruccion.paso}
              </div>
              <p className="text-sm leading-relaxed">{instruccion.descripcion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notas adicionales */}
      {receta.notas && (
        <div>
          <h4 className="font-semibold mb-2">Notas Adicionales</h4>
          <p className="text-sm text-gray-700 bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">{receta.notas}</p>
        </div>
      )}

      {/* Información de creación */}
      <div className="pt-4 border-t">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Creado por: {receta.creadoPor}</span>
          <span>Actualizado: {new Date(receta.fechaActualizacion).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}
