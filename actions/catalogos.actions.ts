"use server"

import { revalidatePath } from "next/cache"
import type { Grupo } from "@/interfaces/grupos.interface"
import type { Subgrupo } from "@/interfaces/subgrupos.interface"
import type { IGetUnidad } from "@/interfaces/unidad.interface"
import type { IGetAreaProduccion } from "@/interfaces/areaProduccion.interface"
import type { IGetAlmacen } from "@/interfaces/almacen.interface"
import type { ITipoCliente } from "@/interfaces/tipos-cliente.interface"
import type { IMetodoPago } from "@/interfaces/metodos-pago.interface"
import {
  type GrupoFormValues,
  grupoSchema,
  type SubgrupoFormValues,
  subgrupoSchema,
  type UnidadFormValues,
  unidadSchema,
  type AreaProduccionFormValues,
  areaProduccionSchema,
  type AlmacenFormValues,
  almacenSchema,
  type TipoClienteFormValues,
  tipoClienteSchema,
  type MetodoPagoFormValues,
  metodoPagoSchema,
} from "@/schemas/catalogos.schemas"
import { generateULID } from "@/lib/utils/ulid"
import initialGrupos from "@/data/grupos.json"
import initialSubgrupos from "@/data/subgrupos.json"
import initialUnidades from "@/data/unidades.json"
import initialAreasProduccion from "@/data/areas-produccion.json"
import initialAlmacenes from "@/data/almacenes.json"
import initialTiposCliente from "@/data/tipos-cliente.json"
import initialMetodosPago from "@/data/metodos-pago.json"

// --- Simulación de Base de Datos en Memoria ---
let grupos: Grupo[] = [...initialGrupos]
let subgrupos: Subgrupo[] = [...initialSubgrupos]
let unidades: IGetUnidad[] = [...initialUnidades]
let areasProduccion: IGetAreaProduccion[] = [...initialAreasProduccion]
let almacenes: IGetAlmacen[] = [...initialAlmacenes]
let tiposCliente: ITipoCliente[] = [...initialTiposCliente]
let metodosPago: IMetodoPago[] = [...initialMetodosPago]

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

// --- Acciones para Almacenes ---

export async function getAlmacenes(): Promise<IGetAlmacen[]> {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return JSON.parse(JSON.stringify(almacenes))
}

export async function createAlmacen(data: AlmacenFormValues): Promise<{ success: boolean; message: string }> {
  const validation = almacenSchema.safeParse(data)
  if (!validation.success) {
    const errorMessages = validation.error.issues.map((issue) => issue.message).join(", ")
    return { success: false, message: `Error de validación: ${errorMessages}` }
  }

  const existingAlmacen = almacenes.find(
    (a) => a.ClaveAlmacen.toUpperCase() === validation.data.ClaveAlmacen.toUpperCase(),
  )
  if (existingAlmacen) {
    return { success: false, message: "Ya existe un almacén con esa clave." }
  }

  const newAlmacen: IGetAlmacen = {
    AlmacenULID: `ALM-${generateULID()}`,
    ClaveAlmacen: validation.data.ClaveAlmacen.toUpperCase(),
    Nombre: validation.data.Nombre,
    Descripcion: validation.data.Descripcion || "",
    Direccion: validation.data.Direccion || "",
    Activo: validation.data.Activo,
    Fecha_UltimoCambio: new Date().toISOString(),
    Fecha_Sync: new Date().toISOString(),
    UsuarioULID: "USER-001", // Placeholder
    EmpresaULID: "EMP-001", // Placeholder
  }

  almacenes.push(newAlmacen)
  revalidatePath("/catalogos/almacenes")
  return { success: true, message: "Almacén creado exitosamente." }
}

export async function updateAlmacen(
  id: string,
  data: AlmacenFormValues,
): Promise<{ success: boolean; message: string }> {
  const validation = almacenSchema.safeParse(data)
  if (!validation.success) {
    const errorMessages = validation.error.issues.map((issue) => issue.message).join(", ")
    return { success: false, message: `Error de validación: ${errorMessages}` }
  }

  const index = almacenes.findIndex((a) => a.AlmacenULID === id)
  if (index === -1) return { success: false, message: "Almacén no encontrado." }

  const existingAlmacen = almacenes.find(
    (a) => a.ClaveAlmacen.toUpperCase() === data.ClaveAlmacen.toUpperCase() && a.AlmacenULID !== id,
  )
  if (existingAlmacen) {
    return { success: false, message: "Ya existe otro almacén con esa clave." }
  }

  almacenes[index] = {
    ...almacenes[index],
    ClaveAlmacen: data.ClaveAlmacen.toUpperCase(),
    Nombre: data.Nombre,
    Descripcion: data.Descripcion || "",
    Direccion: data.Direccion || "",
    Activo: data.Activo,
    Fecha_UltimoCambio: new Date().toISOString(),
  }

  revalidatePath("/catalogos/almacenes")
  return { success: true, message: "Almacén actualizado exitosamente." }
}

export async function deleteAlmacen(id: string): Promise<{ success: boolean; message: string }> {
  const initialLength = almacenes.length
  almacenes = almacenes.filter((a) => a.AlmacenULID !== id)
  if (almacenes.length === initialLength) return { success: false, message: "Almacén no encontrado." }

  revalidatePath("/catalogos/almacenes")
  return { success: true, message: "Almacén eliminado exitosamente." }
}

// --- Acciones para Tipos de Cliente ---

