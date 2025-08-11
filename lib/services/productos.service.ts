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
