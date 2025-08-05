"use server"

import { revalidatePath } from "next/cache"
import { generateULID } from "@/lib/utils/ulid"
import type {
  IAreaProduccion,
  ICreateAreaProduccion,
  IUpdateAreaProduccion,
} from "@/interfaces/areaProduccion.interface"
import type { IGrupo, GrupoFormValues } from "@/interfaces/grupos.interface"
import type { ISubgrupo, ICreateSubgrupo, IUpdateSubgrupo } from "@/interfaces/subgrupos.interface"
import type { IUnidad, ICreateUnidad, IUpdateUnidad } from "@/interfaces/unidad.interface"
import type { IAlmacen, ICreateAlmacen, IUpdateAlmacen } from "@/interfaces/almacen.interface"
import type { ITipoCliente, ICreateTipoCliente, IUpdateTipoCliente } from "@/interfaces/tipos-cliente.interface"
import type { IMetodoPago, ICreateMetodoPago, IUpdateMetodoPago } from "@/interfaces/metodos-pago.interface"
import type { IEstadoMesa, ICreateEstadoMesa, IUpdateEstadoMesa } from "@/interfaces/estados-mesa.interface"

// Importar datos mock
import areasProduccionData from "@/data/areas-produccion.json"
import initialGrupos from "@/data/grupos.json"
import subgruposData from "@/data/subgrupos.json"
import unidadesData from "@/data/unidades.json"
import almacenesData from "@/data/almacenes.json"
import tiposClienteData from "@/data/tipos-cliente.json"
import metodosPagoData from "@/data/metodos-pago.json"
import estadosMesaData from "@/data/estados-mesa.json"

// Simulación de Base de Datos en Memoria
let grupos: IGrupo[] = [...initialGrupos]

// ============================================================================
// ÁREAS DE PRODUCCIÓN
// ============================================================================

export async function getAreasProduccion(): Promise<{ success: boolean; data: IAreaProduccion[]; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return {
      success: true,
      data: areasProduccionData as IAreaProduccion[],
      message: "Áreas de producción obtenidas exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      message: "Error al obtener las áreas de producción",
    }
  }
}

export async function createAreaProduccion(
  data: ICreateAreaProduccion,
): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const existingArea = areasProduccionData.find((area) => area.clave.toLowerCase() === data.clave.toLowerCase())
    if (existingArea) {
      return {
        success: false,
        message: "Ya existe un área de producción con esa clave",
      }
    }

    revalidatePath("/catalogos/areas-produccion")
    return {
      success: true,
      message: "Área de producción creada exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al crear el área de producción",
    }
  }
}

export async function updateAreaProduccion(
  id: string,
  data: IUpdateAreaProduccion,
): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (data.clave) {
      const existingArea = areasProduccionData.find(
        (area) => area.id !== id && area.clave.toLowerCase() === data.clave.toLowerCase(),
      )
      if (existingArea) {
        return {
          success: false,
          message: "Ya existe un área de producción con esa clave",
        }
      }
    }

    revalidatePath("/catalogos/areas-produccion")
    return {
      success: true,
      message: "Área de producción actualizada exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al actualizar el área de producción",
    }
  }
}

export async function deleteAreaProduccion(id: string): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    revalidatePath("/catalogos/areas-produccion")
    return {
      success: true,
      message: "Área de producción eliminada exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al eliminar el área de producción",
    }
  }
}

// ============================================================================
// GRUPOS DE PRODUCTOS
// ============================================================================

export async function getGruposCatalogos(): Promise<{ success: boolean; data: IGrupo[]; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 150)) // Simular delay
    return {
      success: true,
      data: JSON.parse(JSON.stringify(grupos)),
      message: "Grupos obtenidos exitosamente.",
    }
  } catch (error) {
    return { success: false, data: [], message: "Error al obtener los grupos." }
  }
}

