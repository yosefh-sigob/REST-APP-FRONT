"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ProductoForm } from "./producto-form"
import { ProductoDetail } from "./producto-detail"
import { ViewToggle } from "@/components/ui/view-toggle"
import {
  alternarFavoritoAction,
  alternarSuspendidoAction,
  eliminarProductoAction,
  obtenerProductosActionAPI,
} from "@/actions/productos.actions"
// import { Producto } from "@/schemas/produtos.schemas"
import { ProductosService } from "@/lib/services/productos.service"
import type { IGetProducto } from "@/interfaces/productos.interface"
import { toast } from "sonner"
import { Plus, Search, Star, MoreVertical, Edit, Trash2, Eye, Package, AlertCircle, RefreshCw } from "lucide-react"

interface ProductosViewProps {
  productosIniciales: IGetProducto[]
  datosRelacionados: {
    grupos: any[]
    subgrupos: any[]
    unidades: any[]
    areasProduccion: any[]
  }
}

export function ProductosView({ productosIniciales, datosRelacionados }: ProductosViewProps) {
  // Estados principales
  const [productos, setProductos] = useState<IGetProducto[]>(productosIniciales)
  const [loading, setLoading] = useState(false)
  const [vistaActual, setVistaActual] = useState<"grid" | "list">("grid")

  // Estados de modales
  const [modalFormulario, setModalFormulario] = useState(false)
  const [modalDetalle, setModalDetalle] = useState(false)
  const [productoSeleccionado, setProductoSeleccionado] = useState<IGetProducto | null>(null)

  // Estados de filtros
  const [busqueda, setBusqueda] = useState("")
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [filtroGrupo, setFiltroGrupo] = useState("todos")
  const [filtroSubgrupo, setFiltroSubgrupo] = useState("todos")
  const [soloFavoritos, setSoloFavoritos] = useState(false)
  const [soloActivos, setSoloActivos] = useState(false)
  const [soloSuspendidos, setSoloSuspendidos] = useState(false)

  // Recargar productos
  const recargarProductos = async () => {
    setLoading(true)
    try {
      const result = await obtenerProductosActionAPI()
      if (result.success && result.data) {
        console.log("HOLA?", result.data)
        setProductos(result.data)
      } else {
        toast.error("Error al recargar productos")
      }
    } catch {
      toast.error("Error al recargar productos")
    } finally {
      setLoading(false)
    }
  }

  // Filtrar productos
  const productosFiltrados = useMemo(() => {
    return ProductosService.filtrarProductos(productos, {
      busqueda,
      tipo: filtroTipo === "todos" ? undefined : filtroTipo,
      favoritos: soloFavoritos ? true : undefined,
      suspendidos: soloSuspendidos ? true : undefined,
      grupo: filtroGrupo === "todos" ? undefined : filtroGrupo,
      subgrupo: filtroSubgrupo === "todos" ? undefined : filtroSubgrupo,
    })
  }, [productos, busqueda, filtroTipo, filtroGrupo, filtroSubgrupo, soloFavoritos, soloSuspendidos])

  // Estadísticas
  const estadisticas = useMemo(() => {
    const total = productos.length
    const activos = productos.filter((p) => !p.Suspendido).length
    const favoritos = productos.filter((p) => p.Favorito).length
    const suspendidos = productos.filter((p) => p.Suspendido).length

    const porTipo = productos.reduce(
      (acc, producto) => {
        acc[producto.TipoProducto] = (acc[producto.TipoProducto] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return { total, activos, favoritos, suspendidos, porTipo }
  }, [productos])

  // Obtener subgrupos filtrados por grupo
  const subgruposFiltrados = useMemo(() => {
    if (filtroGrupo === "todos") return datosRelacionados.subgrupos
    return datosRelacionados.subgrupos.filter((sub) => sub.ClaveGrupo === filtroGrupo)
  }, [filtroGrupo, datosRelacionados.subgrupos])

  // Handlers
  const handleCrearProducto = () => {
    setProductoSeleccionado(null)
    setModalFormulario(true)
  }

  const handleEditarProducto = (producto: IGetProducto) => {
    setProductoSeleccionado(producto)
    setModalFormulario(true)
  }

  const handleVerDetalle = (producto: IGetProducto) => {
    setProductoSeleccionado(producto)
    setModalDetalle(true)
  }

  const handleToggleFavorito = async (producto: IGetProducto) => {
    try {
      const result = await alternarFavoritoAction(producto.ProductoULID)
      if (result.success && result.data) {
        setProductos((prev) => prev.map((p) => (p.ProductoULID === producto.ProductoULID ? result.data! : p)))
        toast.success(result.message)
      } else {
        toast.error(result.error || "Error al actualizar favorito")
      }
    } catch {
      toast.error("Error al actualizar favorito")
    }
  }

  const handleToggleSuspendido = async (producto: IGetProducto) => {
    try {
      const result = await alternarSuspendidoAction(producto.ProductoULID)
      if (result.success && result.data) {
        setProductos((prev) => prev.map((p) => (p.ProductoULID === producto.ProductoULID ? result.data! : p)))
        toast.success(result.message)
      } else {
        toast.error(result.error || "Error al actualizar estado")
      }
    } catch {
      toast.error("Error al actualizar estado")
    }
  }

  const handleEliminarProducto = async (producto: IGetProducto) => {
    if (!confirm(`¿Está seguro de eliminar el producto "${producto.Nombredelproducto}"?`)) {
      return
    }

    try {
      const result = await eliminarProductoAction(producto.ProductoULID)
      if (result.success) {
        setProductos((prev) => prev.filter((p) => p.ProductoULID !== producto.ProductoULID))
        toast.success(result.message)
      } else {
        toast.error(result.error || "Error al eliminar producto")
      }
    } catch {
      toast.error("Error al eliminar producto")
    }
  }

  const handleFormularioExito = () => {
    setModalFormulario(false)
    setProductoSeleccionado(null)
    recargarProductos()
  }

  const limpiarFiltros = () => {
    setBusqueda("")
    setFiltroTipo("todos")
    setFiltroGrupo("todos")
    setFiltroSubgrupo("todos")
    setSoloFavoritos(false)
    setSoloActivos(false)
    setSoloSuspendidos(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Productos</h1>
          <p className="text-gray-600 mt-1">Administra el catálogo de productos del restaurante</p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={recargarProductos} variant="outline" disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
          <Button
            onClick={handleCrearProducto}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Producto
          </Button>
        </div>
      </div>

      {/* Filtros y Búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros y Búsqueda</CardTitle>
          <CardDescription>Encuentra productos específicos usando los filtros disponibles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Búsqueda y selector de vista */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, clave o descripción..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10"
              />
            </div>
            {/* Selector de vista */}
            <ViewToggle viewMode={vistaActual} onViewModeChange={setVistaActual} />
            <Button variant="outline" onClick={limpiarFiltros}>
              Limpiar Filtros
            </Button>
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="filtro-tipo">Tipo de Producto</Label>
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los tipos</SelectItem>
                  <SelectItem value="Platillo">Platillos</SelectItem>
                  <SelectItem value="Producto">Productos</SelectItem>
                  <SelectItem value="Botella">Botellas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="filtro-grupo">Grupo</Label>
              <Select value={filtroGrupo} onValueChange={setFiltroGrupo}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los grupos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los grupos</SelectItem>
                  {datosRelacionados.grupos.map((grupo) => (
                    <SelectItem key={grupo.GrupoProductoULID} value={grupo.GrupoProductoULID}>
                      {grupo.Descripcion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="filtro-subgrupo">Subgrupo</Label>
              <Select value={filtroSubgrupo} onValueChange={setFiltroSubgrupo} disabled={filtroGrupo === "todos"}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los subgrupos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los subgrupos</SelectItem>
                  {subgruposFiltrados.map((subgrupo) => (
                    <SelectItem key={subgrupo.SubgrupoProductoULID} value={subgrupo.SubgrupoProductoULID}>
                      {subgrupo.Descripcion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Switches de filtros rápidos */}
          <div className="flex items-center gap-6">
            <div className="flex items-center space-x-2">
              <Switch id="solo-favoritos" checked={soloFavoritos} onCheckedChange={setSoloFavoritos} />
              <Label htmlFor="solo-favoritos">Solo Favoritos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="solo-activos" checked={soloActivos} onCheckedChange={setSoloActivos} />
              <Label htmlFor="solo-activos">Solo Activos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="solo-suspendidos" checked={soloSuspendidos} onCheckedChange={setSoloSuspendidos} />
              <Label htmlFor="solo-suspendidos">Solo Suspendidos</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Productos */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Productos ({productosFiltrados.length})</CardTitle>
              <CardDescription>
                {estadisticas.total} productos totales • {estadisticas.activos} activos • {estadisticas.favoritos}{" "}
                favoritos
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={recargarProductos} disabled={loading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Recargar
              </Button>
              <Button variant="outline" size="sm" onClick={limpiarFiltros}>
                Limpiar Filtros
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <RefreshCw className="h-6 w-6 animate-spin mr-2" />
              <span>Cargando productos...</span>
            </div>
          ) : productosFiltrados.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No se encontraron productos</h3>
              <p className="text-muted-foreground mb-4">
                {productos.length === 0
                  ? "No hay productos registrados. Crea tu primer producto."
                  : "Intenta ajustar los filtros de búsqueda."}
              </p>
              {productos.length === 0 && (
                <Button onClick={handleCrearProducto}>
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Primer Producto
                </Button>
              )}
            </div>
          ) : vistaActual === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {productosFiltrados.map((producto) => (
                <Card key={producto.ProductoULID} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {producto.ClaveProducto}
                          </Badge>
                          {producto.Favorito && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                        </div>
                        <CardTitle className="text-sm line-clamp-2">{producto.Nombredelproducto}</CardTitle>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleVerDetalle(producto)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditarProducto(producto)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleFavorito(producto)}>
                            <Star className="h-4 w-4 mr-2" />
                            {producto.Favorito ? "Quitar de Favoritos" : "Marcar como Favorito"}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleSuspendido(producto)}>
                            <AlertCircle className="h-4 w-4 mr-2" />
                            {producto.Suspendido ? "Activar" : "Suspender"}
                          </DropdownMenuItem>
                          <Separator />
                          <DropdownMenuItem onClick={() => handleEliminarProducto(producto)} className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <Badge variant={producto.Suspendido ? "destructive" : "secondary"}>{producto.TipoProducto}</Badge>
                      {producto.Descripcion && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{producto.Descripcion}</p>
                      )}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{producto.Suspendido ? "Suspendido" : "Activo"}</span>
                        <span>{new Date(producto.Fecha_UltimoCambio).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Vista Lista */
            <div className="space-y-4">
              {productosFiltrados.map((producto) => (
                <Card key={producto.ProductoULID} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {producto.ClaveProducto}
                            </Badge>
                            {producto.Favorito && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                            <Badge variant={producto.Suspendido ? "destructive" : "secondary"}>
                              {producto.TipoProducto}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-lg">{producto.Nombredelproducto}</h3>
                          {producto.Descripcion && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{producto.Descripcion}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">
                            {producto.Suspendido ? "Suspendido" : "Activo"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(producto.Fecha_UltimoCambio).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleVerDetalle(producto)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditarProducto(producto)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleFavorito(producto)}>
                            <Star className="h-4 w-4 mr-2" />
                            {producto.Favorito ? "Quitar de Favoritos" : "Marcar como Favorito"}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleSuspendido(producto)}>
                            <AlertCircle className="h-4 w-4 mr-2" />
                            {producto.Suspendido ? "Activar" : "Suspender"}
                          </DropdownMenuItem>
                          <Separator />
                          <DropdownMenuItem onClick={() => handleEliminarProducto(producto)} className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modales */}
      <Dialog open={modalFormulario} onOpenChange={setModalFormulario}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{productoSeleccionado ? "Editar Producto" : "Crear Nuevo Producto"}</DialogTitle>
          </DialogHeader>
          <ProductoForm
            producto={productoSeleccionado}
            datosRelacionados={datosRelacionados}
            onSuccess={handleFormularioExito}
            onCancel={() => setModalFormulario(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={modalDetalle} onOpenChange={setModalDetalle}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalle del Producto</DialogTitle>
          </DialogHeader>
          {productoSeleccionado && (
            <ProductoDetail
              producto={productoSeleccionado}
              datosRelacionados={datosRelacionados}
              onEdit={() => {
                setModalDetalle(false)
                setModalFormulario(true)
              }}
              onClose={() => setModalDetalle(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
