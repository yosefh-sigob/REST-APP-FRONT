"use server"

import type {
  ItemInventario,
  EstadisticasInventario,
  FiltrosInventario,
  ActualizacionInventario,
  MovimientoInventario,
} from "@/interfaces/inventario.interface"
import inventarioData from "@/data/inventario.json"

// Simular delay de red
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function obtenerInventario(): Promise<ItemInventario[]> {
  await delay(800)
  return inventarioData as ItemInventario[]
}

export async function obtenerEstadisticasInventario(): Promise<EstadisticasInventario> {
  await delay(500)

  const items = inventarioData as ItemInventario[]
  const hoy = new Date()
  const proximoVencimiento = new Date()
  proximoVencimiento.setDate(hoy.getDate() + 7) // Próximos 7 días

  const estadisticas: EstadisticasInventario = {
    totalItems: items.length,
    itemsDisponibles: items.filter((item) => item.estado === "disponible").length,
    itemsBajoStock: items.filter((item) => item.estado === "bajo_stock").length,
    itemsCriticos: items.filter((item) => item.estado === "critico").length,
    itemsAgotados: items.filter((item) => item.estado === "agotado").length,
    valorTotalInventario: items.reduce((total, item) => total + item.cantidadActual * item.costoUnitario, 0),
    itemsProximosVencer: items.filter((item) => {
      const fechaVencimiento = new Date(item.fechaVencimiento)
      return fechaVencimiento <= proximoVencimiento && fechaVencimiento >= hoy
    }).length,
  }

  return estadisticas
}

export async function filtrarInventario(filtros: FiltrosInventario): Promise<ItemInventario[]> {
  await delay(300)

  let items = inventarioData as ItemInventario[]

  if (filtros.categoria) {
    items = items.filter((item) => item.categoria === filtros.categoria)
  }

  if (filtros.estado) {
    items = items.filter((item) => item.estado === filtros.estado)
  }

  if (filtros.busqueda) {
    const busqueda = filtros.busqueda.toLowerCase()
    items = items.filter(
      (item) =>
        item.nombre.toLowerCase().includes(busqueda) ||
        item.proveedor.toLowerCase().includes(busqueda) ||
        item.ubicacion.toLowerCase().includes(busqueda),
    )
  }

  if (filtros.proximosVencer) {
    const hoy = new Date()
    const proximoVencimiento = new Date()
    proximoVencimiento.setDate(hoy.getDate() + 7)

    items = items.filter((item) => {
      const fechaVencimiento = new Date(item.fechaVencimiento)
      return fechaVencimiento <= proximoVencimiento && fechaVencimiento >= hoy
    })
  }

  return items
}

export async function actualizarCantidadInventario(
  actualizacion: ActualizacionInventario,
): Promise<{ success: boolean; message: string }> {
  await delay(1000)

  // Simular actualización exitosa
  return {
    success: true,
    message: `Cantidad actualizada correctamente para el item ${actualizacion.itemId}`,
  }
}

export async function obtenerMovimientosInventario(itemId: string): Promise<MovimientoInventario[]> {
  await delay(600)

  // Simular movimientos de inventario
  const movimientos: MovimientoInventario[] = [
    {
      id: "mov-001",
      itemId,
      tipo: "entrada",
      cantidad: 10,
      motivo: "Compra a proveedor",
      fecha: "2024-01-28T08:00:00Z",
      usuario: "chef-001",
      observaciones: "Recepción de mercancía semanal",
    },
    {
      id: "mov-002",
      itemId,
      tipo: "salida",
      cantidad: 5,
      motivo: "Uso en cocina",
      fecha: "2024-01-28T12:30:00Z",
      usuario: "chef-002",
      observaciones: "Preparación de platos del día",
    },
    {
      id: "mov-003",
      itemId,
      tipo: "ajuste",
      cantidad: -0.5,
      motivo: "Ajuste por inventario físico",
      fecha: "2024-01-28T18:00:00Z",
      usuario: "chef-001",
      observaciones: "Diferencia encontrada en conteo físico",
    },
  ]

  return movimientos
}

export async function registrarMovimientoInventario(
  movimiento: Omit<MovimientoInventario, "id" | "fecha">,
): Promise<{ success: boolean; message: string }> {
  await delay(800)

  return {
    success: true,
    message: "Movimiento registrado correctamente",
  }
}

export async function obtenerItemsPorVencer(): Promise<ItemInventario[]> {
  await delay(400)

  const items = inventarioData as ItemInventario[]
  const hoy = new Date()
  const proximoVencimiento = new Date()
  proximoVencimiento.setDate(hoy.getDate() + 7)

  return items.filter((item) => {
    const fechaVencimiento = new Date(item.fechaVencimiento)
    return fechaVencimiento <= proximoVencimiento && fechaVencimiento >= hoy
  })
}

export async function obtenerItemsBajoStock(): Promise<ItemInventario[]> {
  await delay(400)

  const items = inventarioData as ItemInventario[]
  return items.filter((item) => item.estado === "bajo_stock" || item.estado === "critico" || item.estado === "agotado")
}
