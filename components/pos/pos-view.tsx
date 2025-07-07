"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, CreditCard, Calculator, Trash2, Plus, Minus, Search } from "lucide-react"

const PRODUCTOS_POS = [
  { id: 1, nombre: "Hamburguesa Clásica", precio: 125.0, categoria: "Hamburguesas" },
  { id: 2, nombre: "Pizza Margherita", precio: 180.0, categoria: "Pizzas" },
  { id: 3, nombre: "Ensalada César", precio: 95.0, categoria: "Ensaladas" },
  { id: 4, nombre: "Pasta Alfredo", precio: 140.0, categoria: "Pastas" },
  { id: 5, nombre: "Coca Cola", precio: 35.0, categoria: "Bebidas" },
  { id: 6, nombre: "Agua Natural", precio: 25.0, categoria: "Bebidas" },
  { id: 7, nombre: "Tacos al Pastor", precio: 85.0, categoria: "Tacos" },
  { id: 8, nombre: "Quesadilla", precio: 65.0, categoria: "Antojitos" },
]

interface ItemCarrito {
  id: number
  nombre: string
  precio: number
  cantidad: number
}

export function POSView() {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas")

  const categorias = ["Todas", ...Array.from(new Set(PRODUCTOS_POS.map((p) => p.categoria)))]

  const productosFiltrados = PRODUCTOS_POS.filter((producto) => {
    const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoriaSeleccionada === "Todas" || producto.categoria === categoriaSeleccionada
    return matchesSearch && matchesCategory
  })

  const agregarAlCarrito = (producto: (typeof PRODUCTOS_POS)[0]) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id)
      if (existente) {
        return prev.map((item) => (item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item))
      } else {
        return [...prev, { ...producto, cantidad: 1 }]
      }
    })
  }

  const actualizarCantidad = (id: number, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) {
      setCarrito((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCarrito((prev) => prev.map((item) => (item.id === id ? { ...item, cantidad: nuevaCantidad } : item)))
    }
  }

  const limpiarCarrito = () => {
    setCarrito([])
  }

  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
  const impuestos = subtotal * 0.16 // 16% IVA
  const total = subtotal + impuestos

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Punto de Venta</h1>
          <p className="text-gray-600 mt-1">Sistema POS para procesar ventas</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-lg px-4 py-2">
            <ShoppingCart className="h-4 w-4 mr-2" />
            POS Activo
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel de Productos */}
        <div className="lg:col-span-2 space-y-4">
          {/* Búsqueda y Filtros */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {categorias.map((categoria) => (
                    <Button
                      key={categoria}
                      variant={categoriaSeleccionada === categoria ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCategoriaSeleccionada(categoria)}
                      className={
                        categoriaSeleccionada === categoria ? "bg-orange-600 hover:bg-orange-700" : "bg-transparent"
                      }
                    >
                      {categoria}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grid de Productos */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {productosFiltrados.map((producto) => (
              <Card key={producto.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4" onClick={() => agregarAlCarrito(producto)}>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <ShoppingCart className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{producto.nombre}</h3>
                    <Badge variant="secondary" className="text-xs mb-2">
                      {producto.categoria}
                    </Badge>
                    <p className="text-lg font-bold text-green-600">${producto.precio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Panel del Carrito */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Carrito de Compras
              </CardTitle>
              <CardDescription>
                {carrito.length} {carrito.length === 1 ? "producto" : "productos"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {carrito.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">El carrito está vacío</p>
                  <p className="text-sm text-gray-400">Agrega productos para comenzar</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {carrito.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.nombre}</h4>
                          <p className="text-sm text-gray-600">${item.precio} c/u</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                            className="h-8 w-8 p-0 bg-transparent"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.cantidad}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                            className="h-8 w-8 p-0 bg-transparent"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => actualizarCantidad(item.id, 0)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 bg-transparent"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Resumen de Totales */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>IVA (16%):</span>
                      <span>${impuestos.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-green-600">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Botones de Acción */}
                  <div className="space-y-2">
                    <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Procesar Pago
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" onClick={limpiarCarrito}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Limpiar Carrito
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Calculadora Rápida */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Calculadora
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "C"].map((btn) => (
                  <Button key={btn} variant="outline" className="h-10 bg-transparent">
                    {btn}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
