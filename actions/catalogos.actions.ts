"use server"

import { revalidatePath } from "next/cache"
import type { Grupo } from "@/interfaces/grupos.interface"
import type { Subgrupo } from "@/interfaces/subgrupos.interface"
import type { IGetUnidad } from "@/interfaces/unidad.interface"
import type { IGetAreaProduccion } from "@/interfaces/areaProduccion.interface"
import {
  type GrupoFormValues,
  grupoSchema,
  type SubgrupoFormValues,
  subgrupoSchema,
  type UnidadFormValues,
  unidadSchema,
  type AreaProduccionFormValues,
  areaProduccionSchema,
} from "@/schemas/catalogos.schemas"
import { generateULID } from "@/lib/utils/ulid"
import initialGrupos from "@/data/grupos.json"
import initialSubgrupos from "@/data/subgrupos.json"
import initialUnidades from "@/data/unidades.json"
import initialAreasProduccion from "@/data/areas-produccion.json"

// --- Simulación de Base de Datos en Memoria ---
let grupos: Grupo[] = [...initialGrupos]
let subgrupos: Subgrupo[] = [...initialSubgrupos]
let unidades: IGetUnidad[] = [...initialUnidades]
let areasProduccion: IGetAreaProduccion[] = [...initialAreasProduccion]

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

// --- Acciones para Unidades de Medida ---

export async function getUnidades(): Promise<IGetUnidad[]> {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return JSON.parse(JSON.stringify(unidades))
}

export async function createUnidad(data: UnidadFormValues): Promise<{ success: boolean; message: string }> {
  const validation = unidadSchema.safeParse(data)
  if (!validation.success) {
    const errorMessages = validation.error.issues.map((issue) => issue.message).join(", ")
    return { success: false, message: `Error de validación: ${errorMessages}` }
  }

  // Verificar que la clave no exista
  const existingUnidad = unidades.find((u) => u.clave === validation.data.clave)
  if (existingUnidad) {
    return { success: false, message: "Ya existe una unidad con esa clave." }
  }

  const newUnidad: IGetUnidad = {
    id: `UNI-${generateULID()}`,
    clave: validation.data.clave,
    nombre: validation.data.nombre,
    abreviacion: validation.data.abreviacion,
    descripcion: validation.data.descripcion || "",
    activo: validation.data.activo,
  }

  unidades.push(newUnidad)
  revalidatePath("/catalogos/unidades")
  return { success: true, message: "Unidad creada exitosamente." }
}

export async function updateUnidad(id: string, data: UnidadFormValues): Promise<{ success: boolean; message: string }> {
  const validation = unidadSchema.safeParse(data)
  if (!validation.success) {
    const errorMessages = validation.error.issues.map((issue) => issue.message).join(", ")
    return { success: false, message: `Error de validación: ${errorMessages}` }
  }

  const index = unidades.findIndex((u) => u.id === id)
  if (index === -1) return { success: false, message: "Unidad no encontrada." }

  // Verificar que la clave no exista en otra unidad
  const existingUnidad = unidades.find((u) => u.clave === validation.data.clave && u.id !== id)
  if (existingUnidad) {
    return { success: false, message: "Ya existe otra unidad con esa clave." }
  }

  unidades[index] = {
    ...unidades[index],
    clave: validation.data.clave,
    nombre: validation.data.nombre,
    abreviacion: validation.data.abreviacion,
    descripcion: validation.data.descripcion || "",
    activo: validation.data.activo,
  }

  revalidatePath("/catalogos/unidades")
  return { success: true, message: "Unidad actualizada exitosamente." }
}

export async function deleteUnidad(id: string): Promise<{ success: boolean; message: string }> {
  const initialLength = unidades.length
  unidades = unidades.filter((u) => u.id !== id)
  if (unidades.length === initialLength) return { success: false, message: "Unidad no encontrada." }

  revalidatePath("/catalogos/unidades")
  return { success: true, message: "Unidad eliminada exitosamente." }
}

// --- Acciones para Áreas de Producción ---

export async function getAreasProduccion(): Promise<IGetAreaProduccion[]> {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return JSON.parse(JSON.stringify(areasProduccion))
}

export async function createAreaProduccion(
  data: AreaProduccionFormValues,
): Promise<{ success: boolean; message: string }> {
  const validation = areaProduccionSchema.safeParse(data)
  if (!validation.success) {
    const errorMessages = validation.error.issues.map((issue) => issue.message).join(", ")
    return { success: false, message: `Error de validación: ${errorMessages}` }
  }

  // Verificar que la clave no exista
  const existingArea = areasProduccion.find((a) => a.clave === validation.data.clave)
  if (existingArea) {
    return { success: false, message: "Ya existe un área de producción con esa clave." }
  }

  const newArea: IGetAreaProduccion = {
    id: `AREA-${generateULID()}`,
    clave: validation.data.clave,
    descripcion: validation.data.descripcion,
    impresora: validation.data.impresora || "",
    activa: validation.data.activa,
  }

  areasProduccion.push(newArea)
  revalidatePath("/catalogos/areas-produccion")
  return { success: true, message: "Área de producción creada exitosamente." }
}

export async function updateAreaProduccion(
  id: string,
  data: AreaProduccionFormValues,
): Promise<{ success: boolean; message: string }> {
  const validation = areaProduccionSchema.safeParse(data)
  if (!validation.success) {
    const errorMessages = validation.error.issues.map((issue) => issue.message).join(", ")
    return { success: false, message: `Error de validación: ${errorMessages}` }
  }

  const index = areasProduccion.findIndex((a) => a.id === id)
  if (index === -1) return { success: false, message: "Área de producción no encontrada." }

  // Verificar que la clave no exista en otra área
  const existingArea = areasProduccion.find((a) => a.clave === validation.data.clave && a.id !== id)
  if (existingArea) {
    return { success: false, message: "Ya existe otra área de producción con esa clave." }
  }

  areasProduccion[index] = {
    ...areasProduccion[index],
    clave: validation.data.clave,
    descripcion: validation.data.descripcion,
    impresora: validation.data.impresora || "",
    activa: validation.data.activa,
  }

  revalidatePath("/catalogos/areas-produccion")
  return { success: true, message: "Área de producción actualizada exitosamente." }
}

export async function deleteAreaProduccion(id: string): Promise<{ success: boolean; message: string }> {
  const initialLength = areasProduccion.length
  areasProduccion = areasProduccion.filter((a) => a.id !== id)
  if (areasProduccion.length === initialLength) return { success: false, message: "Área de producción no encontrada." }

  revalidatePath("/catalogos/areas-produccion")
  return { success: true, message: "Área de producción eliminada exitosamente." }
}
