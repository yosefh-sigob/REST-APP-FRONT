"use server"

import type { KitchenOrder } from "@/interfaces/ordenes.interface"
import { promises as fs } from "fs"
import path from "path"

// Simulando una llamada a API - obtener todas las órdenes
export async function getOrdenes(): Promise<KitchenOrder[]> {
  try {
    const filePath = path.join(process.cwd(), "data", "kitchen-orders.json")
    const fileContents = await fs.readFile(filePath, "utf-8")
    const orders: KitchenOrder[] = JSON.parse(fileContents)
    return orders
  } catch (error) {
    console.error("Error fetching kitchen orders:", error)
    return []
  }
}

// Simulando una llamada a API - obtener orden por ID
export async function getOrdenById(id: string): Promise<KitchenOrder | null> {
  try {
    const orders = await getOrdenes()
    return orders.find(order => order.id === id) || null
  } catch (error) {
    console.error("Error fetching kitchen order by ID:", error)
    return null
  }
}

// Simulando una llamada a API - actualizar estado de orden
export async function updateOrdenStatus(id: string, status: KitchenOrder['status']): Promise<boolean> {
  try {
    const filePath = path.join(process.cwd(), "data", "kitchen-orders.json")
    const orders = await getOrdenes()
    
    const orderIndex = orders.findIndex(order => order.id === id)
    if (orderIndex === -1) return false
    
    orders[orderIndex].status = status
    
    await fs.writeFile(filePath, JSON.stringify(orders, null, 2), "utf-8")
    return true
  } catch (error) {
    console.error("Error updating kitchen order status:", error)
    return false
  }
}

// Simulando una llamada a API - crear nueva orden
export async function createOrden(orden: Omit<KitchenOrder, 'id'>): Promise<KitchenOrder | null> {
  try {
    const filePath = path.join(process.cwd(), "data", "kitchen-orders.json")
    const orders = await getOrdenes()
    
    const newOrder: KitchenOrder = {
      ...orden,
      id: `order_${Date.now()}` // Generación simple de ID
    }
    
    orders.push(newOrder)
    
    await fs.writeFile(filePath, JSON.stringify(orders, null, 2), "utf-8")
    return newOrder
  } catch (error) {
    console.error("Error creating kitchen order:", error)
    return null
  }
}

// Simulando una llamada a API - eliminar orden
export async function deleteOrden(id: string): Promise<boolean> {
  try {
    const filePath = path.join(process.cwd(), "data", "kitchen-orders.json")
    const orders = await getOrdenes()
    
    const filteredOrders = orders.filter(order => order.id !== id)
    
    if (filteredOrders.length === orders.length) return false // No se encontró la orden
    
    await fs.writeFile(filePath, JSON.stringify(filteredOrders, null, 2), "utf-8")
    return true
  } catch (error) {
    console.error("Error deleting kitchen order:", error)
    return false
  }
}
