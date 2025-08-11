import type { IGetProducto } from "@/interfaces/productos.interface"

export class ProductosService {
  static async obtenerProductos(): Promise<IGetProducto[]> {
    try {
      const API_BASE_URL = process.env.API_URL || process.env.API_URL_LOCAL || "http://localhost:3001"
      const response = await fetch(`${API_BASE_URL}/api/productos`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const productos = await response.json()
      return productos
    } catch (error) {
      console.error("Error fetching productos:", error)
      // Return mock data as fallback for development
      return [
        {
          ULID: "01HXAMPLE1234567890ABCDEF",
          ClaveProducto: "PROD001",
          Nombredelproducto: "Hamburguesa Clásica",
          Descripcion: "Hamburguesa con carne, lechuga, tomate y queso",
          TipoProducto: "Plato Principal",
          PrecioVenta: 150.0,
          Favorito: true,
          Suspendido: false,
          GrupoProductoULID: "01HXAMPLE1234567890GRUPO1",
          SubgrupoProductoULID: "01HXAMPLE1234567890SUBGR1",
          UnidadULID: "01HXAMPLE1234567890UNIDAD",
          AlmacenULID: "01HXAMPLE1234567890ALMACN",
          AreaProduccionULID: "01HXAMPLE1234567890AREAP1",
          FechaCreacion: new Date().toISOString(),
          FechaActualizacion: new Date().toISOString(),
        },
        {
          ULID: "01HXAMPLE1234567890ABCDE2",
          ClaveProducto: "PROD002",
          Nombredelproducto: "Pizza Margherita",
          Descripcion: "Pizza con salsa de tomate, mozzarella y albahaca",
          TipoProducto: "Plato Principal",
          PrecioVenta: 180.0,
          Favorito: false,
          Suspendido: false,
          GrupoProductoULID: "01HXAMPLE1234567890GRUPO2",
          SubgrupoProductoULID: "01HXAMPLE1234567890SUBGR2",
          UnidadULID: "01HXAMPLE1234567890UNIDAD",
          AlmacenULID: "01HXAMPLE1234567890ALMACN",
          AreaProduccionULID: "01HXAMPLE1234567890AREAP2",
          FechaCreacion: new Date().toISOString(),
          FechaActualizacion: new Date().toISOString(),
        },
      ]
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
