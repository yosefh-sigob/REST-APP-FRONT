"use server"

import type { KitchenOrder } from "@/interfaces/ordenes.interface"
import { promises as fs } from "fs"
import path from "path"

export async function getOrdenes(): Promise<KitchenOrder[]> {
  try {
    // Construye la ruta absoluta al archivo JSON
    const filePath = path.join(process.cwd(), "data", "kitchen-orders.json")
    const fileContents = await fs.readFile(filePath, "utf-8")

    const orders: KitchenOrder[] = JSON.parse(fileContents)
    return orders
  } catch (error) {
    console.error("Error fetching kitchen orders:", error)
    // En un entorno de producción, podrías querer manejar esto de forma más robusta
    return []
  }
}
