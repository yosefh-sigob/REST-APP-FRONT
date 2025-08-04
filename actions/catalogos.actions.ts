"use server"

import { revalidatePath } from "next/cache"
import type { Grupo } from "@/interfaces/grupos.interface"
import type { Subgrupo } from "@/interfaces/subgrupos.interface"
import type { Unidad } from "@/interfaces/unidad.interface"
import type { AreaProduccion } from "@/interfaces/areaProduccion.interface"
import type {
  GrupoFormValues,
  SubgrupoFormValues,
  UnidadFormValues,
  AreaProduccionFormValues,
} from "@/schemas/catalogos.schemas"
import gruposData from "@/data/grupos.json"
import subgruposData from "@/data/subgrupos.json"
import unidadesData from "@/data/unidades.json"
import areasProduccionData from "@/data/areas-produccion.json"

// Simulación de base de datos en memoria
const grupos: Grupo[] = gruposData as Grupo[]
const subgrupos: Subgrupo[] = subgruposData as Subgrupo[]
const unidades: Unidad[] = unidadesData as Unidad[]
const areasProduccion: AreaProduccion[] = areasProduccionData as AreaProduccion[]

// Función para generar IDs únicos
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// ============= GRUPOS =============

export async function getGrupos(): Promise<Grupo[]> {
  return grupos
}

export async function createGrupo(data: GrupoFormValues) {
  try {
    // Verificar si ya existe un grupo con el mismo nombre
    const existingGrupo = grupos.find((g) => g.nombre.toLowerCase() === data.nombre.toLowerCase())
    if (existingGrupo) {
      return { success: false, message: "Ya existe un grupo con ese nombre" }
    }

    const newGrupo: Grupo = {
      id: generateId(),
      nombre: data.nombre,
      descripcion: data.descripcion,
      area_produccion_id: "AREA-001", // Default area
      activo: data.activo,
      fecha_creacion: new Date().toISOString(),
      fecha_actualizacion: new Date().toISOString(),
    }

    grupos.push(newGrupo)
    revalidatePath("/catalogos/grupos")
    return { success: true, message: "Grupo creado exitosamente" }
  } catch (error) {
    return { success: false, message: "Error al crear el grupo" }
  }
}

export async function updateGrupo(id: string, data: GrupoFormValues) {
  try {
    const index = grupos.findIndex((g) => g.id === id)
    if (index === -1) {
      return { success: false, message: "Grupo no encontrado" }
    }

    // Verificar si ya existe otro grupo con el mismo nombre
    const existingGrupo = grupos.find((g) => g.id !== id && g.nombre.toLowerCase() === data.nombre.toLowerCase())
    if (existingGrupo) {
      return { success: false, message: "Ya existe un grupo con ese nombre" }
    }

    grupos[index] = {
      ...grupos[index],
      nombre: data.nombre,
      descripcion: data.descripcion,
      activo: data.activo,
      fecha_actualizacion: new Date().toISOString(),
    }

    revalidatePath("/catalogos/grupos")
    return { success: true, message: "Grupo actualizado exitosamente" }
  } catch (error) {
    return { success: false, message: "Error al actualizar el grupo" }
  }
}

export async function deleteGrupo(id: string) {
  try {
    const index = grupos.findIndex((g) => g.id === id)
    if (index === -1) {
      return { success: false, message: "Grupo no encontrado" }
    }

    grupos.splice(index, 1)
    revalidatePath("/catalogos/grupos")
    return { success: true, message: "Grupo eliminado exitosamente" }
  } catch (error) {
    return { success: false, message: "Error al eliminar el grupo" }
  }
}

// ============= SUBGRUPOS =============

export async function getSubgrupos(): Promise<Subgrupo[]> {
  return subgrupos
}

export async function createSubgrupo(data: SubgrupoFormValues) {
  try {
    const existingSubgrupo = subgrupos.find((s) => s.nombre.toLowerCase() === data.nombre.toLowerCase())
    if (existingSubgrupo) {
      return { success: false, message: "Ya existe un subgrupo con ese nombre" }
    }

    const newSubgrupo: Subgrupo = {
      id: generateId(),
      nombre: data.nombre,
      descripcion: data.descripcion,
      grupo_id: data.grupo_id,
      activo: data.activo,
      fecha_creacion: new Date().toISOString(),
      fecha_actualizacion: new Date().toISOString(),
    }

    subgrupos.push(newSubgrupo)
    revalidatePath("/catalogos/subgrupos")
    return { success: true, message: "Subgrupo creado exitosamente" }
  } catch (error) {
    return { success: false, message: "Error al crear el subgrupo" }
  }
}

export async function updateSubgrupo(id: string, data: SubgrupoFormValues) {
  try {
    const index = subgrupos.findIndex((s) => s.id === id)
    if (index === -1) {
      return { success: false, message: "Subgrupo no encontrado" }
    }

    const existingSubgrupo = subgrupos.find((s) => s.id !== id && s.nombre.toLowerCase() === data.nombre.toLowerCase())
    if (existingSubgrupo) {
      return { success: false, message: "Ya existe un subgrupo con ese nombre" }
    }

    subgrupos[index] = {
      ...subgrupos[index],
      nombre: data.nombre,
      descripcion: data.descripcion,
      grupo_id: data.grupo_id,
      activo: data.activo,
      fecha_actualizacion: new Date().toISOString(),
    }

    revalidatePath("/catalogos/subgrupos")
    return { success: true, message: "Subgrupo actualizado exitosamente" }
  } catch (error) {
    return { success: false, message: "Error al actualizar el subgrupo" }
  }
}

