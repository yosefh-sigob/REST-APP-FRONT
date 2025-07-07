"use client"

import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, Users, ShoppingCart, TrendingUp, Calendar, Package, DollarSign, Clock } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const STATS_CARDS = [
  {
    title: "Ventas Hoy",
    value: "$12,450",
    change: "+12%",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Órdenes",
    value: "156",
    change: "+8%",
    icon: ShoppingCart,
    color: "text-blue-600",
  },
  {
    title: "Clientes",
    value: "89",
    change: "+15%",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Productos",
    value: "234",
    change: "+3%",
    icon: Package,
    color: "text-orange-600",
  },
]

const RECENT_ACTIVITIES = [
  {
    id: 1,
    action: "Nueva orden #1234",
    time: "Hace 2 minutos",
    status: "pending",
  },
  {
    id: 2,
    action: "Cliente registrado: Juan Pérez",
    time: "Hace 5 minutos",
    status: "success",
  },
  {
    id: 3,
    action: "Producto agotado: Hamburguesa Clásica",
    time: "Hace 10 minutos",
    status: "warning",
  },
  {
    id: 4,
    action: "Reservación confirmada para las 8:00 PM",
    time: "Hace 15 minutos",
    status: "info",
  },
]

export function HomeView() {
  const { user } = useAuth()

  return (
    <AuthenticatedLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              ¡Bienvenido, {user?.nombreCompleto?.split(" ")[0] || "Usuario"}!
            </h1>
            <p className="text-gray-600 mt-1">Aquí tienes un resumen de tu restaurante hoy</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-sm">
              {user?.rol}
            </Badge>
            <Badge variant="secondary" className="text-sm">
              {user?.nivelLicencia}
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS_CARDS.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change} desde ayer
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Actividad Reciente
              </CardTitle>
              <CardDescription>Últimas actividades en tu restaurante</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {RECENT_ACTIVITIES.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.status === "success"
                          ? "bg-green-500"
                          : activity.status === "warning"
                            ? "bg-yellow-500"
                            : activity.status === "info"
                              ? "bg-blue-500"
                              : "bg-gray-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>Accesos directos a funciones principales</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Nueva Venta
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Ver Reservaciones
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Package className="h-4 w-4 mr-2" />
                Gestionar Productos
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Ver Reportes
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Company Info */}
        <Card>
          <CardHeader>
            <CardTitle>Información de la Empresa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Empresa</p>
                <p className="text-lg font-semibold">{user?.nombreEmpresa}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Plan Actual</p>
                <Badge variant="secondary" className="mt-1">
                  {user?.nivelLicencia}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Usuario Activo</p>
                <p className="text-lg font-semibold">{user?.nombreCompleto}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  )
}
