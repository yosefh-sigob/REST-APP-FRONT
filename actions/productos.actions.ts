"use server"

import { IGetProducto } from "@/interfaces/productos.interface"
import { ProductosService } from "@/lib/services/productos.service"
import { ProductoFormSchema, type ProductoFormData } from "@/schemas/productos.schemas"
import { revalidatePath } from "next/cache"
import axios from "axios"
import { promises as fs } from "fs"
import path from "path"

export interface ActionResult<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// env API_URL_LOCAL
const apiUrl = process.env.API_URL

export async function obtenerProductosActionAPI(): Promise<ActionResult<IGetProducto[]>> {
  try {
    console.log('APIURL', apiUrl)
    // axios get request to the API
    const response = await axios.get(`${apiUrl}/productos`)
    const productos: IGetProducto[] = response.data

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

export async function obtenerProductosAction(): Promise<ActionResult<IGetProducto[]>> {
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

export async function obtenerProductoPorIdAction(id: string): Promise<ActionResult<IGetProducto | null>> {
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

export async function crearProductoAction(formData: ProductoFormData): Promise<ActionResult<IGetProducto>> {
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
): Promise<ActionResult<IGetProducto>> {
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

export async function alternarFavoritoAction(id: string): Promise<ActionResult<IGetProducto>> {
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

export async function alternarSuspendidoAction(id: string): Promise<ActionResult<IGetProducto>> {
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

// ===== FUNCIONES CRUD CON DATOS LOCALES =====
// Simulando llamadas a API usando archivos JSON locales

// Obtener todos los productos desde datos locales
export async function obtenerProductosLocal(): Promise<ActionResult<IGetProducto[]>> {
  try {
    const filePath = path.join(process.cwd(), "data", "productos.json")
    const fileContents = await fs.readFile(filePath, "utf-8")
    const productos: IGetProducto[] = JSON.parse(fileContents)
    
    return {
      success: true,
      data: productos,
    }
  } catch (error) {
    console.error("Error fetching productos from local data:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al obtener productos",
    }
  }
}

// Obtener producto por ID desde datos locales
export async function obtenerProductoPorIdLocal(ProductoULID: string): Promise<ActionResult<IGetProducto | null>> {
  try {
    const result = await obtenerProductosLocal()
    if (!result.success || !result.data) {
      return {
        success: false,
        error: "Error al obtener productos",
      }
    }
    
    const producto = result.data.find(p => p.ProductoULID === ProductoULID)
    
    return {
      success: true,
      data: producto || null,
    }
  } catch (error) {
    console.error("Error fetching producto by ID from local data:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al obtener producto",
    }
  }
}

// Crear producto en datos locales
export async function crearProductoLocal(producto: Omit<IGetProducto, 'ProductoULID'>): Promise<ActionResult<IGetProducto>> {
  try {
    const filePath = path.join(process.cwd(), "data", "productos.json")
    const result = await obtenerProductosLocal()
    
    if (!result.success || !result.data) {
      return {
        success: false,
        error: "Error al obtener productos existentes",
      }
    }
    
    const productos = result.data
    const newProducto: IGetProducto = {
      ...producto,
      ProductoULID: `prod_${Date.now()}` // Generación simple de ID
    }
    
    productos.push(newProducto)
    
    await fs.writeFile(filePath, JSON.stringify(productos, null, 2), "utf-8")
    revalidatePath("/productos")
    
    return {
      success: true,
      data: newProducto,
      message: "Producto creado exitosamente",
    }
  } catch (error) {
    console.error("Error creating producto in local data:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al crear producto",
    }
  }
}

// Actualizar producto en datos locales
export async function actualizarProductoLocal(ProductoULID: string, producto: Partial<IGetProducto>): Promise<ActionResult<IGetProducto>> {
  try {
    const filePath = path.join(process.cwd(), "data", "productos.json")
    const result = await obtenerProductosLocal()
    
    if (!result.success || !result.data) {
      return {
        success: false,
        error: "Error al obtener productos existentes",
      }
    }
    
    const productos = result.data
    const productoIndex = productos.findIndex(p => p.ProductoULID === ProductoULID)
    
    if (productoIndex === -1) {
      return {
        success: false,
        error: "Producto no encontrado",
      }
    }
    
    productos[productoIndex] = { ...productos[productoIndex], ...producto }
    
    await fs.writeFile(filePath, JSON.stringify(productos, null, 2), "utf-8")
    revalidatePath("/productos")
    
    return {
      success: true,
      data: productos[productoIndex],
      message: "Producto actualizado exitosamente",
    }
  } catch (error) {
    console.error("Error updating producto in local data:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al actualizar producto",
    }
  }
}

// Eliminar producto de datos locales
export async function eliminarProductoLocal(ProductoULID: string): Promise<ActionResult<boolean>> {
  try {
    const filePath = path.join(process.cwd(), "data", "productos.json")
    const result = await obtenerProductosLocal()
    
    if (!result.success || !result.data) {
      return {
        success: false,
        error: "Error al obtener productos existentes",
      }
    }
    
    const productos = result.data
    const filteredProductos = productos.filter(p => p.ProductoULID !== ProductoULID)
    
    if (filteredProductos.length === productos.length) {
      return {
        success: false,
        error: "Producto no encontrado",
      }
    }
    
    await fs.writeFile(filePath, JSON.stringify(filteredProductos, null, 2), "utf-8")
    revalidatePath("/productos")
    
    return {
      success: true,
      data: true,
      message: "Producto eliminado exitosamente",
    }
  } catch (error) {
    console.error("Error deleting producto from local data:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al eliminar producto",
    }
  }
}

// Buscar productos por tipo
export async function obtenerProductosPorTipoLocal(tipo: string): Promise<ActionResult<IGetProducto[]>> {
  try {
    const result = await obtenerProductosLocal()
    if (!result.success || !result.data) {
      return {
        success: false,
        error: "Error al obtener productos",
      }
    }
    
    const productosFiltrados = result.data.filter(p => 
      p.TipoProducto?.toLowerCase().includes(tipo.toLowerCase())
    )
    
    return {
      success: true,
      data: productosFiltrados,
    }
  } catch (error) {
    console.error("Error searching productos by type:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al buscar productos",
    }
  }
}
