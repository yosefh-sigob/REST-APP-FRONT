"use server"

import type { MeseroOrder, MeseroOrderStats, MeseroOrderStatus } from "@/interfaces/ordenes.interface"
import meseroOrdenesData from "@/data/mesero-ordenes.json"

// Simular delay de red
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getMeseroOrdenes(meseroId?: string): Promise<MeseroOrder[]> {
  await delay(500)

  let ordenes = meseroOrdenesData as MeseroOrder[]

  // Filtrar por mesero si se proporciona el ID
  if (meseroId) {
    ordenes = ordenes.filter((orden) => orden.meseroId === meseroId)
  }

  // Ordenar por fecha de creación (más recientes primero)
  return ordenes.sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime())
}

export async function getMeseroOrdenById(id: string): Promise<MeseroOrder | null> {
  await delay(300)

  const orden = meseroOrdenesData.find((orden) => orden.id === id)
  return (orden as MeseroOrder) || null
}

export async function getMeseroOrdenesStats(meseroId?: string): Promise<MeseroOrderStats> {
  await delay(200)

  let ordenes = meseroOrdenesData as MeseroOrder[]

  if (meseroId) {
    ordenes = ordenes.filter((orden) => orden.meseroId === meseroId)
  }

  const stats: MeseroOrderStats = {
    total: ordenes.length,
    pendientes: ordenes.filter((o) => o.estado === "pendiente").length,
    enPreparacion: ordenes.filter((o) => o.estado === "en_preparacion").length,
    listas: ordenes.filter((o) => o.estado === "lista").length,
    entregadas: ordenes.filter((o) => o.estado === "entregada").length,
  }

  return stats
}

export async function updateMeseroOrdenStatus(
  id: string,
  nuevoEstado: MeseroOrderStatus,
  observaciones?: string,
): Promise<{ success: boolean; message: string }> {
  await delay(800)

  // Simular actualización exitosa
  console.log(`Actualizando orden ${id} a estado: ${nuevoEstado}`)
  if (observaciones) {
    console.log(`Observaciones: ${observaciones}`)
  }

  return {
    success: true,
    message: `Orden ${id} actualizada correctamente`,
  }
}

export async function getMeseroOrdenesByEstado(estado: MeseroOrderStatus, meseroId?: string): Promise<MeseroOrder[]> {
  await delay(400)

  let ordenes = meseroOrdenesData as MeseroOrder[]

  if (meseroId) {
    ordenes = ordenes.filter((orden) => orden.meseroId === meseroId)
  }

  return ordenes
    .filter((orden) => orden.estado === estado)
    .sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime())
}

export async function getTiempoPromedioPreparacion(meseroId?: string): Promise<number> {
  await delay(300)

  let ordenes = meseroOrdenesData as MeseroOrder[]

  if (meseroId) {
    ordenes = ordenes.filter((orden) => orden.meseroId === meseroId)
  }

  const ordenesEntregadas = ordenes.filter((o) => o.estado === "entregada")

  if (ordenesEntregadas.length === 0) return 0

  const tiempoTotal = ordenesEntregadas.reduce((acc, orden) => {
    const inicio = new Date(orden.fechaCreacion).getTime()
    const fin = new Date(orden.fechaActualizacion).getTime()
    return acc + (fin - inicio)
  }, 0)

  // Retornar promedio en minutos
  return Math.round(tiempoTotal / ordenesEntregadas.length / (1000 * 60))
}