export async function createGrupoCatalogos(data: GrupoFormValues): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const existingGrupo = grupos.find((g) => g.clave.toLowerCase() === data.clave.toLowerCase())
    if (existingGrupo) {
      return { success: false, message: "Ya existe un grupo con esa clave." }
    }

    const newGrupo: IGrupo = {
      id: `GRP-${generateULID()}`,
      clave: data.clave,
      nombre: data.nombre,
      descripcion: data.descripcion || "",
      activo: data.activo,
    }

    grupos.push(newGrupo)
    revalidatePath("/catalogos/grupos")
    return { success: true, message: "Grupo creado exitosamente." }
  } catch (error) {
    return { success: false, message: "Error al crear el grupo." }
  }
}

export async function updateGrupoCatalogos(
  id: string,
  data: GrupoFormValues,
): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = grupos.findIndex((g) => g.id === id)
    if (index === -1) {
      return { success: false, message: "Grupo no encontrado." }
    }

    const existingGrupo = grupos.find((g) => g.id !== id && g.clave.toLowerCase() === data.clave.toLowerCase())
    if (existingGrupo) {
      return { success: false, message: "Ya existe otro grupo con esa clave." }
    }

    grupos[index] = {
      ...grupos[index],
      ...data,
      descripcion: data.descripcion || "",
    }

    revalidatePath("/catalogos/grupos")
    return { success: true, message: "Grupo actualizado exitosamente." }
  } catch (error) {
    return { success: false, message: "Error al actualizar el grupo." }
  }
}

export async function deleteGrupoCatalogos(id: string): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const initialLength = grupos.length
    grupos = grupos.filter((g) => g.id !== id)

    if (grupos.length === initialLength) {
      return { success: false, message: "Grupo no encontrado." }
    }

    revalidatePath("/catalogos/grupos")
    return { success: true, message: "Grupo eliminado exitosamente." }
  } catch (error) {
    return { success: false, message: "Error al eliminar el grupo." }
  }
}

// ============================================================================
// SUBGRUPOS
// ============================================================================

export async function getSubgruposCatalogos(): Promise<{ success: boolean; data: ISubgrupo[]; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return {
      success: true,
      data: subgruposData as ISubgrupo[],
      message: "Subgrupos obtenidos exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      message: "Error al obtener los subgrupos",
    }
  }
}

export async function createSubgrupoCatalogos(data: ICreateSubgrupo): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const existingSubgrupo = subgruposData.find((subgrupo) => subgrupo.clave.toLowerCase() === data.clave.toLowerCase())
    if (existingSubgrupo) {
      return {
        success: false,
        message: "Ya existe un subgrupo con esa clave",
      }
    }

    revalidatePath("/catalogos/subgrupos")
    return {
      success: true,
      message: "Subgrupo creado exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al crear el subgrupo",
    }
  }
}

export async function updateSubgrupoCatalogos(
  id: string,
  data: IUpdateSubgrupo,
): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (data.clave) {
      const existingSubgrupo = subgruposData.find(
        (subgrupo) => subgrupo.id !== id && subgrupo.clave.toLowerCase() === data.clave.toLowerCase(),
      )
      if (existingSubgrupo) {
        return {
          success: false,
          message: "Ya existe un subgrupo con esa clave",
        }
      }
    }

    revalidatePath("/catalogos/subgrupos")
    return {
      success: true,
      message: "Subgrupo actualizado exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al actualizar el subgrupo",
    }
  }
}

export async function deleteSubgrupoCatalogos(id: string): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    revalidatePath("/catalogos/subgrupos")
    return {
      success: true,
      message: "Subgrupo eliminado exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al eliminar el subgrupo",
    }
  }
}

// ============================================================================
// UNIDADES
// ============================================================================

export async function getUnidadesCatalogos(): Promise<{ success: boolean; data: IUnidad[]; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return {
      success: true,
      data: unidadesData as IUnidad[],
      message: "Unidades obtenidas exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      message: "Error al obtener las unidades",
    }
  }
}

