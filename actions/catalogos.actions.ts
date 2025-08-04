"use server"

import { revalidatePath } from "next/cache"

// Importar interfaces
import type {
  IAreaProduccion,
  ICreateAreaProduccion,
  IUpdateAreaProduccion,
} from "@/interfaces/areaProduccion.interface"
import type { IGrupo, ICreateGrupo, IUpdateGrupo } from "@/interfaces/grupos.interface"
import type { ISubgrupo, ICreateSubgrupo, IUpdateSubgrupo } from "@/interfaces/subgrupos.interface"
import type { IUnidad, ICreateUnidad, IUpdateUnidad } from "@/interfaces/unidad.interface"
import type { IAlmacen, ICreateAlmacen, IUpdateAlmacen } from "@/interfaces/almacen.interface"
import type { ITipoCliente, ICreateTipoCliente, IUpdateTipoCliente } from "@/interfaces/tipos-cliente.interface"
import type { IMetodoPago, ICreateMetodoPago, IUpdateMetodoPago } from "@/interfaces/metodos-pago.interface"

// Importar datos mock
import areasProduccionData from "@/data/areas-produccion.json"
import gruposData from "@/data/grupos.json"
import subgruposData from "@/data/subgrupos.json"
import unidadesData from "@/data/unidades.json"
import almacenesData from "@/data/almacenes.json"
import tiposClienteData from "@/data/tipos-cliente.json"
import metodosPagoData from "@/data/metodos-pago.json"

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
// GRUPOS
// ============================================================================

export async function getGrupos(): Promise<{ success: boolean; data: IGrupo[]; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return {
      success: true,
      data: gruposData as IGrupo[],
      message: "Grupos obtenidos exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      message: "Error al obtener los grupos",
    }
  }
}

export async function createGrupo(data: ICreateGrupo): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const existingGrupo = gruposData.find((grupo) => grupo.clave.toLowerCase() === data.clave.toLowerCase())
    if (existingGrupo) {
      return {
        success: false,
        message: "Ya existe un grupo con esa clave",
      }
    }

    revalidatePath("/catalogos/grupos")
    return {
      success: true,
      message: "Grupo creado exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al crear el grupo",
    }
  }
}

export async function updateGrupo(id: string, data: IUpdateGrupo): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (data.clave) {
      const existingGrupo = gruposData.find(
        (grupo) => grupo.id !== id && grupo.clave.toLowerCase() === data.clave.toLowerCase(),
      )
      if (existingGrupo) {
        return {
          success: false,
          message: "Ya existe un grupo con esa clave",
        }
      }
    }

    revalidatePath("/catalogos/grupos")
    return {
      success: true,
      message: "Grupo actualizado exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al actualizar el grupo",
    }
  }
}

export async function deleteGrupo(id: string): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    revalidatePath("/catalogos/grupos")
    return {
      success: true,
      message: "Grupo eliminado exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al eliminar el grupo",
    }
  }
}

// ============================================================================
// SUBGRUPOS
// ============================================================================

export async function getSubgrupos(): Promise<{ success: boolean; data: ISubgrupo[]; message: string }> {
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

export async function createSubgrupo(data: ICreateSubgrupo): Promise<{ success: boolean; message: string }> {
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

export async function updateSubgrupo(
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

export async function deleteSubgrupo(id: string): Promise<{ success: boolean; message: string }> {
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

export async function getUnidades(): Promise<{ success: boolean; data: IUnidad[]; message: string }> {
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

export async function createUnidad(data: ICreateUnidad): Promise<{ success: boolean; message: string }> {
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

export async function updateUnidad(id: string, data: IUpdateUnidad): Promise<{ success: boolean; message: string }> {
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

export async function deleteUnidad(id: string): Promise<{ success: boolean; message: string }> {
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

export async function getAlmacenes(): Promise<{ success: boolean; data: IAlmacen[]; message: string }> {
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

export async function createAlmacen(data: ICreateAlmacen): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const existingAlmacen = almacenesData.find(
      (almacen) => almacen.clave_almacen.toLowerCase() === data.clave_almacen.toLowerCase(),
    )
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

export async function updateAlmacen(id: string, data: IUpdateAlmacen): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (data.clave_almacen) {
      const existingAlmacen = almacenesData.find(
        (almacen) => almacen.id !== id && almacen.clave_almacen.toLowerCase() === data.clave_almacen.toLowerCase(),
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

export async function deleteAlmacen(id: string): Promise<{ success: boolean; message: string }> {
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

export async function getTiposCliente(): Promise<{ success: boolean; data: ITipoCliente[]; message: string }> {
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

export async function createTipoCliente(data: ICreateTipoCliente): Promise<{ success: boolean; message: string }> {
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

export async function updateTipoCliente(
  id: string,
  data: IUpdateTipoCliente,
): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (data.nombre) {
      const existingTipo = tiposClienteData.find(
        (tipo) => tipo.id !== id && tipo.nombre.toLowerCase() === data.nombre.toLowerCase(),
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

export async function deleteTipoCliente(id: string): Promise<{ success: boolean; message: string }> {
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

export async function getMetodosPago(): Promise<{ success: boolean; data: IMetodoPago[]; message: string }> {
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

export async function createMetodoPago(data: ICreateMetodoPago): Promise<{ success: boolean; message: string }> {
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

export async function updateMetodoPago(
  id: string,
  data: IUpdateMetodoPago,
): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (data.nombre) {
      const existingMetodo = metodosPagoData.find(
        (metodo) => metodo.id !== id && metodo.nombre.toLowerCase() === data.nombre.toLowerCase(),
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

export async function deleteMetodoPago(id: string): Promise<{ success: boolean; message: string }> {
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
