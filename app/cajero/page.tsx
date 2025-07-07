"use client"
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"
import { CajeroView } from "@/components/cajero/cajero-view"

// Datos simulados para el cajero
const cajeroStats = {
  ventasHoy: 3450.75,
  transacciones: 47,
  ticketPromedio: 73.42,
  efectivo: 1250.3,
}

const cuentasPendientes = [
  {
    id: 1,
    mesa: "Mesa 1",
    cliente: "Juan Pérez",
    total: 125.5,
    items: 4,
    tiempo: "45 min",
    mesero: "Carlos",
  },
  {
    id: 2,
    mesa: "Mesa 5",
    cliente: "María García",
    total: 89.25,
    items: 3,
    tiempo: "30 min",
    mesero: "Ana",
  },
  {
    id: 3,
    mesa: "Mesa 12",
    cliente: "Pedro López",
    total: 234.75,
    items: 6,
    tiempo: "1h 15min",
    mesero: "Carlos",
  },
  {
    id: 4,
    mesa: "Mesa 8",
    cliente: "Laura Martín",
    total: 67.5,
    items: 2,
    tiempo: "25 min",
    mesero: "Ana",
  },
]

const transaccionesRecientes = [
  { id: 1, mesa: "Mesa 3", total: 156.75, metodo: "Tarjeta", hora: "14:32", estado: "completada" },
  { id: 2, mesa: "Mesa 7", total: 89.5, metodo: "Efectivo", hora: "14:28", estado: "completada" },
  { id: 3, mesa: "Mesa 2", total: 203.25, metodo: "Tarjeta", hora: "14:15", estado: "completada" },
  { id: 4, mesa: "Mesa 9", total: 45.0, metodo: "Efectivo", hora: "14:10", estado: "completada" },
]

export default function CajeroPage() {
  return (
    <AuthenticatedLayout>
      <CajeroView />
    </AuthenticatedLayout>
  )
}
