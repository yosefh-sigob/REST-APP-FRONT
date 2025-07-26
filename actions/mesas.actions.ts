"use server"

import { revalidatePath } from "next/cache"
import type { Mesa, EstadisticasMesas, ActualizarMesaData } from "@/interfaces/mesas.interface"
import { actualizarMesaSchema } from "@/schemas/mesas.schemas"
import mesasData from "@/data/mesas.json"

// Simulamos una base de datos en memoria
const mesas: Mesa[] = mesasData as Mesa[]

export async function obtenerMesas(): Promise<Mesa[]> {
  // Simulamos delay de API
  await new Promise((resolve) => setTimeout(resolve, 100))

  return mesas.filter((mesa) => mesa.activa).sort((a, b) => a.numero - b.numero)
}

export async function obtenerMesaPorId(id: string): Promise<Mesa | null> {
  await new Promise((resolve) => setTimeout(resolve, 50))

  const mesa = mesas.find((m) => m.id === id && m.activa)
  return mesa || null
}

export async function obtenerEstadisticasMesas(): Promise<EstadisticasMesas> {
  await new Promise((resolve) => setTimeout(resolve, 50))

  const mesasActivas = mesas.filter((mesa) => mesa.activa)
  const totalMesas = mesasActivas.length
  const mesasOcupadas = mesasActivas.filter((mesa) => mesa.estado === "ocupada").length
  const mesasLibres = mesasActivas.filter((mesa) => mesa.estado === "libre").length
  const mesasReservadas = mesasActivas.filter((mesa) => mesa.estado === "reservada").length
  const mesasLimpieza = mesasActivas.filter((mesa) => mesa.estado === "limpieza").length
  const capacidadTotal = mesasActivas.reduce((total, mesa) => total + mesa.capacidad, 0)
  const ocupacionPorcentaje = totalMesas > 0 ? Math.round((mesasOcupadas / totalMesas) * 100) : 0

  return {
    totalMesas,
    mesasOcupadas,
    mesasLibres,
    mesasReservadas,
    mesasLimpieza,
    capacidadTotal,
    ocupacionPorcentaje,
  }
}

export async function actualizarMesa(
  id: string,
  data: ActualizarMesaData,
): Promise<{ success: boolean; message: string; mesa?: Mesa }> {
  try {
    // Validar datos
    const validatedData = actualizarMesaSchema.parse(data)

    await new Promise((resolve) => setTimeout(resolve, 200))

    const mesaIndex = mesas.findIndex((m) => m.id === id && m.activa)
    if (mesaIndex === -1) {
      return { success: false, message: "Mesa no encontrada" }
    }

    const mesa = mesas[mesaIndex]

    // Validaciones de negocio
    if (validatedData.clientes && validatedData.clientes > mesa.capacidad) {
      return { success: false, message: `La mesa solo tiene capacidad para ${mesa.capacidad} personas` }
    }

    // Actualizar mesa
    const mesaActualizada: Mesa = {
      ...mesa,
      ...validatedData,
      fechaActualizacion: new Date().toISOString(),
    }

    // Lógica específica por estado
    if (validatedData.estado === "ocupada") {
      mesaActualizada.fechaOcupacion = new Date().toISOString()
      mesaActualizada.horaReserva = undefined
    } else if (validatedData.estado === "libre") {
      mesaActualizada.clientes = 0
      mesaActualizada.mesero = undefined
      mesaActualizada.fechaOcupacion = undefined
      mesaActualizada.horaReserva = undefined
    } else if (validatedData.estado === "limpieza") {
      mesaActualizada.clientes = 0
      mesaActualizada.mesero = undefined
      mesaActualizada.fechaOcupacion = undefined
      mesaActualizada.tiempo = "10 min"
    }

    mesas[mesaIndex] = mesaActualizada

    revalidatePath("/mesas")

    return {
      success: true,
      message: "Mesa actualizada correctamente",
      mesa: mesaActualizada,
    }
  } catch (error) {
    console.error("Error al actualizar mesa:", error)
    return { success: false, message: "Error al actualizar la mesa" }
  }
}

export async function ocuparMesa(
  id: string,
  clientes: number,
  mesero: string,
  observaciones?: string,
): Promise<{ success: boolean; message: string }> {
  return actualizarMesa(id, {
    estado: "ocupada",
    clientes,
    mesero,
    observaciones,
  })
}

export async function liberarMesa(id: string): Promise<{ success: boolean; message: string }> {
  return actualizarMesa(id, {
    estado: "libre",
    clientes: 0,
    observaciones: "Mesa liberada",
  })
}

export async function asignarMesero(id: string, mesero: string): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const mesaIndex = mesas.findIndex((m) => m.id === id && m.activa)
    if (mesaIndex === -1) {
      return { success: false, message: "Mesa no encontrada" }
    }

    mesas[mesaIndex] = {
      ...mesas[mesaIndex],
      mesero,
      fechaActualizacion: new Date().toISOString(),
    }

    revalidatePath("/mesas")

    return { success: true, message: "Mesero asignado correctamente" }
  } catch (error) {
    console.error("Error al asignar mesero:", error)
    return { success: false, message: "Error al asignar mesero" }
  }
}

export async function obtenerMeseros(): Promise<string[]> {
  // Lista de meseros disponibles (en una app real vendría de la base de datos)
  return [
    "Juan Pérez",
    "María García",
    "Carlos López",
    "Ana Martín",
    "Luis Rodríguez",
    "Sofia Hernández",
    "Diego Morales",
    "Carmen Ruiz",
    "Roberto Silva",
    "Elena Torres",
  ]
}
