"use server"

import { ProductosService, type Producto } from "@/lib/services/productos.service"
import { ProductoFormSchema, type ProductoFormData } from "@/schemas/productos.schemas"
import { revalidatePath } from "next/cache"

export interface ActionResult<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export async function obtenerProductosAction(): Promise<ActionResult<Producto[]>> {
  try {
    const productos = await ProductosService.obtenerProductos()
    return {
      success: true,
      data: productos,
    }
  } catch (error) {
    console.error("Error en obtenerProductosAction:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al obtener productos",
    }
  }
}

export async function obtenerProductoPorIdAction(id: string): Promise<ActionResult<Producto | null>> {
  try {
    if (!id) {
      return {
        success: false,
        error: "ID de producto requerido",
      }
    }

    const producto = await ProductosService.obtenerProductoPorId(id)
    return {
      success: true,
      data: producto,
    }
  } catch (error) {
    console.error("Error en obtenerProductoPorIdAction:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al obtener producto",
    }
  }
}

export async function crearProductoAction(formData: ProductoFormData): Promise<ActionResult<Producto>> {
  try {
    // Validar datos con Zod
    const validatedData = ProductoFormSchema.parse(formData)

    // Verificar que al menos un canal esté activo
    const canalesActivos = [
      validatedData.Comedor,
      validatedData.ADomicilio,
      validatedData.Mostrador,
      validatedData.Enlinea,
      validatedData.EnAPP,
      validatedData.EnMenuQR,
    ].some((canal) => canal === true)

    if (!canalesActivos) {
      return {
        success: false,
        error: "Debe seleccionar al menos un canal de venta",
      }
    }

    // Crear el producto
    const nuevoProducto = await ProductosService.crearProducto({
      ...validatedData,
      UsuarioULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3I", // Mock user ID
      EmpresaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3J", // Mock empresa ID
    })

    revalidatePath("/productos")

    return {
      success: true,
      data: nuevoProducto,
      message: "Producto creado exitosamente",
    }
  } catch (error) {
    console.error("Error en crearProductoAction:", error)

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: false,
      error: "Error desconocido al crear producto",
    }
  }
}

export async function actualizarProductoAction(
  id: string,
  formData: ProductoFormData,
): Promise<ActionResult<Producto>> {
  try {
    if (!id) {
      return {
        success: false,
        error: "ID de producto requerido",
      }
    }

    // Validar datos con Zod
    const validatedData = ProductoFormSchema.parse(formData)

    // Verificar que al menos un canal esté activo
    const canalesActivos = [
      validatedData.Comedor,
      validatedData.ADomicilio,
      validatedData.Mostrador,
      validatedData.Enlinea,
      validatedData.EnAPP,
      validatedData.EnMenuQR,
    ].some((canal) => canal === true)

    if (!canalesActivos) {
      return {
        success: false,
        error: "Debe seleccionar al menos un canal de venta",
      }
    }

    // Actualizar el producto
    const productoActualizado = await ProductosService.actualizarProducto(id, validatedData)

    revalidatePath("/productos")

    return {
      success: true,
      data: productoActualizado,
      message: "Producto actualizado exitosamente",
    }
  } catch (error) {
    console.error("Error en actualizarProductoAction:", error)

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: false,
      error: "Error desconocido al actualizar producto",
    }
  }
}

export async function eliminarProductoAction(id: string): Promise<ActionResult<boolean>> {
  try {
    if (!id) {
      return {
        success: false,
        error: "ID de producto requerido",
      }
    }

    const resultado = await ProductosService.eliminarProducto(id)

    revalidatePath("/productos")

    return {
      success: true,
      data: resultado,
      message: "Producto eliminado exitosamente",
    }
  } catch (error) {
    console.error("Error en eliminarProductoAction:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al eliminar producto",
    }
  }
}

export async function alternarFavoritoAction(id: string): Promise<ActionResult<Producto>> {
  try {
    if (!id) {
      return {
        success: false,
        error: "ID de producto requerido",
      }
    }

    const producto = await ProductosService.alternarFavorito(id)

    revalidatePath("/productos")

    return {
      success: true,
      data: producto,
      message: producto.Favorito ? "Producto marcado como favorito" : "Producto desmarcado como favorito",
    }
  } catch (error) {
    console.error("Error en alternarFavoritoAction:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al actualizar favorito",
    }
  }
}

export async function alternarSuspendidoAction(id: string): Promise<ActionResult<Producto>> {
  try {
    if (!id) {
      return {
        success: false,
        error: "ID de producto requerido",
      }
    }

    const producto = await ProductosService.alternarSuspendido(id)

    revalidatePath("/productos")

    return {
      success: true,
      data: producto,
      message: producto.Suspendido ? "Producto suspendido" : "Producto activado",
    }
  } catch (error) {
    console.error("Error en alternarSuspendidoAction:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al actualizar estado",
    }
  }
}

export async function obtenerDatosRelacionadosAction(): Promise<
  ActionResult<{
    grupos: any[]
    subgrupos: any[]
    unidades: any[]
    areasProduccion: any[]
  }>
> {
  try {
    const [grupos, subgrupos, unidades, areasProduccion] = await Promise.all([
      ProductosService.obtenerGruposProductos(),
      ProductosService.obtenerSubgruposProductos(),
      ProductosService.obtenerUnidades(),
      ProductosService.obtenerAreasProduccion(),
    ])

    return {
      success: true,
      data: {
        grupos,
        subgrupos,
        unidades,
        areasProduccion,
      },
    }
  } catch (error) {
    console.error("Error en obtenerDatosRelacionadosAction:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al obtener datos relacionados",
    }
  }
}

export async function validarClaveProductoAction(clave: string, excludeId?: string): Promise<ActionResult<boolean>> {
  try {
    if (!clave) {
      return {
        success: false,
        error: "Clave de producto requerida",
      }
    }

    const existe = await ProductosService.validarClaveProducto(clave, excludeId)

    return {
      success: true,
      data: existe,
    }
  } catch (error) {
    console.error("Error en validarClaveProductoAction:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al validar clave",
    }
  }
}

export async function obtenerEstadisticasAction(): Promise<ActionResult<any>> {
  try {
    const estadisticas = await ProductosService.obtenerEstadisticas()

    return {
      success: true,
      data: estadisticas,
    }
  } catch (error) {
    console.error("Error en obtenerEstadisticasAction:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al obtener estadísticas",
    }
  }
}
