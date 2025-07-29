"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MenuIcon as Restaurant,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  Star,
  Clock,
  TrendingUp,
  ChefHat,
  Utensils,
} from "lucide-react"
import Link from "next/link"

export function HomeView() {
  const [selectedLicense] = useState("Pro") // Mock license level

  const features = [
    {
      title: "Gestión de Productos",
      description: "Administra tu catálogo completo de productos y precios",
      icon: <ShoppingCart className="h-6 w-6" />,
      href: "/productos",
      license: "Gratis",
    },
    {
      title: "Control de Mesas",
      description: "Gestiona las mesas y su disponibilidad en tiempo real",
      icon: <Utensils className="h-6 w-6" />,
      href: "/mesas",
      license: "Lite",
    },
    {
      title: "Punto de Venta",
      description: "Sistema POS completo para procesar órdenes",
      icon: <Restaurant className="h-6 w-6" />,
      href: "/ventas/pos",
      license: "Pro",
    },
    {
      title: "Gestión de Clientes",
      description: "Base de datos completa de clientes y historial",
      icon: <Users className="h-6 w-6" />,
      href: "/clientes",
      license: "Lite",
    },
    {
      title: "Cocina",
      description: "Panel de control para el área de cocina",
      icon: <ChefHat className="h-6 w-6" />,
      href: "/cocina/ordenes",
      license: "Pro",
    },
    {
      title: "Reportes",
      description: "Análisis detallado de ventas y rendimiento",
      icon: <BarChart3 className="h-6 w-6" />,
      href: "/reportes",
      license: "Pro",
    },
    {
      title: "Inventario",
      description: "Control de stock y materias primas",
      icon: <Settings className="h-6 w-6" />,
      href: "/inventario",
      license: "Franquicia",
    },
    {
      title: "Reservaciones",
      description: "Sistema de reservas para mesas",
      icon: <Clock className="h-6 w-6" />,
      href: "/reservaciones",
      license: "Pro",
    },
  ]

  const stats = [
    {
      title: "Órdenes Hoy",
      value: "127",
      change: "+12%",
      icon: <ShoppingCart className="h-4 w-4" />,
    },
    {
      title: "Ventas del Día",
      value: "$3,247",
      change: "+8%",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      title: "Mesas Ocupadas",
      value: "8/12",
      change: "67%",
      icon: <Utensils className="h-4 w-4" />,
    },
    {
      title: "Productos Activos",
      value: "156",
      change: "+3",
      icon: <Star className="h-4 w-4" />,
    },
  ]

  const getLicenseLevel = (requiredLicense: string) => {
    const levels = ["Gratis", "Lite", "Pro", "Franquicia"]
    const currentLevel = levels.indexOf(selectedLicense)
    const requiredLevel = levels.indexOf(requiredLicense)
    return currentLevel >= requiredLevel
  }

  const getLicenseBadgeColor = (license: string) => {
    switch (license) {
      case "Gratis":
        return "bg-green-100 text-green-800"
      case "Lite":
        return "bg-blue-100 text-blue-800"
      case "Pro":
        return "bg-purple-100 text-purple-800"
      case "Franquicia":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panel de Control</h1>
              <p className="text-gray-600 mt-1">Bienvenido al sistema de gestión de restaurante</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={getLicenseBadgeColor(selectedLicense)}>Licencia {selectedLicense}</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    {stat.icon}
                    <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const hasAccess = getLicenseLevel(feature.license)

            return (
              <Card
                key={index}
                className={`transition-all duration-200 ${
                  hasAccess ? "hover:shadow-lg cursor-pointer" : "opacity-60 cursor-not-allowed"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${
                          hasAccess ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {feature.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                    </div>
                    <Badge variant="outline" className={getLicenseBadgeColor(feature.license)}>
                      {feature.license}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{feature.description}</CardDescription>

                  {hasAccess ? (
                    <Link href={feature.href}>
                      <Button className="w-full">Acceder</Button>
                    </Link>
                  ) : (
                    <div className="space-y-2">
                      <Button disabled className="w-full">
                        Requiere {feature.license}
                      </Button>
                      <p className="text-xs text-gray-500 text-center">
                        Actualiza tu licencia para acceder a esta función
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>Accesos directos a las funciones más utilizadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/productos">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Nuevo Producto
                  </Button>
                </Link>
                <Link href="/ventas/pos">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Restaurant className="mr-2 h-4 w-4" />
                    Nueva Orden
                  </Button>
                </Link>
                <Link href="/mesas">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Utensils className="mr-2 h-4 w-4" />
                    Ver Mesas
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* License Info */}
        <div className="mt-8">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Star className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-blue-900">Licencia Actual: {selectedLicense}</h3>
                  <p className="text-blue-700 text-sm">
                    Tienes acceso a todas las funciones de nivel {selectedLicense} y anteriores.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
