"use server"

import type { Reservacion } from "@/interfaces/reservaciones.interface"
import reservacionesData from "@/data/reservaciones.json"

export async function getReservaciones(): Promise<Reservacion[]> {
  // Simular delay de API
  await new Promise((resolve) => setTimeout(resolve, 100))

  // En producción, aquí haríamos el fetch real a la API
  // const response = await fetch(`${process.env.API_URL}/reservaciones`)
  // return response.json()

  return reservacionesData as Reservacion[]
}

export async function getReservacionById(id: string): Promise<Reservacion | null> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const reservacion = reservacionesData.find((r) => r.id === id)
  return (reservacion as Reservacion) || null
}

export async function createReservacion(
  data: Omit<Reservacion, "id" | "fechaCreacion" | "estado">,
): Promise<Reservacion> {
  await new Promise((resolve) => setTimeout(resolve, 200))

  // En producción, aquí haríamos el POST a la API
  const nuevaReservacion: Reservacion = {
    ...data,
    id: `res_${Date.now()}`,
    fechaCreacion: new Date().toISOString(),
    estado: "pendiente",
  }

  return nuevaReservacion
}

export async function updateReservacion(id: string, data: Partial<Reservacion>): Promise<Reservacion | null> {
  await new Promise((resolve) => setTimeout(resolve, 200))

  // En producción, aquí haríamos el PUT a la API
  const reservacion = reservacionesData.find((r) => r.id === id)
  if (!reservacion) return null

  return { ...reservacion, ...data } as Reservacion
}

export async function deleteReservacion(id: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 200))

  // En producción, aquí haríamos el DELETE a la API
  return true
}
