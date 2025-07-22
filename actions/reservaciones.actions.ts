"use server"

import type { Reservacion } from "@/interfaces/reservaciones.interface"
import reservacionesData from "@/data/reservaciones.json"

// Simular delay de API
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getReservaciones(): Promise<Reservacion[]> {
  await delay(500) // Simular latencia de API

  try {
    // En producción, aquí harías el fetch a tu API
    // const response = await fetch(`${process.env.API_URL}/reservaciones`)
    // return await response.json()

    return reservacionesData as Reservacion[]
  } catch (error) {
    console.error("Error al obtener reservaciones:", error)
    throw new Error("No se pudieron cargar las reservaciones")
  }
}

export async function getReservacionById(id: string): Promise<Reservacion | null> {
  await delay(300)

  try {
    const reservaciones = reservacionesData as Reservacion[]
    const reservacion = reservaciones.find((r) => r.id === id)
    return reservacion || null
  } catch (error) {
    console.error("Error al obtener reservación:", error)
    throw new Error("No se pudo cargar la reservación")
  }
}

export async function createReservacion(data: Omit<Reservacion, "id" | "fechaCreacion">): Promise<Reservacion> {
  await delay(800)

  try {
    // En producción, aquí harías el POST a tu API
    // const response = await fetch(`${process.env.API_URL}/reservaciones`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // })
    // return await response.json()

    const nuevaReservacion: Reservacion = {
      ...data,
      id: `res_${Date.now()}`,
      fechaCreacion: new Date().toISOString(),
    }

    return nuevaReservacion
  } catch (error) {
    console.error("Error al crear reservación:", error)
    throw new Error("No se pudo crear la reservación")
  }
}

export async function updateReservacion(id: string, data: Partial<Reservacion>): Promise<Reservacion> {
  await delay(600)

  try {
    // En producción, aquí harías el PUT/PATCH a tu API
    // const response = await fetch(`${process.env.API_URL}/reservaciones/${id}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // })
    // return await response.json()

    const reservaciones = reservacionesData as Reservacion[]
    const reservacion = reservaciones.find((r) => r.id === id)

    if (!reservacion) {
      throw new Error("Reservación no encontrada")
    }

    const reservacionActualizada: Reservacion = {
      ...reservacion,
      ...data,
    }

    return reservacionActualizada
  } catch (error) {
    console.error("Error al actualizar reservación:", error)
    throw new Error("No se pudo actualizar la reservación")
  }
}

export async function deleteReservacion(id: string): Promise<boolean> {
  await delay(400)

  try {
    // En producción, aquí harías el DELETE a tu API
    // const response = await fetch(`${process.env.API_URL}/reservaciones/${id}`, {
    //   method: 'DELETE'
    // })
    // return response.ok

    const reservaciones = reservacionesData as Reservacion[]
    const existe = reservaciones.some((r) => r.id === id)

    if (!existe) {
      throw new Error("Reservación no encontrada")
    }

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
