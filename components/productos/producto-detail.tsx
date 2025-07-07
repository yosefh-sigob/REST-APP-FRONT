"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import type { Producto } from "@/lib/services/productos.service"
import { Edit, X, Star, Package, AlertCircle, Calendar } from "lucide-react"

interface ProductoDetailProps {
  producto: Producto
  datosRelacionados: {
    grupos: any[]
    subgrupos: any[]
    unidades: any[]
    areasProduccion: any[]
  }
  onEdit: () => void
  onClose: () => void
}

export function ProductoDetail({ producto, datosRelacionados, onEdit, onClose }: ProductoDetailProps) {
  // Obtener datos relacionados
  const grupo = datosRelacionados.grupos.find((g) => g.GrupoProductoULID === producto.GrupoProductoULID)
  const subgrupo = datosRelacionados.subgrupos.find((s) => s.SubgrupoProductoULID === producto.SubgrupoProductoULID)
  const unidad = datosRelacionados.unidades.find((u) => u.UnidadULID === producto.UnidadesULID)
  const areaProduccion = datosRelacionados.areasProduccion.find(
    (a) => a.AreaProduccionULID === producto.AreaProduccionULID,
  )

  const canalesActivos = [
    { key: "Comedor", label: "🍽️ Comedor", activo: producto.Comedor },
    { key: "ADomicilio", label: "🏠 A Domicilio", activo: producto.ADomicilio },
    { key: "Mostrador", label: "🏪 Mostrador", activo: producto.Mostrador },
    { key: "Enlinea", label: "🌐 En Línea", activo: producto.Enlinea },
    { key: "EnAPP", label: "📱 En APP", activo: producto.EnAPP },
    { key: "EnMenuQR", label: "📱 Menú QR", activo: producto.EnMenuQR },
  ].filter((canal) => canal.activo)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-sm">
                {producto.ClaveProducto}
              </Badge>
              {producto.Favorito && <Star className="h-5 w-5 text-yellow-500 fill-current" />}
              <Badge variant={producto.Suspendido ? "destructive" : "default"}>
                {producto.Suspendido ? "Suspendido" : "Activo"}
              </Badge>
            </div>
            <h2 className="text-2xl font-bold">{producto.Nombredelproducto}</h2>
            <p className="text-muted-foreground mt-1">{producto.Descripcion}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información Básica */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Información Básica
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Tipo de Producto</Label>
                <p className="font-medium">{producto.TipoProducto}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Estado</Label>
                <div className="flex items-center gap-2">
                  {producto.Suspendido ? (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  ) : (
                    <div className="h-4 w-4 bg-green-500 rounded-full" />
                  )}
                  <span className="font-medium">{producto.Suspendido ? "Suspendido" : "Activo"}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Grupo</Label>
                <p className="font-medium">{grupo?.Descripcion || "Sin grupo"}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Subgrupo</Label>
                <p className="font-medium">{subgrupo?.Descripcion || "Sin subgrupo"}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Unidad de Medida</Label>
                <p className="font-medium">{unidad ? `${unidad.Descripcion} (${unidad.Abreviacion})` : "Sin unidad"}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Área de Producción</Label>
                <p className="font-medium">{areaProduccion?.Descripcion || "Sin área"}</p>
              </div>
            </div>

            {producto.ClaveTributaria && (
              <>
                <Separator />
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Clave Tributaria (SAT)</Label>
                  <p className="font-medium">{producto.ClaveTributaria}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Configuración */}
        <Card>
          <CardHeader>
            <CardTitle>Configuración</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Exento de Impuesto</Label>
                <Badge variant={producto.ExentoImpuesto ? "default" : "secondary"}>
                  {producto.ExentoImpuesto ? "Sí" : "No"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">Precio Abierto</Label>
                <Badge variant={producto.PrecioAbierto ? "default" : "secondary"}>
                  {producto.PrecioAbierto ? "Sí" : "No"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">Control de Stock</Label>
                <Badge variant={producto.ControlStock ? "default" : "secondary"}>
                  {producto.ControlStock ? "Sí" : "No"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">Precio por Utilidad</Label>
                <Badge variant={producto.PrecioxUtilidadad ? "default" : "secondary"}>
                  {producto.PrecioxUtilidadad ? "Sí" : "No"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">Facturable</Label>
                <Badge variant={producto.Facturable ? "default" : "secondary"}>
                  {producto.Facturable ? "Sí" : "No"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">Producto Favorito</Label>
                <Badge variant={producto.Favorito ? "default" : "secondary"}>{producto.Favorito ? "Sí" : "No"}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Canales de Venta */}
        <Card>
          <CardHeader>
            <CardTitle>Canales de Venta</CardTitle>
            <CardDescription>
              Canales donde está disponible este producto ({canalesActivos.length} activos)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {canalesActivos.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {canalesActivos.map((canal) => (
                  <Badge key={canal.key} variant="default" className="justify-start">
                    {canal.label}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No hay canales de venta activos</p>
            )}
          </CardContent>
        </Card>

        {/* Información del Sistema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Información del Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Fecha de Creación</Label>
              <p className="font-medium">{new Date(producto.Fecha_UltimoCambio).toLocaleString()}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Última Sincronización</Label>
              <p className="font-medium">{new Date(producto.Fecha_Sync).toLocaleString()}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">ID del Producto</Label>
              <p className="font-mono text-sm bg-muted p-2 rounded">{producto.ProductoULID}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Datos Dinámicos */}
      {producto.DatosDinamicos && Object.keys(producto.DatosDinamicos).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Datos Adicionales</CardTitle>
            <CardDescription>Información específica del producto</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(producto.DatosDinamicos).map(([key, value]) => (
                <div key={key}>
                  <Label className="text-sm font-medium text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </Label>
                  <p className="font-medium">
                    {typeof value === "number" && key.toLowerCase().includes("precio")
                      ? `$${value.toFixed(2)}`
                      : String(value)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
