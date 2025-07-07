import {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  toggleFavorito,
  toggleSuspendido,
  getGruposProductos,
  getSubgruposProductos,
  getUnidades,
  getAreasProduccion,
  existeClaveProducto,
  getEstadisticasProductos,
  type Producto,
  type GrupoProducto,
  type SubgrupoProducto,
  type Unidad,
  type AreaProduccion,
} from "@/lib/mock/productos.mock"

export class ProductosService {
  // Productos
  static async obtenerProductos(): Promise<Producto[]> {
    try {
      return await getProductos()
    } catch (error) {
      console.error("Error al obtener productos:", error)
      throw new Error("Error al cargar los productos")
    }
  }

  static async obtenerProductoPorId(id: string): Promise<Producto | null> {
    try {
      return await getProductoById(id)
    } catch (error) {
      console.error("Error al obtener producto:", error)
      throw new Error("Error al cargar el producto")
    }
  }

  static async crearProducto(
    producto: Omit<Producto, "ProductoULID" | "Fecha_UltimoCambio" | "Fecha_Sync">,
  ): Promise<Producto> {
    try {
      return await createProducto(producto)
    } catch (error) {
      console.error("Error al crear producto:", error)
      throw error
    }
  }

  static async actualizarProducto(id: string, producto: Partial<Omit<Producto, "ProductoULID">>): Promise<Producto> {
    try {
      return await updateProducto(id, producto)
    } catch (error) {
      console.error("Error al actualizar producto:", error)
      throw error
    }
  }

  static async eliminarProducto(id: string): Promise<boolean> {
    try {
      return await deleteProducto(id)
    } catch (error) {
      console.error("Error al eliminar producto:", error)
      throw new Error("Error al eliminar el producto")
    }
  }

  static async alternarFavorito(id: string): Promise<Producto> {
    try {
      return await toggleFavorito(id)
    } catch (error) {
      console.error("Error al alternar favorito:", error)
      throw new Error("Error al actualizar favorito")
    }
  }

  static async alternarSuspendido(id: string): Promise<Producto> {
    try {
      return await toggleSuspendido(id)
    } catch (error) {
      console.error("Error al alternar suspendido:", error)
      throw new Error("Error al actualizar estado")
    }
  }

  // Datos relacionados
  static async obtenerGruposProductos(): Promise<GrupoProducto[]> {
    try {
      return await getGruposProductos()
    } catch (error) {
      console.error("Error al obtener grupos:", error)
      throw new Error("Error al cargar los grupos de productos")
    }
  }

  static async obtenerSubgruposProductos(): Promise<SubgrupoProducto[]> {
    try {
      return await getSubgruposProductos()
    } catch (error) {
      console.error("Error al obtener subgrupos:", error)
      throw new Error("Error al cargar los subgrupos de productos")
    }
  }

  static async obtenerUnidades(): Promise<Unidad[]> {
    try {
      return await getUnidades()
    } catch (error) {
      console.error("Error al obtener unidades:", error)
      throw new Error("Error al cargar las unidades")
    }
  }

  static async obtenerAreasProduccion(): Promise<AreaProduccion[]> {
    try {
      return await getAreasProduccion()
    } catch (error) {
      console.error("Error al obtener áreas de producción:", error)
      throw new Error("Error al cargar las áreas de producción")
    }
  }

  // Validaciones
  static async validarClaveProducto(clave: string, excludeId?: string): Promise<boolean> {
    try {
      return await existeClaveProducto(clave, excludeId)
    } catch (error) {
      console.error("Error al validar clave:", error)
      return false
    }
  }

  // Estadísticas
  static async obtenerEstadisticas() {
    try {
      return await getEstadisticasProductos()
    } catch (error) {
      console.error("Error al obtener estadísticas:", error)
      throw new Error("Error al cargar las estadísticas")
    }
  }

  // Filtros y búsquedas
  static filtrarProductos(
    productos: Producto[],
    filtros: {
      busqueda?: string
      tipo?: string
      favoritos?: boolean
      suspendidos?: boolean
      grupo?: string
      subgrupo?: string
    },
  ): Producto[] {
    let productosFiltrados = [...productos]

    // Filtro por búsqueda
    if (filtros.busqueda) {
      const busqueda = filtros.busqueda.toLowerCase()
      productosFiltrados = productosFiltrados.filter(
        (producto) =>
          producto.Nombredelproducto.toLowerCase().includes(busqueda) ||
          producto.ClaveProducto.toLowerCase().includes(busqueda) ||
          producto.Descripcion.toLowerCase().includes(busqueda),
      )
    }

    // Filtro por tipo
    if (filtros.tipo && filtros.tipo !== "todos") {
      productosFiltrados = productosFiltrados.filter((producto) => producto.TipoProducto === filtros.tipo)
    }

    // Filtro por favoritos
    if (filtros.favoritos !== undefined) {
      productosFiltrados = productosFiltrados.filter((producto) => producto.Favorito === filtros.favoritos)
    }

    // Filtro por suspendidos
    if (filtros.suspendidos !== undefined) {
      productosFiltrados = productosFiltrados.filter((producto) => producto.Suspendido === filtros.suspendidos)
    }

    // Filtro por grupo
    if (filtros.grupo && filtros.grupo !== "todos") {
      productosFiltrados = productosFiltrados.filter((producto) => producto.GrupoProductoULID === filtros.grupo)
    }

    // Filtro por subgrupo
    if (filtros.subgrupo && filtros.subgrupo !== "todos") {
      productosFiltrados = productosFiltrados.filter((producto) => producto.SubgrupoProductoULID === filtros.subgrupo)
    }

    return productosFiltrados
  }

  // Ordenamiento
  static ordenarProductos(productos: Producto[], campo: keyof Producto, direccion: "asc" | "desc" = "asc"): Producto[] {
    return [...productos].sort((a, b) => {
      const valorA = a[campo]
      const valorB = b[campo]

      if (valorA === valorB) return 0

      let resultado = 0
      if (typeof valorA === "string" && typeof valorB === "string") {
        resultado = valorA.localeCompare(valorB)
      } else if (typeof valorA === "number" && typeof valorB === "number") {
        resultado = valorA - valorB
      } else if (typeof valorA === "boolean" && typeof valorB === "boolean") {
        resultado = valorA === valorB ? 0 : valorA ? 1 : -1
      } else {
        resultado = String(valorA).localeCompare(String(valorB))
      }

      return direccion === "desc" ? -resultado : resultado
    })
  }
}

export type { Producto, GrupoProducto, SubgrupoProducto, Unidad, AreaProduccion }