export async function createUnidadCatalogos(data: ICreateUnidad): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const existingUnidad = unidadesData.find((unidad) => unidad.clave.toLowerCase() === data.clave.toLowerCase())
    if (existingUnidad) {
      return {
        success: false,
        message: "Ya existe una unidad con esa clave",
      }
    }

    revalidatePath("/catalogos/unidades")
    return {
      success: true,
      message: "Unidad creada exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al crear la unidad",
    }
  }
}

export async function updateUnidadCatalogos(
  id: string,
  data: IUpdateUnidad,
): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (data.clave) {
      const existingUnidad = unidadesData.find(
        (unidad) => unidad.id !== id && unidad.clave.toLowerCase() === data.clave.toLowerCase(),
      )
      if (existingUnidad) {
        return {
          success: false,
          message: "Ya existe una unidad con esa clave",
        }
      }
    }

    revalidatePath("/catalogos/unidades")
    return {
      success: true,
      message: "Unidad actualizada exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al actualizar la unidad",
    }
  }
}

export async function deleteUnidadCatalogos(id: string): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    revalidatePath("/catalogos/unidades")
    return {
      success: true,
      message: "Unidad eliminada exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al eliminar la unidad",
    }
  }
}

// ============================================================================
// ALMACENES
// ============================================================================

export async function getAlmacenesCatalogos(): Promise<{ success: boolean; data: IAlmacen[]; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return {
      success: true,
      data: almacenesData as IAlmacen[],
      message: "Almacenes obtenidos exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      message: "Error al obtener los almacenes",
    }
  }
}

export async function createAlmacenCatalogos(data: ICreateAlmacen): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const existingAlmacen = almacenesData.find((almacen) => almacen.clave.toLowerCase() === data.clave.toLowerCase())
    if (existingAlmacen) {
      return {
        success: false,
        message: "Ya existe un almacén con esa clave",
      }
    }

    revalidatePath("/catalogos/almacenes")
    return {
      success: true,
      message: "Almacén creado exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al crear el almacén",
    }
  }
}

export async function updateAlmacenCatalogos(
  id: string,
  data: IUpdateAlmacen,
): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (data.clave) {
      const existingAlmacen = almacenesData.find(
        (almacen) => almacen.id !== id && almacen.clave.toLowerCase() === data.clave!.toLowerCase(),
      )
      if (existingAlmacen) {
        return {
          success: false,
          message: "Ya existe un almacén con esa clave",
        }
      }
    }

    revalidatePath("/catalogos/almacenes")
    return {
      success: true,
      message: "Almacén actualizado exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al actualizar el almacén",
    }
  }
}

export async function deleteAlmacenCatalogos(id: string): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    revalidatePath("/catalogos/almacenes")
    return {
      success: true,
      message: "Almacén eliminado exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al eliminar el almacén",
    }
  }
}

// ============================================================================
// TIPOS DE CLIENTE
// ============================================================================

export async function getTiposClienteCatalogos(): Promise<{ success: boolean; data: ITipoCliente[]; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return {
      success: true,
      data: tiposClienteData as ITipoCliente[],
      message: "Tipos de cliente obtenidos exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      message: "Error al obtener los tipos de cliente",
    }
  }
}

export async function createTipoClienteCatalogos(
  data: ICreateTipoCliente,
): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const existingTipo = tiposClienteData.find((tipo) => tipo.nombre.toLowerCase() === data.nombre.toLowerCase())
    if (existingTipo) {
      return {
        success: false,
        message: "Ya existe un tipo de cliente con ese nombre",
      }
    }

    revalidatePath("/catalogos/tipos-cliente")
    return {
      success: true,
      message: "Tipo de cliente creado exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al crear el tipo de cliente",
    }
  }
}

export async function updateTipoClienteCatalogos(
  id: string,
  data: IUpdateTipoCliente,
): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (data.nombre) {
      const existingTipo = tiposClienteData.find(
        (tipo) => tipo.id !== id && tipo.nombre.toLowerCase() === data.nombre!.toLowerCase(),
      )
      if (existingTipo) {
        return {
          success: false,
          message: "Ya existe un tipo de cliente con ese nombre",
        }
      }
    }

    revalidatePath("/catalogos/tipos-cliente")
    return {
      success: true,
      message: "Tipo de cliente actualizado exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al actualizar el tipo de cliente",
    }
  }
}

