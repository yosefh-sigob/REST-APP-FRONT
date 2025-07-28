export interface ItemInventario {
  id: string
  nombre: string
  categoria: CategoriaInventario
  unidad: UnidadMedida
  cantidadActual: number
  cantidadMinima: number
  cantidadMaxima: number
  costoUnitario: number
  proveedor: string
  fechaVencimiento: string
  ubicacion: string
  estado: EstadoInventario
  fechaUltimaActualizacion: string
  actualizadoPor: string
}

export type CategoriaInventario =
  | "Carnes"
  | "Verduras"
  | "Frutas"
  | "Lácteos"
  | "Granos"
  | "Aceites"
  | "Condimentos"
  | "Pastas"
  | "Bebidas"
  | "Otros"

export type UnidadMedida = "kg" | "gramos" | "litros" | "ml" | "unidades" | "piezas"

export type EstadoInventario = "disponible" | "bajo_stock" | "critico" | "agotado" | "vencido"

export interface EstadisticasInventario {
  totalItems: number
  itemsDisponibles: number
  itemsBajoStock: number
  itemsCriticos: number
  itemsAgotados: number
  valorTotalInventario: number
  itemsProximosVencer: number
}

export interface FiltrosInventario {
  categoria?: CategoriaInventario
  estado?: EstadoInventario
  busqueda?: string
  proximosVencer?: boolean
}

export interface MovimientoInventario {
  id: string
  itemId: string
  tipo: "entrada" | "salida" | "ajuste"
  cantidad: number
  motivo: string
  fecha: string
  usuario: string
  observaciones?: string
}

export interface ActualizacionInventario {
  itemId: string
  cantidadActual: number
  observaciones?: string
}
