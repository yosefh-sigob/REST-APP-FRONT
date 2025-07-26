"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  Star,
  TrendingUp,
  Clock,
  CreditCard,
  MapPin,
  User,
  ShoppingBag,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import type { ClienteDetalle, HistorialVisita } from "@/interfaces/clientes.interface"

interface ClienteDetalleViewProps {
  clienteDetalle: ClienteDetalle
}

export function ClienteDetalleView({ clienteDetalle }: ClienteDetalleViewProps) {
  const [selectedVisita, setSelectedVisita] = useState<HistorialVisita | null>(null)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getMetodoPagoIcon = (metodo: string) => {
    switch (metodo) {
      case "tarjeta":
        return <CreditCard className="h-4 w-4" />
      case "efectivo":
        return <DollarSign className="h-4 w-4" />
      case "transferencia":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/clientes">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Detalle del Cliente</h1>
            <p className="text-gray-600 mt-1">Historial completo y estadísticas</p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
          Editar Cliente
        </Button>
      </div>

      {/* Cliente Info Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder-user.jpg" alt={clienteDetalle.nombre} />
              <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-600 text-white text-xl">
                {clienteDetalle.nombre
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{clienteDetalle.nombre}</h2>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="text-lg font-medium">{clienteDetalle.calificacion}</span>
                    <span className="text-gray-500">
                      • Cliente desde {new Date(clienteDetalle.fechaRegistro).getFullYear()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <Mail className="h-5 w-5 mr-3" />
                  <span>{clienteDetalle.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-5 w-5 mr-3" />
                  <span>{clienteDetalle.telefono}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-3" />
                  <span>Última visita: {new Date(clienteDetalle.ultimaVisita).toLocaleDateString("es-ES")}</span>
                </div>
              </div>

              {clienteDetalle.preferencias.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {clienteDetalle.preferencias.map((pref, index) => (
                    <Badge key={index} variant="secondary">
                      {pref}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Visitas</CardTitle>
            <User className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{clienteDetalle.totalVisitas}</div>
            <p className="text-xs text-gray-500 mt-1">Desde el registro</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Gasto Total</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(clienteDetalle.gastoTotal)}</div>
            <p className="text-xs text-gray-500 mt-1">Acumulado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Promedio por Visita</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {formatCurrency(clienteDetalle.estadisticas.promedioGastoPorVisita)}
            </div>
            <p className="text-xs text-gray-500 mt-1">Por visita</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Tiempo Promedio</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(clienteDetalle.estadisticas.tiempoPromedioVisita)} min
            </div>
            <p className="text-xs text-gray-500 mt-1">Por visita</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Content */}
      <Tabs defaultValue="historial" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="historial">Historial de Visitas</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
          <TabsTrigger value="preferencias">Preferencias</TabsTrigger>
        </TabsList>

        <TabsContent value="historial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Historial de Visitas ({clienteDetalle.historial.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clienteDetalle.historial.map((visita) => (
                  <Card key={visita.id} className="border-l-4 border-l-orange-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-3">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span className="font-medium">{formatDate(visita.fecha)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">Mesa {visita.mesa}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{visita.mesero}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Productos Ordenados:</h4>
                              <div className="space-y-1">
                                {visita.productos.map((producto) => (
                                  <div key={producto.id} className="flex justify-between text-sm">
                                    <span>
                                      {producto.cantidad}x {producto.nombre}
                                    </span>
                                    <span className="font-medium">
                                      {formatCurrency(producto.precio * producto.cantidad)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Total:</span>
                                <span className="font-bold text-lg text-green-600">{formatCurrency(visita.total)}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Método de pago:</span>
                                <div className="flex items-center space-x-1">
                                  {getMetodoPagoIcon(visita.metodoPago)}
                                  <span className="text-sm capitalize">{visita.metodoPago}</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Duración:</span>
                                <span className="text-sm">{visita.duracion} min</span>
                              </div>
                              {visita.calificacion && (
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-gray-600">Calificación:</span>
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                    <span className="text-sm font-medium">{visita.calificacion}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {visita.comentarios && (
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm text-gray-700 italic">"{visita.comentarios}"</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {clienteDetalle.historial.length === 0 && (
                  <div className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Sin historial de visitas</h3>
                    <p className="text-gray-600">Este cliente aún no tiene visitas registradas.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estadisticas" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Productos Más Pedidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {clienteDetalle.estadisticas.productosPreferidos.map((producto, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{producto.producto}</span>
                      <Badge variant="secondary">{producto.veces} veces</Badge>
                    </div>
                  ))}
                  {clienteDetalle.estadisticas.productosPreferidos.length === 0 && (
                    <p className="text-gray-500 text-sm">No hay datos suficientes</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resumen de Actividad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Visitas este mes:</span>
                    <span className="font-medium">{clienteDetalle.estadisticas.visitasPorMes[0]?.visitas || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Gasto este mes:</span>
                    <span className="font-medium">
                      {formatCurrency(clienteDetalle.estadisticas.gastoPorMes[0]?.gasto || 0)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Promedio por visita:</span>
                    <span className="font-medium">
                      {formatCurrency(clienteDetalle.estadisticas.promedioGastoPorVisita)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tiempo promedio:</span>
                    <span className="font-medium">
                      {Math.round(clienteDetalle.estadisticas.tiempoPromedioVisita)} minutos
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preferencias" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias Alimentarias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Preferencias Actuales:</h4>
                  <div className="flex flex-wrap gap-2">
                    {clienteDetalle.preferencias.map((pref, index) => (
                      <Badge key={index} variant="default">
                        {pref}
                      </Badge>
                    ))}
                    {clienteDetalle.preferencias.length === 0 && (
                      <p className="text-gray-500 text-sm">No hay preferencias registradas</p>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Productos Más Consumidos:</h4>
                  <div className="space-y-2">
                    {clienteDetalle.estadisticas.productosPreferidos.slice(0, 3).map((producto, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{producto.producto}</span>
                        <Badge variant="outline">{producto.veces} veces</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
