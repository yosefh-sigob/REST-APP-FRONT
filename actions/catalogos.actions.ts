"use server"

import fs from "fs/promises"
import path from "path"
import { revalidatePath } from "next/cache"
import type { Grupo } from "@/interfaces/grupos.interface"
import { type GrupoFormValues, grupoSchema } from "@/schemas/catalogos.schemas"
import { generateULID } from "@/lib/utils/ulid"

const gruposFilePath = path.join(process.cwd(), "data/grupos.json")

async function getGruposData(): Promise<Grupo[]> {
  try {
    const data = await fs.readFile(gruposFilePath, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    // Si el archivo no existe, devolver un array vacío
    return []
  }
}

async function saveGruposData(data: Grupo[]): Promise<void> {
  await fs.writeFile(gruposFilePath, JSON.stringify(data, null, 2))
}

export async function getGrupos(): Promise<Grupo[]> {
  return await getGruposData()
}

export async function createGrupo(data: GrupoFormValues): Promise<{ success: boolean; message: string }> {
  const validation = grupoSchema.safeParse(data)
  if (!validation.success) {
    return { success: false, message: "Error de validación." }
  }

  const grupos = await getGruposData()
  const newGrupo: Grupo = {
    id: `GRP-${generateULID()}`,
    ...validation.data,
    descripcion: validation.data.descripcion || "",
  }

  grupos.push(newGrupo)
  await saveGruposData(grupos)

  revalidatePath("/catalogos/grupos")
  return { success: true, message: "Grupo creado exitosamente." }
}

export async function updateGrupo(id: string, data: GrupoFormValues): Promise<{ success: boolean; message: string }> {
  const validation = grupoSchema.safeParse(data)
  if (!validation.success) {
    return { success: false, message: "Error de validación." }
  }

  const grupos = await getGruposData()
  const index = grupos.findIndex((g) => g.id === id)

  if (index === -1) {
    return { success: false, message: "Grupo no encontrado." }
  }

  grupos[index] = { ...grupos[index], ...validation.data }
  await saveGruposData(grupos)

  revalidatePath("/catalogos/grupos")
  return { success: true, message: "Grupo actualizado exitosamente." }
}

export async function deleteGrupo(id: string): Promise<{ success: boolean; message: string }> {
  const grupos = await getGruposData()
  const updatedGrupos = grupos.filter((g) => g.id !== id)

  if (grupos.length === updatedGrupos.length) {
    return { success: false, message: "Grupo no encontrado." }
  }

  await saveGruposData(updatedGrupos)

  revalidatePath("/catalogos/grupos")
  return { success: true, message: "Grupo eliminado exitosamente." }
}
