"use server"

import type { Reservacion } from "@/interfaces/reservaciones.interface"
import type { CrearReservacionData } from "@/schemas/reservaciones.schemas"
import reservacionesData from "@/data/reservaciones.json"

// Simular delay de API
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Variable para simular una base de datos en memoria
const reservacionesEnMemoria: Reservacion[] = [...reservacionesData] as Reservacion[]

export async function getReservaciones(): Promise<Reservacion[]> {
  await delay(500) // Simular latencia de API

  try {
    // Ordenar por fecha de creación (más recientes primero)
    const reservacionesOrdenadas = [...reservacionesEnMemoria].sort(
      (a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime(),
    )

    return reservacionesOrdenadas
  } catch (error) {
    console.error("Error al obtener reservaciones:", error)
    throw new Error("No se pudieron cargar las reservaciones")
  }
}

export async function getReservacionById(id: string): Promise<Reservacion | null> {
  await delay(300)

  try {
    const reservacion = reservacionesEnMemoria.find((r) => r.id === id)
    return reservacion || null
  } catch (error) {
    console.error("Error al obtener reservación:", error)
    throw new Error("No se pudo cargar la reservación")
  }
}

export async function createReservacion(data: CrearReservacionData): Promise<Reservacion> {
  await delay(800) // Simular tiempo de procesamiento

  try {
    // Generar ID único
    const timestamp = Date.now()
    const randomSuffix = Math.random().toString(36).substring(2, 8)
    const nuevoId = `res_${timestamp}_${randomSuffix}`

    // Crear nueva reservación
    const nuevaReservacion: Reservacion = {
      id: nuevoId,
      clienteNombre: data.clienteNombre,
      clienteEmail: data.clienteEmail,
      clienteTelefono: data.clienteTelefono,
      fechaReservacion: data.fechaReservacion,
      horaReservacion: data.horaReservacion,
      numeroPersonas: data.numeroPersonas,
      estado: "pendiente", // Todas las nuevas reservaciones empiezan como pendientes
      tipoEvento: data.tipoEvento,
      observaciones: data.observaciones || "",
      solicitudesEspeciales: data.solicitudesEspeciales || "",
      fechaCreacion: new Date().toISOString(),
      // mesaAsignada se asignará después por el personal
    }

    // Agregar a la "base de datos" en memoria
    reservacionesEnMemoria.unshift(nuevaReservacion) // Agregar al inicio para que aparezca primero

    console.log("Nueva reservación creada:", nuevaReservacion)

    return nuevaReservacion
  } catch (error) {
    console.error("Error al crear reservación:", error)
    throw new Error("No se pudo crear la reservación")
  }
}

export async function updateReservacion(id: string, data: Partial<Reservacion>): Promise<Reservacion> {
  await delay(600)

  try {
    const index = reservacionesEnMemoria.findIndex((r) => r.id === id)

    if (index === -1) {
      throw new Error("Reservación no encontrada")
    }

    // Actualizar la reservación
    const reservacionActualizada: Reservacion = {
      ...reservacionesEnMemoria[index],
      ...data,
    }

    reservacionesEnMemoria[index] = reservacionActualizada

    console.log("Reservación actualizada:", reservacionActualizada)

    return reservacionActualizada
  } catch (error) {
    console.error("Error al actualizar reservación:", error)
    throw new Error("No se pudo actualizar la reservación")
  }
}

export async function deleteReservacion(id: string): Promise<boolean> {
  await delay(400)

  try {
    const index = reservacionesEnMemoria.findIndex((r) => r.id === id)

    if (index === -1) {
      throw new Error("Reservación no encontrada")
    }

    // Eliminar de la "base de datos" en memoria
    reservacionesEnMemoria.splice(index, 1)

    console.log("Reservación eliminada:", id)

    return true
  } catch (error) {
    console.error("Error al eliminar reservación:", error)
    throw new Error("No se pudo eliminar la reservación")
  }
}

export async function confirmarReservacion(id: string): Promise<Reservacion> {
  return updateReservacion(id, { estado: "confirmada" })
}

export async function completarReservacion(id: string): Promise<Reservacion> {
  return updateReservacion(id, { estado: "completada" })
}

export async function cancelarReservacion(id: string): Promise<Reservacion> {
  return updateReservacion(id, { estado: "cancelada" })
}

// Función para asignar mesa
export async function asignarMesa(id: string, numeroMesa: number): Promise<Reservacion> {
  return updateReservacion(id, { mesaAsignada: numeroMesa })
}

// Función para obtener estadísticas
export async function getEstadisticasReservaciones() {
  await delay(200)

  const total = reservacionesEnMemoria.length
  const pendientes = reservacionesEnMemoria.filter((r) => r.estado === "pendiente").length
  const confirmadas = reservacionesEnMemoria.filter((r) => r.estado === "confirmada").length
  const completadas = reservacionesEnMemoria.filter((r) => r.estado === "completada").length
  const canceladas = reservacionesEnMemoria.filter((r) => r.estado === "cancelada").length

  return {
    total,
    pendientes,
    confirmadas,
    completadas,
    canceladas,
  }
}
