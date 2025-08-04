"use server"

import { revalidatePath } from "next/cache"
import type { Grupo } from "@/interfaces/grupos.interface"
import type { Subgrupo } from "@/interfaces/subgrupos.interface"
import { type GrupoFormValues, grupoSchema, type SubgrupoFormValues, subgrupoSchema } from "@/schemas/catalogos.schemas"
import { generateULID } from "@/lib/utils/ulid"
import initialGrupos from "@/data/grupos.json"
import initialSubgrupos from "@/data/subgrupos.json"

// --- Simulación de Base de Datos en Memoria ---
let grupos: Grupo[] = [...initialGrupos]
let subgrupos: Subgrupo[] = [...initialSubgrupos]

// --- Acciones para Grupos ---

export async function getGrupos(): Promise<Grupo[]> {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return JSON.parse(JSON.stringify(grupos))
}

export async function createGrupo(data: GrupoFormValues): Promise<{ success: boolean; message: string }> {
  const validation = grupoSchema.safeParse(data)
  if (!validation.success) {
    const errorMessages = validation.error.issues.map((issue) => issue.message).join(", ")
    return { success: false, message: `Error de validación: ${errorMessages}` }
  }

  const newGrupo: Grupo = {
    id: `GRP-${generateULID()}`,
    ...validation.data,
    descripcion: validation.data.descripcion || "",
  }

  grupos.push(newGrupo)
  revalidatePath("/catalogos/grupos")
  return { success: true, message: "Grupo creado exitosamente." }
}

export async function updateGrupo(id: string, data: GrupoFormValues): Promise<{ success: boolean; message: string }> {
  const validation = grupoSchema.safeParse(data)
  if (!validation.success) {
    const errorMessages = validation.error.issues.map((issue) => issue.message).join(", ")
    return { success: false, message: `Error de validación: ${errorMessages}` }
  }

  const index = grupos.findIndex((g) => g.id === id)
  if (index === -1) return { success: false, message: "Grupo no encontrado." }

  grupos[index] = { ...grupos[index], ...validation.data }
  revalidatePath("/catalogos/grupos")
  return { success: true, message: "Grupo actualizado exitosamente." }
}

export async function deleteGrupo(id: string): Promise<{ success: boolean; message: string }> {
  const initialLength = grupos.length
  grupos = grupos.filter((g) => g.id !== id)
  if (grupos.length === initialLength) return { success: false, message: "Grupo no encontrado." }

  revalidatePath("/catalogos/grupos")
  return { success: true, message: "Grupo eliminado exitosamente." }
}

// --- Acciones para Subgrupos ---

export async function getSubgrupos(): Promise<Subgrupo[]> {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return JSON.parse(JSON.stringify(subgrupos))
}

export async function createSubgrupo(data: SubgrupoFormValues): Promise<{ success: boolean; message: string }> {
  const validation = subgrupoSchema.safeParse(data)
  if (!validation.success) {
    const errorMessages = validation.error.issues.map((issue) => issue.message).join(", ")
    return { success: false, message: `Error de validación: ${errorMessages}` }
  }

  const newSubgrupo: Subgrupo = {
    id: `SUB-${generateULID()}`,
    ...validation.data,
    descripcion: validation.data.descripcion || "",
  }

  subgrupos.push(newSubgrupo)
  revalidatePath("/catalogos/subgrupos")
  return { success: true, message: "Subgrupo creado exitosamente." }
}

export async function updateSubgrupo(
  id: string,
  data: SubgrupoFormValues,
): Promise<{ success: boolean; message: string }> {
  const validation = subgrupoSchema.safeParse(data)
  if (!validation.success) {
    const errorMessages = validation.error.issues.map((issue) => issue.message).join(", ")
    return { success: false, message: `Error de validación: ${errorMessages}` }
  }

  const index = subgrupos.findIndex((s) => s.id === id)
  if (index === -1) return { success: false, message: "Subgrupo no encontrado." }

  subgrupos[index] = { ...subgrupos[index], ...validation.data }
  revalidatePath("/catalogos/subgrupos")
  return { success: true, message: "Subgrupo actualizado exitosamente." }
}

export async function deleteSubgrupo(id: string): Promise<{ success: boolean; message: string }> {
  const initialLength = subgrupos.length
  subgrupos = subgrupos.filter((s) => s.id !== id)
  if (subgrupos.length === initialLength) return { success: false, message: "Subgrupo no encontrado." }

  revalidatePath("/catalogos/subgrupos")
  return { success: true, message: "Subgrupo eliminado exitosamente." }
}
