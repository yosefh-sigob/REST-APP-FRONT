"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Receipt, DollarSign, Users, Clock, ShoppingCart, Calculator, FileText } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const CAJERO_STATS = [
  {
    title: "Ventas del Turno",
    value: "$2,450",
    subtitle: "15 transacciones",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Clientes Atendidos",
    value: "28",
    subtitle: "Promedio: 1.9/min",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Ticket Promedio",
    value: "$163.33",
    subtitle: "+5% vs ayer",
    icon: Receipt,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Tiempo Promedio",
    value: "3.2 min",
    subtitle: "Por transacción",
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
]

const QUICK_ACTIONS = [
  {
    title: "Nueva Venta",
    description: "Iniciar nueva transacción",
    icon: ShoppingCart,
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    title: "Calculadora",
    description: "Herramienta de cálculo",
    icon: Calculator,
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    title: "Facturas",
    description: "Gestionar facturas",
    icon: FileText,
    color: "bg-purple-500 hover:bg-purple-600",
  },
  {
    title: "Reportes",
    description: "Ver reportes de ventas",
    icon: Receipt,
    color: "bg-orange-500 hover:bg-orange-600",
  },
]

export function CajeroView() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Panel de Cajero</h1>
          <p className="text-gray-600 mt-1">Gestiona las ventas y transacciones del restaurante</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          <CreditCard className="h-4 w-4 mr-2" />
          {user.rol}
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CAJERO_STATS.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main POS Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Punto de Venta</CardTitle>
            <CardDescription>Interfaz principal para procesar ventas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sistema POS</h3>
              <p className="text-gray-600 mb-4">Interfaz completa de punto de venta para procesar órdenes y pagos</p>
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Abrir POS
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Herramientas frecuentes para cajeros</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {QUICK_ACTIONS.map((action, index) => {
              const Icon = action.icon
              return (
                <Button
                  key={index}
                  className={`w-full justify-start h-12 ${action.color} text-white`}
                  variant="default"
                >
                  <Icon className="h-4 w-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-xs opacity-90">{action.description}</div>
                  </div>
                </Button>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Transacciones Recientes</CardTitle>
          <CardDescription>Últimas ventas procesadas en tu turno</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { id: "#1234", time: "14:30", amount: "$45.50", method: "Tarjeta", status: "Completado" },
              { id: "#1233", time: "14:25", amount: "$78.25", method: "Efectivo", status: "Completado" },
              { id: "#1232", time: "14:20", amount: "$32.00", method: "Tarjeta", status: "Completado" },
              { id: "#1231", time: "14:15", amount: "$156.75", method: "Transferencia", status: "Completado" },
            ].map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Receipt className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Orden {transaction.id}</p>
                    <p className="text-sm text-gray-500">
                      {transaction.time} • {transaction.method}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{transaction.amount}</p>
                  <Badge variant="secondary" className="text-xs">
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
