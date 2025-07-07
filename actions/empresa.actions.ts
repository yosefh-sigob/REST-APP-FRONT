"use server"

import { db } from "@/lib/database/connection"
import { empresa } from "@/lib/database/schema"
import { eq } from "drizzle-orm"
import { empresaSchema } from "@/schemas/database.schemas"
import { generateULID } from "@/utils/ulid"
import type { Empresa } from "@/interfaces/database"

export async function crearEmpresa(data: unknown): Promise<{ success: boolean; data?: Empresa; error?: string }> {
  try {
    const validatedData = empresaSchema.parse(data)

    const empresaData = {
      EmpresaULID: generateULID(),
      ...validatedData,
      FechaRegistro: new Date(),
      Fecha_UltimoCambio: new Date(),
    }

    const [nuevaEmpresa] = await db.insert(empresa).values(empresaData).returning()

    return { success: true, data: nuevaEmpresa }
  } catch (error) {
    console.error("Error al crear empresa:", error)
    return { success: false, error: "Error al crear la empresa" }
  }
}

export async function obtenerEmpresaPorId(id: string): Promise<{ success: boolean; data?: Empresa; error?: string }> {
  try {
    const [empresaEncontrada] = await db.select().from(empresa).where(eq(empresa.EmpresaULID, id)).limit(1)

    if (!empresaEncontrada) {
      return { success: false, error: "Empresa no encontrada" }
    }

    return { success: true, data: empresaEncontrada }
  } catch (error) {
    console.error("Error al obtener empresa:", error)
    return { success: false, error: "Error al obtener la empresa" }
  }
}

export async function obtenerTodasLasEmpresas(): Promise<{ success: boolean; data?: Empresa[]; error?: string }> {
  try {
    const empresas = await db.select().from(empresa)
    return { success: true, data: empresas }
  } catch (error) {
    console.error("Error al obtener empresas:", error)
    return { success: false, error: "Error al obtener las empresas" }
  }
}

export async function actualizarEmpresa(
  id: string,
  data: unknown,
): Promise<{ success: boolean; data?: Empresa; error?: string }> {
  try {
    const validatedData = empresaSchema.partial().parse(data)

    const [empresaActualizada] = await db
      .update(empresa)
      .set({ ...validatedData, Fecha_UltimoCambio: new Date() })
      .where(eq(empresa.EmpresaULID, id))
      .returning()

    if (!empresaActualizada) {
      return { success: false, error: "Empresa no encontrada" }
    }

    return { success: true, data: empresaActualizada }
  } catch (error) {
    console.error("Error al actualizar empresa:", error)
    return { success: false, error: "Error al actualizar la empresa" }
  }
}

export async function eliminarEmpresa(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const resultado = await db.delete(empresa).where(eq(empresa.EmpresaULID, id))

    if (resultado.rowCount === 0) {
      return { success: false, error: "Empresa no encontrada" }
    }

    return { success: true }
  } catch (error) {
    console.error("Error al eliminar empresa:", error)
    return { success: false, error: "Error al eliminar la empresa" }
  }
}
