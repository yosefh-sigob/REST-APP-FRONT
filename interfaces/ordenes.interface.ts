export interface KitchenOrderItem {
  id: string
  productId: string
  name: string
  quantity: number
  notes?: string
}

export type KitchenOrderStatus = "pending" | "preparing" | "ready"

export interface KitchenOrder {
  id: string
  tableNumber: number
  status: KitchenOrderStatus
  items: KitchenOrderItem[]
  createdAt: string // ISO string
  updatedAt?: string // ISO string
}

// Interfaces para órdenes de meseros
export interface MeseroOrderItem {
  id: string
  productoId: string
  nombre: string
  cantidad: number
  precio: number
  subtotal: number
  notas?: string
}

export type MeseroOrderStatus = "pendiente" | "en_preparacion" | "lista" | "entregada" | "cancelada"

export interface MeseroOrder {
  id: string
  mesaId: string
  numeroMesa: number
  meseroId: string
  meseroNombre: string
  clienteNombre?: string
  estado: MeseroOrderStatus
  items: MeseroOrderItem[]
  total: number
  fechaCreacion: string // ISO string
  fechaActualizacion: string // ISO string
  tiempoEstimado: number // minutos
  observaciones?: string
}

export interface MeseroOrderStats {
  total: number
  pendientes: number
  enPreparacion: number
  listas: number
  entregadas: number
}