export async function deleteSubgrupo(id: string) {
  try {
    const index = subgrupos.findIndex((s) => s.id === id)
    if (index === -1) {
      return { success: false, message: "Subgrupo no encontrado" }
    }

    subgrupos.splice(index, 1)
    revalidatePath("/catalogos/subgrupos")
    return { success: true, message: "Subgrupo eliminado exitosamente" }
  } catch (error) {
    return { success: false, message: "Error al eliminar el subgrupo" }
  }
}

// ============= UNIDADES =============

export async function getUnidades(): Promise<Unidad[]> {
  return unidades
}

export async function createUnidad(data: UnidadFormValues) {
  try {
    const existingUnidad = unidades.find((u) => u.clave.toLowerCase() === data.clave.toLowerCase())
    if (existingUnidad) {
      return { success: false, message: "Ya existe una unidad con esa clave" }
    }

    const newUnidad: Unidad = {
      id: generateId(),
      clave: data.clave.toUpperCase(),
      nombre: data.nombre,
      abreviacion: data.abreviacion,
      descripcion: data.descripcion,
      activo: data.activo,
      fecha_creacion: new Date().toISOString(),
      fecha_actualizacion: new Date().toISOString(),
    }

    unidades.push(newUnidad)
    revalidatePath("/catalogos/unidades")
    return { success: true, message: "Unidad creada exitosamente" }
  } catch (error) {
    return { success: false, message: "Error al crear la unidad" }
  }
}

export async function updateUnidad(id: string, data: UnidadFormValues) {
  try {
    const index = unidades.findIndex((u) => u.id === id)
    if (index === -1) {
      return { success: false, message: "Unidad no encontrada" }
    }

    const existingUnidad = unidades.find((u) => u.id !== id && u.clave.toLowerCase() === data.clave.toLowerCase())
    if (existingUnidad) {
      return { success: false, message: "Ya existe una unidad con esa clave" }
    }

    unidades[index] = {
      ...unidades[index],
      clave: data.clave.toUpperCase(),
      nombre: data.nombre,
      abreviacion: data.abreviacion,
      descripcion: data.descripcion,
      activo: data.activo,
      fecha_actualizacion: new Date().toISOString(),
    }

    revalidatePath("/catalogos/unidades")
    return { success: true, message: "Unidad actualizada exitosamente" }
  } catch (error) {
    return { success: false, message: "Error al actualizar la unidad" }
  }
}

export async function deleteUnidad(id: string) {
  try {
    const index = unidades.findIndex((u) => u.id === id)
    if (index === -1) {
      return { success: false, message: "Unidad no encontrada" }
    }

    unidades.splice(index, 1)
    revalidatePath("/catalogos/unidades")
    return { success: true, message: "Unidad eliminada exitosamente" }
  } catch (error) {
    return { success: false, message: "Error al eliminar la unidad" }
  }
}

// ============= ÁREAS DE PRODUCCIÓN =============

export async function getAreasProduccion(): Promise<AreaProduccion[]> {
  return areasProduccion
}

export async function createAreaProduccion(data: AreaProduccionFormValues) {
  try {
    const existingArea = areasProduccion.find((a) => a.clave.toLowerCase() === data.clave.toLowerCase())
    if (existingArea) {
      return { success: false, message: "Ya existe un área con esa clave" }
    }

    const newArea: AreaProduccion = {
      id: generateId(),
      clave: data.clave.toUpperCase(),
      descripcion: data.descripcion,
      impresora: data.impresora || null,
      activo: data.activo,
      fecha_creacion: new Date().toISOString(),
      fecha_actualizacion: new Date().toISOString(),
    }

    areasProduccion.push(newArea)
    revalidatePath("/catalogos/areas-produccion")
    return { success: true, message: "Área de producción creada exitosamente" }
  } catch (error) {
    return { success: false, message: "Error al crear el área de producción" }
  }
}

export async function updateAreaProduccion(id: string, data: AreaProduccionFormValues) {
  try {
    const index = areasProduccion.findIndex((a) => a.id === id)
    if (index === -1) {
      return { success: false, message: "Área de producción no encontrada" }
    }

    const existingArea = areasProduccion.find((a) => a.id !== id && a.clave.toLowerCase() === data.clave.toLowerCase())
    if (existingArea) {
      return { success: false, message: "Ya existe un área con esa clave" }
    }

    areasProduccion[index] = {
      ...areasProduccion[index],
      clave: data.clave.toUpperCase(),
      descripcion: data.descripcion,
      impresora: data.impresora || null,
      activo: data.activo,
      fecha_actualizacion: new Date().toISOString(),
    }

    revalidatePath("/catalogos/areas-produccion")
    return { success: true, message: "Área de producción actualizada exitosamente" }
  } catch (error) {
    return { success: false, message: "Error al actualizar el área de producción" }
  }
}

export async function deleteAreaProduccion(id: string) {
  try {
    const index = areasProduccion.findIndex((a) => a.id === id)
    if (index === -1) {
      return { success: false, message: "Área de producción no encontrada" }
    }

    areasProduccion.splice(index, 1)
    revalidatePath("/catalogos/areas-produccion")
    return { success: true, message: "Área de producción eliminada exitosamente" }
  } catch (error) {
    return { success: false, message: "Error al eliminar el área de producción" }
  }
}
