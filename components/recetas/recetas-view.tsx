"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  ChefHat,
  Clock,
  Users,
  DollarSign,
  Search,
  Filter,
  Eye,
  BookOpen,
  Timer,
  Utensils,
  Star,
  TrendingUp,
} from "lucide-react"
import type { Receta, RecetaEstadisticas } from "@/interfaces/recetas.interface"

interface RecetasViewProps {
  recetas: Receta[]
  estadisticas: RecetaEstadisticas
  categorias: string[]
}

export default function RecetasView({ recetas, estadisticas, categorias }: RecetasViewProps) {
  const [recetasFiltradas, setRecetasFiltradas] = useState(recetas)
  const [busqueda, setBusqueda] = useState("")
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>("all")
  const [dificultadSeleccionada, setDificultadSeleccionada] = useState<string>("all")
  const [recetaSeleccionada, setRecetaSeleccionada] = useState<Receta | null>(null)

  const filtrarRecetas = () => {
    let recetasFiltradas = recetas

    if (busqueda) {
      const busquedaLower = busqueda.toLowerCase()
      recetasFiltradas = recetasFiltradas.filter(
        (receta) =>
          receta.nombre.toLowerCase().includes(busquedaLower) ||
          receta.descripcion.toLowerCase().includes(busquedaLower) ||
          receta.ingredientes.some((ing) => ing.nombre.toLowerCase().includes(busquedaLower)),
      )
    }

    if (categoriaSeleccionada !== "all") {
      recetasFiltradas = recetasFiltradas.filter((receta) => receta.categoria === categoriaSeleccionada)
    }

    if (dificultadSeleccionada !== "all") {
      recetasFiltradas = recetasFiltradas.filter((receta) => receta.dificultad === dificultadSeleccionada)
    }

    setRecetasFiltradas(recetasFiltradas)
  }

  const limpiarFiltros = () => {
    setBusqueda("")
    setCategoriaSeleccionada("all")
    setDificultadSeleccionada("all")
    setRecetasFiltradas(recetas)
  }

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(precio)
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

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case "Platos Principales":
        return <Utensils className="h-4 w-4" />
      case "Ensaladas":
        return <Star className="h-4 w-4" />
      case "Postres":
        return <ChefHat className="h-4 w-4" />
      case "Sopas":
        return <BookOpen className="h-4 w-4" />
      default:
        return <Utensils className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Recetas</h1>
          <p className="text-muted-foreground">Gestiona las recetas de tu cocina</p>
        </div>
        <Button>
          <ChefHat className="mr-2 h-4 w-4" />
          Nueva Receta
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recetas</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estadisticas.totalRecetas}</div>
            <p className="text-xs text-muted-foreground">{estadisticas.recetasActivas} activas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Promedio</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estadisticas.tiempoPromedio} min</div>
            <p className="text-xs text-muted-foreground">Preparación promedio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Costo Promedio</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatearPrecio(estadisticas.costoPromedio)}</div>
            <p className="text-xs text-muted-foreground">Por receta</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorías</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Object.keys(estadisticas.categorias).length}</div>
            <p className="text-xs text-muted-foreground">Diferentes tipos</p>
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
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre, descripción o ingredientes..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="min-w-[200px]">
              <label className="text-sm font-medium mb-2 block">Categoría</label>
              <Select value={categoriaSeleccionada} onValueChange={setCategoriaSeleccionada}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas las categorías" />
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
            </div>

            <div className="min-w-[150px]">
              <label className="text-sm font-medium mb-2 block">Dificultad</label>
              <Select value={dificultadSeleccionada} onValueChange={setDificultadSeleccionada}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="Fácil">Fácil</SelectItem>
                  <SelectItem value="Intermedio">Intermedio</SelectItem>
                  <SelectItem value="Difícil">Difícil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={filtrarRecetas}>Filtrar</Button>
              <Button variant="outline" onClick={limpiarFiltros}>
                Limpiar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Recetas */}
      <Tabs defaultValue="grid" className="space-y-4">
        <TabsList>
          <TabsTrigger value="grid">Vista de Tarjetas</TabsTrigger>
          <TabsTrigger value="list">Vista de Lista</TabsTrigger>
        </TabsList>

        <TabsContent value="grid">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recetasFiltradas.map((receta) => (
              <Card key={receta.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <img
                    src={receta.imagen || "/placeholder.svg"}
                    alt={receta.nombre}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className={getDificultadColor(receta.dificultad)}>{receta.dificultad}</Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-lg line-clamp-1">{receta.nombre}</h3>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        {getCategoriaIcon(receta.categoria)}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{receta.descripcion}</p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {receta.tiempoPreparacion} min
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {receta.porciones}
                        </div>
                      </div>
                      <div className="font-semibold text-green-600">{formatearPrecio(receta.precio)}</div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Badge variant="secondary">{receta.categoria}</Badge>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setRecetaSeleccionada(receta)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Receta
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {recetasFiltradas.map((receta) => (
                  <div key={receta.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={receta.imagen || "/placeholder.svg"}
                          alt={receta.nombre}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">{receta.nombre}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">{receta.descripcion}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {receta.categoria}
                            </Badge>
                            <Badge className={`text-xs ${getDificultadColor(receta.dificultad)}`}>
                              {receta.dificultad}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {receta.tiempoPreparacion} min
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {receta.porciones}
                        </div>
                        <div className="font-semibold text-green-600">{formatearPrecio(receta.precio)}</div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setRecetaSeleccionada(receta)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de Detalle de Receta */}
      {recetaSeleccionada && (
        <Dialog open={!!recetaSeleccionada} onOpenChange={() => setRecetaSeleccionada(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ChefHat className="h-5 w-5" />
                {recetaSeleccionada.nombre}
              </DialogTitle>
            </DialogHeader>

            <ScrollArea className="max-h-[70vh]">
              <div className="space-y-6">
                {/* Imagen y información básica */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={recetaSeleccionada.imagen || "/placeholder.svg"}
                      alt={recetaSeleccionada.nombre}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>

                  <div className="space-y-4">
                    <p className="text-muted-foreground">{recetaSeleccionada.descripcion}</p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{recetaSeleccionada.tiempoPreparacion} minutos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">{recetaSeleccionada.porciones} porciones</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span className="text-sm">Costo: {formatearPrecio(recetaSeleccionada.costo)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm">Precio: {formatearPrecio(recetaSeleccionada.precio)}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Badge variant="secondary">{recetaSeleccionada.categoria}</Badge>
                      <Badge className={getDificultadColor(recetaSeleccionada.dificultad)}>
                        {recetaSeleccionada.dificultad}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Ingredientes e Instrucciones */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Ingredientes</h3>
                    <div className="space-y-2">
                      {recetaSeleccionada.ingredientes.map((ingrediente) => (
                        <div key={ingrediente.id} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                          <span className="text-sm">{ingrediente.nombre}</span>
                          <span className="text-sm font-medium">
                            {ingrediente.cantidad} {ingrediente.unidad}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Instrucciones</h3>
                    <div className="space-y-3">
                      {recetaSeleccionada.instrucciones.map((instruccion) => (
                        <div key={instruccion.paso} className="flex gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                            {instruccion.paso}
                          </div>
                          <p className="text-sm">{instruccion.descripcion}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Notas */}
                {recetaSeleccionada.notas && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Notas</h3>
                      <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                        {recetaSeleccionada.notas}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}

      {/* Mensaje cuando no hay resultados */}
      {recetasFiltradas.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <ChefHat className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No se encontraron recetas</h3>
            <p className="text-muted-foreground mb-4">Intenta ajustar los filtros o crear una nueva receta.</p>
            <Button onClick={limpiarFiltros}>Limpiar Filtros</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
