"use client"
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"
import { MeseroView } from "@/components/mesero/mesero-view"

// Datos simulados para el mesero
const meseroStats = {
  mesasAsignadas: 8,
  clientesAtendidos: 24,
  ventasHoy: 1250.5,
  promedioServicio: 4.8,
}

const mesasAsignadas = [
  { id: 1, numero: "Mesa 1", estado: "ocupada", clientes: 4, tiempo: "45 min", pedido: "En cocina" },
  { id: 2, numero: "Mesa 3", estado: "disponible", clientes: 0, tiempo: "-", pedido: "-" },
  { id: 5, numero: "Mesa 5", estado: "ocupada", clientes: 2, tiempo: "20 min", pedido: "Servido" },
  { id: 8, numero: "Mesa 8", estado: "reservada", clientes: 0, tiempo: "15:30", pedido: "Reserva" },
  { id: 12, numero: "Mesa 12", estado: "ocupada", clientes: 6, tiempo: "1h 10min", pedido: "Listo" },
  { id: 15, numero: "Mesa 15", estado: "limpieza", clientes: 0, tiempo: "5 min", pedido: "Limpiando" },
]

const pedidosPendientes = [
  { id: 1, mesa: "Mesa 1", items: "2x Pasta, 1x Pizza", estado: "preparando", tiempo: "8 min" },
  { id: 2, mesa: "Mesa 12", items: "3x Ensalada, 2x Sopa", estado: "listo", tiempo: "Listo" },
  { id: 3, mesa: "Mesa 5", items: "1x Hamburguesa", estado: "servido", tiempo: "Servido" },
]

export default function MeseroPage() {
  return (
    <AuthenticatedLayout>
      <MeseroView />
    </AuthenticatedLayout>
  )
}
