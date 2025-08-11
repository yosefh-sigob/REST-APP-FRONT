"use server"

import type { KitchenOrder } from "@/interfaces/ordenes.interface"

const API_BASE_URL = process.env.API_URL || process.env.API_URL_LOCAL || "http://localhost:3001"

const mockOrders: KitchenOrder[] = [
  {
    id: "1",
    orderNumber: "ORD-001",
    tableNumber: 5,
    items: [
      {
        id: "item-1",
        name: "Hamburguesa Clásica",
        quantity: 2,
        notes: "Sin cebolla",
      },
      {
        id: "item-2",
        name: "Papas Fritas",
        quantity: 1,
        notes: "",
      },
    ],
    status: "pending",
    priority: "normal",
    estimatedTime: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    orderNumber: "ORD-002",
    tableNumber: 3,
    items: [
      {
        id: "item-3",
        name: "Pizza Margherita",
        quantity: 1,
        notes: "Extra queso",
      },
    ],
    status: "preparing",
    priority: "high",
    estimatedTime: 20,
    createdAt: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
    updatedAt: new Date().toISOString(),
  },
]

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
    console.log("Returning mock data for development")
    return mockOrders
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
    console.log("Simulating successful status update for development")
    return true
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
    console.log("Returning mock order for development")
    const mockOrder: KitchenOrder = {
      ...orden,
      id: `mock-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    return mockOrder
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
    console.log("Simulating successful deletion for development")
    return true
  }
}