export async function deleteTipoClienteCatalogos(id: string): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    revalidatePath("/catalogos/tipos-cliente")
    return {
      success: true,
      message: "Tipo de cliente eliminado exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al eliminar el tipo de cliente",
    }
  }
}

// ============================================================================
// MÉTODOS DE PAGO
// ============================================================================

export async function getMetodosPagoCatalogos(): Promise<{ success: boolean; data: IMetodoPago[]; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return {
      success: true,
      data: metodosPagoData as IMetodoPago[],
      message: "Métodos de pago obtenidos exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      message: "Error al obtener los métodos de pago",
    }
  }
}

export async function createMetodoPagoCatalogos(
  data: ICreateMetodoPago,
): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const existingMetodo = metodosPagoData.find((metodo) => metodo.nombre.toLowerCase() === data.nombre.toLowerCase())
    if (existingMetodo) {
      return {
        success: false,
        message: "Ya existe un método de pago con ese nombre",
      }
    }

    revalidatePath("/catalogos/metodos-pago")
    return {
      success: true,
      message: "Método de pago creado exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al crear el método de pago",
    }
  }
}

export async function updateMetodoPagoCatalogos(
  id: string,
  data: IUpdateMetodoPago,
): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (data.nombre) {
      const existingMetodo = metodosPagoData.find(
        (metodo) => metodo.id !== id && metodo.nombre.toLowerCase() === data.nombre!.toLowerCase(),
      )
      if (existingMetodo) {
        return {
          success: false,
          message: "Ya existe un método de pago con ese nombre",
        }
      }
    }

    revalidatePath("/catalogos/metodos-pago")
    return {
      success: true,
      message: "Método de pago actualizado exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al actualizar el método de pago",
    }
  }
}

export async function deleteMetodoPagoCatalogos(id: string): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    revalidatePath("/catalogos/metodos-pago")
    return {
      success: true,
      message: "Método de pago eliminado exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al eliminar el método de pago",
    }
  }
}

// ============================================================================
// ESTADOS DE MESA
// ============================================================================

export async function getEstadosMesaCatalogos(): Promise<{ success: boolean; data: IEstadoMesa[]; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return {
      success: true,
      data: estadosMesaData as IEstadoMesa[],
      message: "Estados de mesa obtenidos exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      message: "Error al obtener los estados de mesa",
    }
  }
}

export async function createEstadoMesaCatalogos(
  data: ICreateEstadoMesa,
): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const existingEstado = estadosMesaData.find((estado) => estado.nombre.toLowerCase() === data.nombre.toLowerCase())
    if (existingEstado) {
      return {
        success: false,
        message: "Ya existe un estado de mesa con ese nombre",
      }
    }

    revalidatePath("/catalogos/estados-mesa")
    return {
      success: true,
      message: "Estado de mesa creado exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al crear el estado de mesa",
    }
  }
}

export async function updateEstadoMesaCatalogos(
  id: string,
  data: IUpdateEstadoMesa,
): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const existingEstado = estadosMesaData.find(
      (estado) => estado.id !== id && estado.nombre.toLowerCase() === data.nombre.toLowerCase(),
    )
    if (existingEstado) {
      return {
        success: false,
        message: "Ya existe un estado de mesa con ese nombre",
      }
    }

    revalidatePath("/catalogos/estados-mesa")
    return {
      success: true,
      message: "Estado de mesa actualizado exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al actualizar el estado de mesa",
    }
  }
}

export async function deleteEstadoMesaCatalogos(id: string): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    revalidatePath("/catalogos/estados-mesa")
    return {
      success: true,
      message: "Estado de mesa eliminado exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al eliminar el estado de mesa",
    }
  }
}
