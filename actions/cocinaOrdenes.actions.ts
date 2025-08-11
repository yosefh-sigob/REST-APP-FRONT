"use server"

import type { KitchenOrder } from "@/interfaces/ordenes.interface"

const API_BASE_URL = process.env.API_URL || process.env.API_URL_LOCAL || "http://localhost:3001"

// Simulando una llamada a API - obtener todas las órdenes
export async function getOrdenes(): Promise<KitchenOrder[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/kitchen-orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const orders: KitchenOrder[] = await response.json()
    return orders
  } catch (error) {
    console.error("Error fetching kitchen orders:", error)
    return []
  }
}

// Simulando una llamada a API - obtener orden por ID
export async function getOrdenById(id: string): Promise<KitchenOrder | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/kitchen-orders/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const order: KitchenOrder = await response.json()
    return order
  } catch (error) {
    console.error("Error fetching kitchen order by ID:", error)
    return null
  }
}

// Simulando una llamada a API - actualizar estado de orden
export async function updateOrdenStatus(id: string, status: KitchenOrder["status"]): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/kitchen-orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return true
  } catch (error) {
    console.error("Error updating kitchen order status:", error)
    return false
  }
}

// Simulando una llamada a API - crear nueva orden
export async function createOrden(orden: Omit<KitchenOrder, "id">): Promise<KitchenOrder | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/kitchen-orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orden),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const newOrder: KitchenOrder = await response.json()
    return newOrder
  } catch (error) {
    console.error("Error creating kitchen order:", error)
    return null
  }
}

// Simulando una llamada a API - eliminar orden
export async function deleteOrden(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/kitchen-orders/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return true
  } catch (error) {
    console.error("Error deleting kitchen order:", error)
    return false
  }
}
