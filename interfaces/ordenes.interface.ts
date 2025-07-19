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
