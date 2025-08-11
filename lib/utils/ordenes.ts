import type { KitchenOrder } from "@/interfaces/ordenes.interface"

const API_BASE_URL = process.env.API_URL || process.env.API_URL_LOCAL || "http://localhost:3001"

export async function getOrdenesFromFile(): Promise<KitchenOrder[]> {
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
    // En un entorno de producción, podrías querer manejar esto de forma más robusta
    return []
  }
}
