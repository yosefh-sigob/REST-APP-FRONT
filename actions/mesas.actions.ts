"use server"

import { db } from "@/lib/database/connection"
import { mesas } from "@/lib/database/schema"
import { eq, and } from "drizzle-orm"
import { mesaSchema } from "@/schemas/database.schemas"
import { generateULID } from "@/utils/ulid"
import type { Mesa } from "@/interfaces/database"

export async function crearMesa(data: unknown): Promise<{ success: boolean; data?: Mesa; error?: string }> {
  try {
    const validatedData = mesaSchema.parse(data)

    const mesaData = {
      MesaULID: generateULID(),
      ...validatedData,
      Fecha_UltimoCambio: new Date(),
      Fecha_Sync: new Date(),
    }

    const [nuevaMesa] = await db.insert(mesas).values(mesaData).returning()

    return { success: true, data: nuevaMesa }
  } catch (error) {
    console.error("Error al crear mesa:", error)
    return { success: false, error: "Error al crear la mesa" }
  }
}

export async function obtenerMesasPorEmpresa(
  empresaId: string,
): Promise<{ success: boolean; data?: Mesa[]; error?: string }> {
  try {
    const mesasEmpresa = await db.select().from(mesas).where(eq(mesas.EmpresaULID, empresaId))
    return { success: true, data: mesasEmpresa }
  } catch (error) {
    console.error("Error al obtener mesas:", error)
    return { success: false, error: "Error al obtener las mesas" }
  }
}

export async function obtenerMesasPorArea(
  empresaId: string,
  areaId: number,
): Promise<{ success: boolean; data?: Mesa[]; error?: string }> {
  try {
    const mesasArea = await db
      .select()
      .from(mesas)
      .where(and(eq(mesas.EmpresaULID, empresaId), eq(mesas.AreaVentasULID, areaId)))

    return { success: true, data: mesasArea }
  } catch (error) {
    console.error("Error al obtener mesas por área:", error)
    return { success: false, error: "Error al obtener mesas por área" }
  }
}

export async function actualizarMesa(
  id: string,
  data: unknown,
): Promise<{ success: boolean; data?: Mesa; error?: string }> {
  try {
    const validatedData = mesaSchema.partial().parse(data)

    const [mesaActualizada] = await db
      .update(mesas)
      .set({ ...validatedData, Fecha_UltimoCambio: new Date() })
      .where(eq(mesas.MesaULID, id))
      .returning()

    if (!mesaActualizada) {
      return { success: false, error: "Mesa no encontrada" }
    }

    return { success: true, data: mesaActualizada }
  } catch (error) {
    console.error("Error al actualizar mesa:", error)
    return { success: false, error: "Error al actualizar la mesa" }
  }
}

export async function eliminarMesa(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const resultado = await db.delete(mesas).where(eq(mesas.MesaULID, id))

    if (resultado.rowCount === 0) {
      return { success: false, error: "Mesa no encontrada" }
    }

    return { success: true }
  } catch (error) {
    console.error("Error al eliminar mesa:", error)
    return { success: false, error: "Error al eliminar la mesa" }
  }
}
