"use client"

import { useState } from "react"
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"
import { POSView } from "@/components/pos/pos-view"
import { mockProductos } from "@/lib/data/mock-data"
import type { Producto, ProductoVenta } from "@/lib/types"

export default function POSPage() {
  const [productos] = useState<Producto[]>(mockProductos)
  const [carrito, setCarrito] = useState<ProductoVenta[]>([])
  const [busqueda, setBusqueda] = useState("")
  const [categoriaFiltro, setCategoriaFiltro] = useState("todas")
  const [mesaSeleccionada, setMesaSeleccionada] = useState("")
  const [tipoVenta, setTipoVenta] = useState("comedor")

  const categorias = [...new Set(productos.map((p) => p.categoria))]

  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    const coincideCategoria = categoriaFiltro === "todas" || producto.categoria === categoriaFiltro
    return coincideBusqueda && coincideCategoria && producto.disponible
  })

  const agregarAlCarrito = (producto: Producto) => {
    const itemExistente = carrito.find((item) => item.producto.id === producto.id)

    if (itemExistente) {
      setCarrito(
        carrito.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1, total: (item.cantidad + 1) * item.precio }
            : item,
        ),
      )
    } else {
      const nuevoItem: ProductoVenta = {
        id: Date.now().toString(),
        producto,
        cantidad: 1,
        precio: producto.precio,
        total: producto.precio,
      }
      setCarrito([...carrito, nuevoItem])
    }
  }

  const actualizarCantidad = (itemId: string, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(itemId)
      return
    }

    setCarrito(
      carrito.map((item) =>
        item.id === itemId ? { ...item, cantidad: nuevaCantidad, total: nuevaCantidad * item.precio } : item,
      ),
    )
  }

  const eliminarDelCarrito = (itemId: string) => {
    setCarrito(carrito.filter((item) => item.id !== itemId))
  }

  const calcularSubtotal = () => {
    return carrito.reduce((total, item) => total + item.total, 0)
  }

  const calcularImpuestos = () => {
    return calcularSubtotal() * 0.16 // 16% IVA
  }

  const calcularTotal = () => {
    return calcularSubtotal() + calcularImpuestos()
  }

  const procesarVenta = () => {
    if (carrito.length === 0) return

    const venta = {
      productos: carrito,
      mesa: mesaSeleccionada,
      tipo: tipoVenta,
      subtotal: calcularSubtotal(),
      impuestos: calcularImpuestos(),
      total: calcularTotal(),
      fecha: new Date(),
    }

    console.log("Procesando venta:", venta)
    alert("Venta procesada exitosamente")
    setCarrito([])
  }

  return (
    <AuthenticatedLayout>
      <POSView
        productos={productos}
        carrito={carrito}
        setCarrito={setCarrito}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        categoriaFiltro={categoriaFiltro}
        setCategoriaFiltro={setCategoriaFiltro}
        mesaSeleccionada={mesaSeleccionada}
        setMesaSeleccionada={setMesaSeleccionada}
        tipoVenta={tipoVenta}
        setTipoVenta={setTipoVenta}
        categorias={categorias}
        productosFiltrados={productosFiltrados}
        agregarAlCarrito={agregarAlCarrito}
        actualizarCantidad={actualizarCantidad}
        eliminarDelCarrito={eliminarDelCarrito}
        calcularSubtotal={calcularSubtotal}
        calcularImpuestos={calcularImpuestos}
        calcularTotal={calcularTotal}
        procesarVenta={procesarVenta}
      />
    </AuthenticatedLayout>
  )
}
