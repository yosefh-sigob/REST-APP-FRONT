"use server"

import type { Mesa, EstadisticasMesas } from "@/interfaces/mesas.interface"
import mesasData from "@/data/mesas.json"

// Simular delay de API
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function obtenerMesas(): Promise<Mesa[]> {
  await delay(500) // Simular latencia de API

  try {
    return mesasData as Mesa[]
  } catch (error) {
    console.error("Error al obtener mesas:", error)
    throw new Error("No se pudieron cargar las mesas")
  }
}

export async function obtenerMesaPorId(id: string): Promise<Mesa | null> {
  await delay(300)

  try {
    const mesa = mesasData.find((m) => m.id === id)
    return (mesa as Mesa) || null
  } catch (error) {
    console.error("Error al obtener mesa:", error)
    throw new Error("No se pudo cargar la mesa")
  }
}

export async function obtenerEstadisticasMesas(): Promise<EstadisticasMesas> {
  await delay(200)

  try {
    const mesas = mesasData as Mesa[]
    const totalMesas = mesas.length
    const mesasOcupadas = mesas.filter((m) => m.estado === "ocupada").length
    const mesasLibres = mesas.filter((m) => m.estado === "libre").length
    const mesasReservadas = mesas.filter((m) => m.estado === "reservada").length
    const mesasLimpieza = mesas.filter((m) => m.estado === "limpieza").length
    const capacidadTotal = mesas.reduce((acc, mesa) => acc + mesa.capacidad, 0)
    const ocupacionPorcentaje = Math.round((mesasOcupadas / totalMesas) * 100)

    return {
      totalMesas,
      mesasOcupadas,
      mesasLibres,
      mesasReservadas,
      mesasLimpieza,
      capacidadTotal,
      ocupacionPorcentaje,
    }
  } catch (error) {
    console.error("Error al obtener estadísticas:", error)
    throw new Error("No se pudieron cargar las estadísticas")
  }
}

export async function actualizarEstadoMesa(id: string, nuevoEstado: Mesa["estado"]): Promise<Mesa> {
  await delay(800)

  try {
    // En una implementación real, aquí haríamos la llamada a la API
    const mesa = mesasData.find((m) => m.id === id) as Mesa
    if (!mesa) {
      throw new Error("Mesa no encontrada")
    }

    // Simular actualización
    const mesaActualizada = { ...mesa, estado: nuevoEstado }

    return mesaActualizada
  } catch (error) {
    console.error("Error al actualizar mesa:", error)
    throw new Error("No se pudo actualizar el estado de la mesa")
  }
}

export async function asignarMesero(mesaId: string, mesero: string): Promise<Mesa> {
  await delay(600)

  try {
    const mesa = mesasData.find((m) => m.id === mesaId) as Mesa
    if (!mesa) {
      throw new Error("Mesa no encontrada")
    }

    const mesaActualizada = { ...mesa, mesero }

    return mesaActualizada
  } catch (error) {
    console.error("Error al asignar mesero:", error)
    throw new Error("No se pudo asignar el mesero")
  }
}

export async function liberarMesa(mesaId: string): Promise<Mesa> {
  await delay(700)

  try {
    const mesa = mesasData.find((m) => m.id === mesaId) as Mesa
    if (!mesa) {
      throw new Error("Mesa no encontrada")
    }

    const mesaLiberada = {
      ...mesa,
      estado: "libre" as const,
      clientes: 0,
      tiempo: undefined,
      mesero: undefined,
      fechaOcupacion: undefined,
    }

    return mesaLiberada
  } catch (error) {
    console.error("Error al liberar mesa:", error)
    throw new Error("No se pudo liberar la mesa")
  }
}
