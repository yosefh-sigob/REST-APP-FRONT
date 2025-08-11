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

export async function getOrdenes(): Promise<KitchenOrder[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/kitchen-orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.log(`API not available (${response.status}), using mock data for development`)
      return mockOrders
    }

    const orders: KitchenOrder[] = await response.json()
    return orders
  } catch (error) {
    console.log("External API not available, using mock data for development")
    return mockOrders
  }
}

export async function getOrdenById(id: string): Promise<KitchenOrder | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/kitchen-orders/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.log(`API not available (${response.status}), searching in mock data`)
      return mockOrders.find((order) => order.id === id) || null
    }

    const order: KitchenOrder = await response.json()
    return order
  } catch (error) {
    console.log("External API not available, searching in mock data")
    return mockOrders.find((order) => order.id === id) || null
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
      console.log("API not available, simulating successful status update for development")
      return true
    }

    return true
  } catch (error) {
    console.log("External API not available, simulating successful status update for development")
    return true
  }
}

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
      console.log("API not available, returning mock order for development")
      const mockOrder: KitchenOrder = {
        ...orden,
        id: `mock-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      return mockOrder
    }

    const newOrder: KitchenOrder = await response.json()
    return newOrder
  } catch (error) {
    console.log("External API not available, returning mock order for development")
    const mockOrder: KitchenOrder = {
      ...orden,
      id: `mock-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    return mockOrder
  }
}

export async function deleteOrden(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/kitchen-orders/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.log("API not available, simulating successful deletion for development")
      return true
    }

    return true
  } catch (error) {
    console.log("External API not available, simulating successful deletion for development")
    return true
  }
}
