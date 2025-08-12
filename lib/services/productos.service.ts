import type { IGetProducto } from "@/interfaces/productos.interface"

const MOCK_PRODUCTOS: IGetProducto[] = [
  {
    ULID: "01HXYZ123456789ABCDEFGHIJ",
    ClaveProducto: "PROD001",
    Nombredelproducto: "Hamburguesa Clásica",
    Descripcion: "Hamburguesa con carne, lechuga, tomate y queso",
    TipoProducto: "Plato Principal",
    PrecioVenta: 150.0,
    Favorito: true,
    Suspendido: false,
    GrupoProductoULID: "01GRUPO123456789ABCDEFGH",
    SubgrupoProductoULID: "01SUBGR123456789ABCDEFGH",
    UnidadULID: "01UNIDAD123456789ABCDEFG",
    AlmacenULID: "01ALMAC123456789ABCDEFGH",
    AreaProduccionULID: "01AREAP123456789ABCDEFGH",
    CostoPromedio: 80.0,
    Stock: 50,
    StockMinimo: 10,
    StockMaximo: 100,
    FechaCreacion: new Date().toISOString(),
    FechaActualizacion: new Date().toISOString(),
  },
  {
    ULID: "01HXYZ123456789ABCDEFGHIK",
    ClaveProducto: "PROD002",
    Nombredelproducto: "Pizza Margherita",
    Descripcion: "Pizza con salsa de tomate, mozzarella y albahaca",
    TipoProducto: "Plato Principal",
    PrecioVenta: 200.0,
    Favorito: false,
    Suspendido: false,
    GrupoProductoULID: "01GRUPO123456789ABCDEFGH",
    SubgrupoProductoULID: "01SUBGR123456789ABCDEFGH",
    UnidadULID: "01UNIDAD123456789ABCDEFG",
    AlmacenULID: "01ALMAC123456789ABCDEFGH",
    AreaProduccionULID: "01AREAP123456789ABCDEFGH",
    CostoPromedio: 120.0,
    Stock: 30,
    StockMinimo: 5,
    StockMaximo: 50,
    FechaCreacion: new Date().toISOString(),
    FechaActualizacion: new Date().toISOString(),
  },
]

const MOCK_GRUPOS = [
  { ULID: "01GRUPO123456789ABCDEFGH", Nombre: "Comida Rápida", Activo: true },
  { ULID: "01GRUPO123456789ABCDEFGI", Nombre: "Bebidas", Activo: true },
]

const MOCK_SUBGRUPOS = [
  { ULID: "01SUBGR123456789ABCDEFGH", Nombre: "Hamburguesas", GrupoULID: "01GRUPO123456789ABCDEFGH", Activo: true },
  { ULID: "01SUBGR123456789ABCDEFGI", Nombre: "Pizzas", GrupoULID: "01GRUPO123456789ABCDEFGH", Activo: true },
]

const MOCK_UNIDADES = [
  { ULID: "01UNIDAD123456789ABCDEFG", Nombre: "Pieza", Abreviacion: "pza", Activo: true },
  { ULID: "01UNIDAD123456789ABCDEFH", Nombre: "Kilogramo", Abreviacion: "kg", Activo: true },
]

const MOCK_AREAS_PRODUCCION = [
  { ULID: "01AREAP123456789ABCDEFGH", Nombre: "Cocina Principal", Activo: true },
  { ULID: "01AREAP123456789ABCDEFGI", Nombre: "Parrilla", Activo: true },
]

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
      console.warn("API no disponible, usando datos mock:", error)
      return MOCK_PRODUCTOS
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
      console.warn("API no disponible, usando datos mock:", error)
      return MOCK_PRODUCTOS.find((p) => p.ULID === id) || null
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
      console.warn("API no disponible, usando datos mock:", error)
      return MOCK_GRUPOS
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
      console.warn("API no disponible, usando datos mock:", error)
      return MOCK_SUBGRUPOS
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
      console.warn("API no disponible, usando datos mock:", error)
      return MOCK_UNIDADES
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
      console.warn("API no disponible, usando datos mock:", error)
      return MOCK_AREAS_PRODUCCION
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
      console.warn("API no disponible, usando datos mock:", error)
      // Return mock created product
      return {
        ...MOCK_PRODUCTOS[0],
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
      console.warn("API no disponible, usando datos mock:", error)
      // Return mock updated product
      const existing = MOCK_PRODUCTOS.find((p) => p.ULID === id) || MOCK_PRODUCTOS[0]
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
      console.warn("API no disponible, usando datos mock:", error)
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
      console.warn("API no disponible, usando datos mock:", error)
      const existing = MOCK_PRODUCTOS.find((p) => p.ULID === id) || MOCK_PRODUCTOS[0]
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
      console.warn("API no disponible, usando datos mock:", error)
      const existing = MOCK_PRODUCTOS.find((p) => p.ULID === id) || MOCK_PRODUCTOS[0]
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
      console.warn("API no disponible, usando datos mock:", error)
      // Mock validation - check if clave exists in mock data
      return MOCK_PRODUCTOS.some((p) => p.ClaveProducto === clave && p.ULID !== excludeId)
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
      console.warn("API no disponible, usando datos mock:", error)
      return {
        totalProductos: MOCK_PRODUCTOS.length,
        productosFavoritos: MOCK_PRODUCTOS.filter((p) => p.Favorito).length,
        productosSuspendidos: MOCK_PRODUCTOS.filter((p) => p.Suspendido).length,
        stockBajo: MOCK_PRODUCTOS.filter((p) => p.Stock <= p.StockMinimo).length,
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
