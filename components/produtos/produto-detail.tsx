"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Edit,
  X,
  Star,
  Package,
  ShoppingCart,
  Utensils,
  Check,
  Minus,
  Calendar,
  User,
  Building,
  Settings,
} from "lucide-react"
import type { Produto } from "@/schemas/produtos.schemas"

interface ProductoDetailProps {
  produto: Produto
  onEdit: () => void
  onClose: () => void
}

export function ProductoDetail({ produto, onEdit, onClose }: ProductoDetailProps) {
  const getProductoIcon = (tipo: string) => {
    switch (tipo) {
      case "Platillo":
        return <Utensils className="h-5 w-5" />
      case "Botella":
        return <ShoppingCart className="h-5 w-5" />
      default:
        return <Package className="h-5 w-5" />
    }
  }

  const getProductoColor = (tipo: string) => {
    switch (tipo) {
      case "Platillo":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Botella":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  const canalesVenta = [
    { key: "Comedor", label: "🏠 Comedor", active: produto.Comedor },
    { key: "ADomicilio", label: "🚚 A Domicilio", active: produto.ADomicilio },
    { key: "Mostrador", label: "🏪 Mostrador", active: produto.Mostrador },
    { key: "Enlinea", label: "💻 En Línea", active: produto.Enlinea },
    { key: "EnAPP", label: "📱 En APP", active: produto.EnAPP },
    { key: "EnMenuQR", label: "📱 Menú QR", active: produto.EnMenuQR },
  ]

  const configuraciones = [
    { key: "Favorito", label: "⭐ Produto Favorito", active: produto.Favorito },
    { key: "ExentoImpuesto", label: "🏷️ Exento de Impuesto", active: produto.ExentoImpuesto },
    { key: "PrecioAbierto", label: "💰 Precio Abierto", active: produto.PrecioAbierto },
    { key: "ControlStock", label: "📦 Control de Stock", active: produto.ControlStock },
    { key: "PrecioxUtilidad", label: "📈 Precio por Utilidad", active: produto.PrecioxUtilidad },
    { key: "Facturable", label: "🧾 Facturable", active: produto.Facturable },
    { key: "Suspendido", label: "🚫 Suspendido", active: produto.Suspendido },
  ]

  return (
    <div className="space-y-6">
      {/* Header con imagen */}
      <div className="relative">
        {produto.Imagen ? (
          <div className="aspect-video w-full max-w-2xl mx-auto bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={produto.Imagen || "/placeholder.svg"}
              alt={produto.Nombredelproducto}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="aspect-video w-full max-w-2xl mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-400">
              {getProductoIcon(produto.TipoProducto)}
              <p className="mt-2 text-sm">Sin imagen</p>
            </div>
          </div>
        )}

        {/* Badges flotantes */}
        <div className="absolute top-4 left-4 flex gap-2">
          {produto.Favorito && (
            <Badge className="bg-yellow-500 text-white">
              <Star className="h-4 w-4 mr-1" />
              Favorito
            </Badge>
          )}
          {produto.Suspendido && <Badge variant="destructive">🚫 Suspendido</Badge>}
        </div>

        {/* Botones de acción */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button size="sm" onClick={onEdit} className="bg-orange-600 hover:bg-orange-700">
            <Edit className="h-4 w-4 mr-1" />
            Editar
          </Button>
          <Button size="sm" variant="outline" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Información básica */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              {getProductoIcon(produto.TipoProducto)}
              <div>
                <h2 className="text-2xl font-bold">{produto.Nombredelproducto}</h2>
                <p className="text-sm text-gray-500 font-mono">{produto.ClaveProducto}</p>
              </div>
            </CardTitle>
            <Badge className={`text-sm ${getProductoColor(produto.TipoProducto)}`}>{produto.TipoProducto}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {produto.Descripcion && (
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Descripción</h4>
              <p className="text-gray-700">{produto.Descripcion}</p>
            </div>
          )}

          {produto.ClaveTributaria && (
            <div className="mt-4 space-y-2">
              <h4 className="font-semibold text-gray-900">Clave Tributaria (SAT)</h4>
              <p className="text-gray-700 font-mono">{produto.ClaveTributaria}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Configuraciones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-purple-600" />
            Configuración del Produto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {configuraciones.map((config) => (
              <div key={config.key} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-medium">{config.label}</span>
                {config.active ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <Minus className="h-5 w-5 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Canales de venta */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-green-600" />
            Canales de Venta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {canalesVenta.map((canal) => (
              <div key={canal.key} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-medium">{canal.label}</span>
                {canal.active ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <Minus className="h-5 w-5 text-gray-400" />
                )}
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900">Canales Activos</h4>
            <div className="flex flex-wrap gap-2">
              {canalesVenta
                .filter((canal) => canal.active)
                .map((canal) => (
                  <Badge key={canal.key} variant="secondary">
                    {canal.label}
                  </Badge>
                ))}
              {canalesVenta.filter((canal) => canal.active).length === 0 && (
                <p className="text-sm text-gray-500 italic">No hay canales activos</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metadatos del sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-600" />
            Información del Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Última modificación:</span>
              </div>
              <p className="text-gray-600 ml-6">
                {produto.Fecha_UltimoCambio
                  ? new Date(produto.Fecha_UltimoCambio).toLocaleString("es-ES")
                  : "No disponible"}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-gray-500" />
                <span className="font-medium">ID del Produto:</span>
              </div>
              <p className="text-gray-600 ml-6 font-mono text-xs">{produto.ProductoULID}</p>
            </div>

            {produto.UsuarioULID && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Usuario:</span>
                </div>
                <p className="text-gray-600 ml-6 font-mono text-xs">{produto.UsuarioULID}</p>
              </div>
            )}

            {produto.EmpresaULID && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Empresa:</span>
                </div>
                <p className="text-gray-600 ml-6 font-mono text-xs">{produto.EmpresaULID}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
