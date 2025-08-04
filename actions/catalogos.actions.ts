"use server"

import { revalidatePath } from "next/cache"
import type { Grupo } from "@/interfaces/grupos.interface"
import { type GrupoFormValues, grupoSchema } from "@/schemas/catalogos.schemas"
import { generateULID } from "@/lib/utils/ulid"
import initialGrupos from "@/data/grupos.json"

// Simula una base de datos en memoria
let grupos: Grupo[] = [...initialGrupos]

export async function getGrupos(): Promise<Grupo[]> {
  // Simula una operación asíncrona
  await new Promise((resolve) => setTimeout(resolve, 50))
  return JSON.parse(JSON.stringify(grupos)) // Devuelve una copia profunda para evitar mutaciones
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

  if (index === -1) {
    return { success: false, message: "Grupo no encontrado." }
  }

  grupos[index] = { ...grupos[index], ...validation.data }

  revalidatePath("/catalogos/grupos")
  return { success: true, message: "Grupo actualizado exitosamente." }
}

export async function deleteGrupo(id: string): Promise<{ success: boolean; message: string }> {
  const initialLength = grupos.length
  grupos = grupos.filter((g) => g.id !== id)

  if (grupos.length === initialLength) {
    return { success: false, message: "Grupo no encontrado." }
  }

  revalidatePath("/catalogos/grupos")
  return { success: true, message: "Grupo eliminado exitosamente." }
}
