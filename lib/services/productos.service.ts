import type { IGetProducto } from "@/interfaces/productos.interface"

import productosData from "@/data/productos.json"
import gruposData from "@/data/grupos.json"
import subgruposData from "@/data/subgrupos.json"
import unidadesData from "@/data/unidades.json"
import areasProduccionData from "@/data/areas-produccion.json"

const transformProductosData = (): IGetProducto[] => {
  return productosData.map((producto) => ({
    ULID: producto.ProductoULID,
    ClaveProducto: producto.ClaveProducto,
    Nombredelproducto: producto.Nombredelproducto,
    Descripcion: producto.Descripcion,
    TipoProducto: producto.TipoProducto,
    PrecioVenta: 150.0, // Valor por defecto ya que no está en el JSON
    Favorito: producto.Favorito,
    Suspendido: producto.Suspendido,
    GrupoProductoULID: "01GRUPO123456789ABCDEFGH", // Valor por defecto
    SubgrupoProductoULID: "01SUBGR123456789ABCDEFGH", // Valor por defecto
    UnidadULID: "01UNIDAD123456789ABCDEFG", // Valor por defecto
    AlmacenULID: "01ALMAC123456789ABCDEFGH", // Valor por defecto
    AreaProduccionULID: "01AREAP123456789ABCDEFGH", // Valor por defecto
    CostoPromedio: 80.0, // Valor por defecto
    Stock: 50, // Valor por defecto
    StockMinimo: 10, // Valor por defecto
    StockMaximo: 100, // Valor por defecto
    FechaCreacion: producto.Fecha_UltimoCambio,
    FechaActualizacion: producto.Fecha_Sync,
  }))
}

const transformGruposData = () => {
  return gruposData.map((grupo) => ({
    ULID: grupo.id,
    Nombre: grupo.nombre,
    Clave: grupo.clave,
    Descripcion: grupo.descripcion,
    Activo: grupo.activo,
  }))
}

const transformSubgruposData = () => {
  return subgruposData.map((subgrupo) => ({
    ULID: subgrupo.id,
    Nombre: subgrupo.nombre,
    Clave: subgrupo.clave,
    Descripcion: subgrupo.descripcion,
    GrupoULID: subgrupo.grupo_id,
    Activo: subgrupo.activo,
  }))
}

const transformUnidadesData = () => {
  return unidadesData.map((unidad) => ({
    ULID: unidad.id,
    Nombre: unidad.nombre,
    Clave: unidad.clave,
    Abreviacion: unidad.abreviacion,
    Descripcion: unidad.descripcion,
    Activo: unidad.activo,
  }))
}

const transformAreasProduccionData = () => {
  return areasProduccionData.map((area) => ({
    ULID: area.id,
    Nombre: area.descripcion,
    Clave: area.clave,
    Descripcion: area.descripcion,
    Impresora: area.impresora,
    Activo: area.activa,
  }))
}

const PRODUCTOS_LOCAL = transformProductosData()
const GRUPOS_LOCAL = transformGruposData()
const SUBGRUPOS_LOCAL = transformSubgruposData()
const UNIDADES_LOCAL = transformUnidadesData()
const AREAS_PRODUCCION_LOCAL = transformAreasProduccionData()

