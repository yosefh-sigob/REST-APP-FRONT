"use server"

import type { Cliente, ClienteDetalle, HistorialVisita } from "@/interfaces/clientes.interface"
import clientesData from "@/data/clientes.json"
import historialData from "@/data/historial-clientes.json"

/**
 * Simula la obtención de datos de clientes desde una API
 */
export async function getClientesData(): Promise<Cliente[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  try {
    return clientesData as Cliente[]
  } catch (error) {
    console.error("Error al obtener datos de clientes:", error)
    throw new Error("No se pudieron cargar los datos de clientes")
  }
}

/**
 * Simula la búsqueda de un cliente por ID
 */
export async function getClienteById(id: number): Promise<Cliente | null> {
  await new Promise((resolve) => setTimeout(resolve, 50))

  try {
    const cliente = clientesData.find((c) => c.id === id)
    return (cliente as Cliente) || null
  } catch (error) {
    console.error("Error al obtener cliente por ID:", error)
    throw new Error("No se pudo cargar el cliente")
  }
}

/**
 * Obtiene el historial completo de un cliente con estadísticas
 */
export async function getClienteDetalle(id: number): Promise<ClienteDetalle | null> {
  await new Promise((resolve) => setTimeout(resolve, 150))

  try {
    const cliente = clientesData.find((c) => c.id === id)
    if (!cliente) {
      return null
    }

    const historial = (historialData as Record<string, HistorialVisita[]>)[id.toString()] || []

    // Calcular estadísticas
    const estadisticas = calcularEstadisticas(historial)

    return {
      ...(cliente as Cliente),
      historial,
      estadisticas,
    }
  } catch (error) {
    console.error("Error al obtener detalle del cliente:", error)
    throw new Error("No se pudo cargar el detalle del cliente")
  }
}

/**
 * Obtiene solo el historial de visitas de un cliente
 */
export async function getHistorialCliente(clienteId: number): Promise<HistorialVisita[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  try {
    const historial = (historialData as Record<string, HistorialVisita[]>)[clienteId.toString()] || []
    return historial.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
  } catch (error) {
    console.error("Error al obtener historial del cliente:", error)
    throw new Error("No se pudo cargar el historial del cliente")
  }
}

/**
 * Calcula estadísticas basadas en el historial
 */
function calcularEstadisticas(historial: HistorialVisita[]) {
  if (historial.length === 0) {
    return {
      visitasPorMes: [],
      gastoPorMes: [],
      productosPreferidos: [],
      promedioGastoPorVisita: 0,
      tiempoPromedioVisita: 0,
    }
  }

  // Visitas por mes
  const visitasPorMes = historial.reduce(
    (acc, visita) => {
      const mes = new Date(visita.fecha).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
      })
      acc[mes] = (acc[mes] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Gasto por mes
  const gastoPorMes = historial.reduce(
    (acc, visita) => {
      const mes = new Date(visita.fecha).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
      })
      acc[mes] = (acc[mes] || 0) + visita.total
      return acc
    },
    {} as Record<string, number>,
  )

  // Productos preferidos
  const productosCount = historial.reduce(
    (acc, visita) => {
      visita.productos.forEach((producto) => {
        acc[producto.nombre] = (acc[producto.nombre] || 0) + producto.cantidad
      })
      return acc
    },
    {} as Record<string, number>,
  )

  const productosPreferidos = Object.entries(productosCount)
    .map(([producto, veces]) => ({ producto, veces }))
    .sort((a, b) => b.veces - a.veces)
    .slice(0, 5)

  // Promedios
  const promedioGastoPorVisita = historial.reduce((acc, v) => acc + v.total, 0) / historial.length
  const tiempoPromedioVisita = historial.reduce((acc, v) => acc + v.duracion, 0) / historial.length

  return {
    visitasPorMes: Object.entries(visitasPorMes).map(([mes, visitas]) => ({ mes, visitas })),
    gastoPorMes: Object.entries(gastoPorMes).map(([mes, gasto]) => ({ mes, gasto })),
    productosPreferidos,
    promedioGastoPorVisita,
    tiempoPromedioVisita,
  }
}

/**
 * Simula la creación de un nuevo cliente
 */
export async function createCliente(clienteData: Omit<Cliente, "id">): Promise<Cliente> {
  await new Promise((resolve) => setTimeout(resolve, 200))

  try {
    const newCliente: Cliente = {
      ...clienteData,
      id: Math.max(...clientesData.map((c) => c.id)) + 1,
    }

    return newCliente
  } catch (error) {
    console.error("Error al crear cliente:", error)
    throw new Error("No se pudo crear el cliente")
  }
}

/**
 * Simula la actualización de un cliente existente
 */
export async function updateCliente(id: number, clienteData: Partial<Cliente>): Promise<Cliente> {
  await new Promise((resolve) => setTimeout(resolve, 150))

  try {
    const existingCliente = clientesData.find((c) => c.id === id)
    if (!existingCliente) {
      throw new Error("Cliente no encontrado")
    }

    const updatedCliente: Cliente = {
      ...existingCliente,
      ...clienteData,
      id,
    }

    return updatedCliente
  } catch (error) {
    console.error("Error al actualizar cliente:", error)
    throw new Error("No se pudo actualizar el cliente")
  }
}

/**
 * Simula la eliminación de un cliente
 */
export async function deleteCliente(id: number): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  try {
    const clienteExists = clientesData.some((c) => c.id === id)
    if (!clienteExists) {
      throw new Error("Cliente no encontrado")
    }

    return true
  } catch (error) {
    console.error("Error al eliminar cliente:", error)
    throw new Error("No se pudo eliminar el cliente")
  }
}
