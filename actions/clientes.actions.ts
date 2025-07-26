"use server"

import type { Cliente } from "@/interfaces/clientes.interface"
import clientesData from "@/data/clientes.json"

/**
 * Simula la obtención de datos de clientes desde una API
 * En un entorno real, esto haría una llamada HTTP a tu backend
 */
export async function getClientesData(): Promise<Cliente[]> {
  // Simulamos un delay de red
  await new Promise((resolve) => setTimeout(resolve, 100))

  try {
    // En un entorno real, aquí harías:
    // const response = await fetch(`${process.env.API_URL}/clientes`)
    // const data = await response.json()
    // return data

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
 * Simula la creación de un nuevo cliente
 */
export async function createCliente(clienteData: Omit<Cliente, "id">): Promise<Cliente> {
  await new Promise((resolve) => setTimeout(resolve, 200))

  try {
    // En un entorno real, aquí harías:
    // const response = await fetch(`${process.env.API_URL}/clientes`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(clienteData)
    // })
    // return await response.json()

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
      id, // Aseguramos que el ID no cambie
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

    // En un entorno real, aquí harías:
    // const response = await fetch(`${process.env.API_URL}/clientes/${id}`, {
    //   method: 'DELETE'
    // })
    // return response.ok

    return true
  } catch (error) {
    console.error("Error al eliminar cliente:", error)
    throw new Error("No se pudo eliminar el cliente")
  }
}
