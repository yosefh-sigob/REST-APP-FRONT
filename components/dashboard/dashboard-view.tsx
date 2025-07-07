"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Users,
  ShoppingCart,
  Calendar,
  Package,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle,
  Info,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

const STATS_CARDS = [
  {
    title: "Ventas Hoy",
    value: "$15,420",
    change: "+12.5%",
    changeType: "positive",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Órdenes",
    value: "89",
    change: "+8.2%",
    changeType: "positive",
    icon: ShoppingCart,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Clientes Atendidos",
    value: "156",
    change: "+15.3%",
    changeType: "positive",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Productos Vendidos",
    value: "342",
    change: "-2.1%",
    changeType: "negative",
    icon: Package,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
]

const RECENT_ACTIVITIES = [
  {
    id: 1,
    action: "Nueva orden #1234 - Mesa 5",
    time: "Hace 2 minutos",
    status: "pending",
    amount: "$45.50",
  },
  {
    id: 2,
    action: "Cliente registrado: Juan Pérez",
    time: "Hace 5 minutos",
    status: "success",
    amount: null,
  },
  {
    id: 3,
    action: "Producto agotado: Hamburguesa Clásica",
    time: "Hace 10 minutos",
    status: "warning",
    amount: null,
  },
  {
    id: 4,
    action: "Reservación confirmada para las 8:00 PM",
    time: "Hace 15 minutos",
    status: "info",
    amount: null,
  },
  {
    id: 5,
    action: "Pago procesado - Orden #1230",
    time: "Hace 20 minutos",
    status: "success",
    amount: "$78.25",
  },
]

const QUICK_ACTIONS = [
  {
    title: "Nueva Venta",
    description: "Procesar nueva orden",
    icon: ShoppingCart,
    href: "/ventas/pos",
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    title: "Ver Reservaciones",
    description: "Gestionar reservas",
    icon: Calendar,
    href: "/reservaciones",
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    title: "Gestionar Productos",
    description: "Actualizar menú",
    icon: Package,
    href: "/productos",
    color: "bg-purple-500 hover:bg-purple-600",
  },
  {
    title: "Ver Reportes",
    description: "Análisis de ventas",
    icon: BarChart3,
    href: "/reportes",
    color: "bg-orange-500 hover:bg-orange-600",
  },
]

function getActivityIcon(status: string) {
  switch (status) {
    case "success":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    case "pending":
      return <Clock className="h-4 w-4 text-blue-500" />
    case "info":
      return <Info className="h-4 w-4 text-gray-500" />
    default:
      return <Info className="h-4 w-4 text-gray-500" />
  }
}

function getActivityBgColor(status: string) {
  switch (status) {
    case "success":
      return "bg-green-50 border-green-200"
    case "warning":
      return "bg-yellow-50 border-yellow-200"
    case "pending":
      return "bg-blue-50 border-blue-200"
    case "info":
      return "bg-gray-50 border-gray-200"
    default:
      return "bg-gray-50 border-gray-200"
  }
}

export function DashboardView() {
  const { user } = useAuth()

  if (!user) return null

  const firstName = user.nombreCompleto?.split(" ")[0] || "Usuario"
  const currentTime = new Date().toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">¡Bienvenido, {firstName}!</h1>
          <p className="text-gray-600 mt-1">Aquí tienes un resumen de tu restaurante hoy • {currentTime}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            {user.rol}
          </Badge>
          <Badge variant="secondary" className="text-sm">
            {user.nivelLicencia}
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS_CARDS.map((stat, index) => {
          const Icon = stat.icon
          const isPositive = stat.changeType === "positive"

          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center mt-1">
                  {isPositive ? (
                    <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                  )}
                  <p className={`text-xs font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
                    {stat.change} desde ayer
                  </p>
                </div>
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
            <div className="space-y-3">
              {RECENT_ACTIVITIES.map((activity) => (
                <div
                  key={activity.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border ${getActivityBgColor(activity.status)}`}
                >
                  {getActivityIcon(activity.status)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  {activity.amount && <div className="text-sm font-semibold text-gray-900">{activity.amount}</div>}
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
            {QUICK_ACTIONS.map((action, index) => {
              const Icon = action.icon
              return (
                <Link key={index} href={action.href}>
                  <Button className={`w-full justify-start h-12 ${action.color} text-white`} variant="default">
                    <Icon className="h-4 w-4 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-xs opacity-90">{action.description}</div>
                    </div>
                  </Button>
                </Link>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Company Info */}
      <Card>
        <CardHeader>
          <CardTitle>Información de la Empresa</CardTitle>
          <CardDescription>Detalles de tu restaurante y configuración actual</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-600">Empresa</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">{user.nombreEmpresa}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Plan Actual</p>
              <Badge variant="secondary" className="mt-1 text-sm">
                {user.nivelLicencia}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Usuario Activo</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">{user.nombreCompleto}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Último Acceso</p>
              <p className="text-sm text-gray-700 mt-1">
                {user.ultimoLogin ? new Date(user.ultimoLogin).toLocaleDateString("es-ES") : "Primer acceso"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