export async function getTiposCliente(): Promise<ITipoCliente[]> {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return JSON.parse(JSON.stringify(tiposCliente))
}

export async function createTipoCliente(data: TipoClienteFormValues): Promise<{ success: boolean; message: string }> {
  const validation = tipoClienteSchema.safeParse(data)
  if (!validation.success) {
    const errorMessages = validation.error.issues.map((issue) => issue.message).join(", ")
    return { success: false, message: `Error de validación: ${errorMessages}` }
  }

  const existingTipo = tiposCliente.find((t) => t.nombre.toUpperCase() === validation.data.nombre.toUpperCase())
  if (existingTipo) {
    return { success: false, message: "Ya existe un tipo de cliente con ese nombre." }
  }

  const newTipoCliente: ITipoCliente = {
    id: `TC-${generateULID()}`,
    nombre: validation.data.nombre,
    descripcion: validation.data.descripcion || "",
    activo: validation.data.activo,
  }

  tiposCliente.push(newTipoCliente)
  revalidatePath("/catalogos/tipos-cliente")
  return { success: true, message: "Tipo de cliente creado exitosamente." }
}

export async function updateTipoCliente(
  id: string,
  data: TipoClienteFormValues,
): Promise<{ success: boolean; message: string }> {
  const validation = tipoClienteSchema.safeParse(data)
  if (!validation.success) {
    const errorMessages = validation.error.issues.map((issue) => issue.message).join(", ")
    return { success: false, message: `Error de validación: ${errorMessages}` }
  }

  const index = tiposCliente.findIndex((t) => t.id === id)
  if (index === -1) return { success: false, message: "Tipo de cliente no encontrado." }

  const existingTipo = tiposCliente.find((t) => t.nombre.toUpperCase() === data.nombre.toUpperCase() && t.id !== id)
  if (existingTipo) {
    return { success: false, message: "Ya existe otro tipo de cliente con ese nombre." }
  }

  tiposCliente[index] = {
    ...tiposCliente[index],
    nombre: data.nombre,
    descripcion: data.descripcion || "",
    activo: data.activo,
  }

  revalidatePath("/catalogos/tipos-cliente")
  return { success: true, message: "Tipo de cliente actualizado exitosamente." }
}

export async function deleteTipoCliente(id: string): Promise<{ success: boolean; message: string }> {
  const initialLength = tiposCliente.length
  tiposCliente = tiposCliente.filter((t) => t.id !== id)
  if (tiposCliente.length === initialLength) return { success: false, message: "Tipo de cliente no encontrado." }

  revalidatePath("/catalogos/tipos-cliente")
  return { success: true, message: "Tipo de cliente eliminado exitosamente." }
}

// --- Acciones para Métodos de Pago ---

export async function getMetodosPago(): Promise<IMetodoPago[]> {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return JSON.parse(JSON.stringify(metodosPago))
}

export async function createMetodoPago(data: MetodoPagoFormValues): Promise<{ success: boolean; message: string }> {
  const validation = metodoPagoSchema.safeParse(data)
  if (!validation.success) {
    const errorMessages = validation.error.issues.map((issue) => issue.message).join(", ")
    return { success: false, message: `Error de validación: ${errorMessages}` }
  }

  const existingMetodo = metodosPago.find((m) => m.nombre.toUpperCase() === validation.data.nombre.toUpperCase())
  if (existingMetodo) {
    return { success: false, message: "Ya existe un método de pago con ese nombre." }
  }

  const newMetodoPago: IMetodoPago = {
    id: `MP-${generateULID()}`,
    nombre: validation.data.nombre,
    descripcion: validation.data.descripcion || "",
    requiere_referencia: validation.data.requiere_referencia,
    activo: validation.data.activo,
  }

  metodosPago.push(newMetodoPago)
  revalidatePath("/catalogos/metodos-pago")
  return { success: true, message: "Método de pago creado exitosamente." }
}

export async function updateMetodoPago(
  id: string,
  data: MetodoPagoFormValues,
): Promise<{ success: boolean; message: string }> {
  const validation = metodoPagoSchema.safeParse(data)
  if (!validation.success) {
    const errorMessages = validation.error.issues.map((issue) => issue.message).join(", ")
    return { success: false, message: `Error de validación: ${errorMessages}` }
  }

  const index = metodosPago.findIndex((m) => m.id === id)
  if (index === -1) return { success: false, message: "Método de pago no encontrado." }

  const existingMetodo = metodosPago.find((m) => m.nombre.toUpperCase() === data.nombre.toUpperCase() && m.id !== id)
  if (existingMetodo) {
    return { success: false, message: "Ya existe otro método de pago con ese nombre." }
  }

  metodosPago[index] = {
    ...metodosPago[index],
    nombre: data.nombre,
    descripcion: data.descripcion || "",
    requiere_referencia: data.requiere_referencia,
    activo: data.activo,
  }

  revalidatePath("/catalogos/metodos-pago")
  return { success: true, message: "Método de pago actualizado exitosamente." }
}

export async function deleteMetodoPago(id: string): Promise<{ success: boolean; message: string }> {
  const initialLength = metodosPago.length
  metodosPago = metodosPago.filter((m) => m.id !== id)
  if (metodosPago.length === initialLength) return { success: false, message: "Método de pago no encontrado." }

  revalidatePath("/catalogos/metodos-pago")
  return { success: true, message: "Método de pago eliminado exitosamente." }
}