export class ProductosService {
  static async obtenerProductos(): Promise<IGetProducto[]> {
    try {
      const API_BASE_URL = process.env.API_URL || process.env.API_URL_LOCAL || "http://localhost:3001"
      const response = await fetch(`${API_BASE_URL}/api/productos`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.warn("API no disponible, usando datos locales:", error)
      return PRODUCTOS_LOCAL
    }
  }

  static async obtenerProductoPorId(id: string): Promise<IGetProducto | null> {
    try {
      const API_BASE_URL = process.env.API_URL || process.env.API_URL_LOCAL || "http://localhost:3001"
      const response = await fetch(`${API_BASE_URL}/api/productos/${id}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.warn("API no disponible, usando datos locales:", error)
      return PRODUCTOS_LOCAL.find((p) => p.ULID === id) || null
    }
  }

  static async obtenerGruposProductos(): Promise<any[]> {
    try {
      const API_BASE_URL = process.env.API_URL || process.env.API_URL_LOCAL || "http://localhost:3001"
      const response = await fetch(`${API_BASE_URL}/api/grupos-productos`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.warn("API no disponible, usando datos locales:", error)
      return GRUPOS_LOCAL
    }
  }

  static async obtenerSubgruposProductos(): Promise<any[]> {
    try {
      const API_BASE_URL = process.env.API_URL || process.env.API_URL_LOCAL || "http://localhost:3001"
      const response = await fetch(`${API_BASE_URL}/api/subgrupos-productos`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.warn("API no disponible, usando datos locales:", error)
      return SUBGRUPOS_LOCAL
    }
  }

  static async obtenerUnidades(): Promise<any[]> {
    try {
      const API_BASE_URL = process.env.API_URL || process.env.API_URL_LOCAL || "http://localhost:3001"
      const response = await fetch(`${API_BASE_URL}/api/unidades`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.warn("API no disponible, usando datos locales:", error)
      return UNIDADES_LOCAL
    }
  }

  static async obtenerAreasProduccion(): Promise<any[]> {
    try {
      const API_BASE_URL = process.env.API_URL || process.env.API_URL_LOCAL || "http://localhost:3001"
      const response = await fetch(`${API_BASE_URL}/api/areas-produccion`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.warn("API no disponible, usando datos locales:", error)
      return AREAS_PRODUCCION_LOCAL
    }
  }

  static async crearProducto(producto: any): Promise<IGetProducto> {
    try {
      const API_BASE_URL = process.env.API_URL || process.env.API_URL_LOCAL || "http://localhost:3001"
      const response = await fetch(`${API_BASE_URL}/api/productos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.warn("API no disponible, usando datos locales:", error)
      return {
        ...PRODUCTOS_LOCAL[0],
        ULID: `01NEW${Date.now()}`,
        ...producto,
        FechaCreacion: new Date().toISOString(),
        FechaActualizacion: new Date().toISOString(),
      }
    }
  }

  static async actualizarProducto(id: string, producto: any): Promise<IGetProducto> {
    try {
      const API_BASE_URL = process.env.API_URL || process.env.API_URL_LOCAL || "http://localhost:3001"
      const response = await fetch(`${API_BASE_URL}/api/productos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.warn("API no disponible, usando datos locales:", error)
      const existing = PRODUCTOS_LOCAL.find((p) => p.ULID === id) || PRODUCTOS_LOCAL[0]
      return {
        ...existing,
        ...producto,
        FechaActualizacion: new Date().toISOString(),
      }
    }
  }

  static async eliminarProducto(id: string): Promise<boolean> {
    try {
      const API_BASE_URL = process.env.API_URL || process.env.API_URL_LOCAL || "http://localhost:3001"
      const response = await fetch(`${API_BASE_URL}/api/productos/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return true
    } catch (error) {
      console.warn("API no disponible, usando datos locales:", error)
      return true // Mock success
    }
  }

  static async alternarFavorito(id: string): Promise<IGetProducto> {
    try {
      const API_BASE_URL = process.env.API_URL || process.env.API_URL_LOCAL || "http://localhost:3001"
      const response = await fetch(`${API_BASE_URL}/api/productos/${id}/favorito`, {
        method: "PATCH",
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.warn("API no disponible, usando datos locales:", error)
      const existing = PRODUCTOS_LOCAL.find((p) => p.ULID === id) || PRODUCTOS_LOCAL[0]
      return {
        ...existing,
        Favorito: !existing.Favorito,
        FechaActualizacion: new Date().toISOString(),
      }
    }
  }

  static async alternarSuspendido(id: string): Promise<IGetProducto> {
    try {
      const API_BASE_URL = process.env.API_URL || process.env.API_URL_LOCAL || "http://localhost:3001"
      const response = await fetch(`${API_BASE_URL}/api/productos/${id}/suspendido`, {
        method: "PATCH",
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.warn("API no disponible, usando datos locales:", error)
      const existing = PRODUCTOS_LOCAL.find((p) => p.ULID === id) || PRODUCTOS_LOCAL[0]
      return {
        ...existing,
        Suspendido: !existing.Suspendido,
        FechaActualizacion: new Date().toISOString(),
      }
    }
  }

  static async validarClaveProducto(clave: string, excludeId?: string): Promise<boolean> {
    try {
      const API_BASE_URL = process.env.API_URL || process.env.API_URL_LOCAL || "http://localhost:3001"
      const response = await fetch(
        `${API_BASE_URL}/api/productos/validar-clave?clave=${clave}&excludeId=${excludeId || ""}`,
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.existe
    } catch (error) {
      console.warn("API no disponible, usando datos locales:", error)
      return PRODUCTOS_LOCAL.some((p) => p.ClaveProducto === clave && p.ULID !== excludeId)
    }
  }

  static async obtenerEstadisticas(): Promise<any> {
    try {
      const API_BASE_URL = process.env.API_URL || process.env.API_URL_LOCAL || "http://localhost:3001"
      const response = await fetch(`${API_BASE_URL}/api/productos/estadisticas`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.warn("API no disponible, usando datos locales:", error)
      return {
        totalProductos: PRODUCTOS_LOCAL.length,
        productosFavoritos: PRODUCTOS_LOCAL.filter((p) => p.Favorito).length,
        productosSuspendidos: PRODUCTOS_LOCAL.filter((p) => p.Suspendido).length,
        stockBajo: PRODUCTOS_LOCAL.filter((p) => p.Stock <= p.StockMinimo).length,
      }
    }
  }

  static filtrarProductos(
    productos: IGetProducto[],
    filtros: {
      busqueda?: string
      tipo?: string
      favoritos?: boolean
      suspendidos?: boolean
      grupo?: string
      subgrupo?: string
    },
  ): IGetProducto[] {
    let productosFiltrados = [...productos]

    if (filtros.busqueda) {
      const busqueda = filtros.busqueda.toLowerCase()
      productosFiltrados = productosFiltrados.filter(
        (producto) =>
          producto.Nombredelproducto.toLowerCase().includes(busqueda) ||
          producto.ClaveProducto.toLowerCase().includes(busqueda) ||
          producto.Descripcion.toLowerCase().includes(busqueda),
      )
    }

    if (filtros.tipo && filtros.tipo !== "todos") {
      productosFiltrados = productosFiltrados.filter((producto) => producto.TipoProducto === filtros.tipo)
    }

    if (filtros.favoritos !== undefined) {
      productosFiltrados = productosFiltrados.filter((producto) => producto.Favorito === filtros.favoritos)
    }

    if (filtros.suspendidos !== undefined) {
      productosFiltrados = productosFiltrados.filter((producto) => producto.Suspendido === filtros.suspendidos)
    }

    if (filtros.grupo && filtros.grupo !== "todos") {
      productosFiltrados = productosFiltrados.filter((producto) => producto.GrupoProductoULID === filtros.grupo)
    }

    if (filtros.subgrupo && filtros.subgrupo !== "todos") {
      productosFiltrados = productosFiltrados.filter((producto) => producto.SubgrupoProductoULID === filtros.subgrupo)
    }

    return productosFiltrados
  }
}

export type Producto = IGetProducto
