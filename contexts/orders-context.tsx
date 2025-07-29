"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import type { KitchenOrder } from "@/interfaces/ordenes.interface"

interface OrdersContextProps {
  orders: KitchenOrder[]
  setOrders: React.Dispatch<React.SetStateAction<KitchenOrder[]>>
  pendingAndPreparingCount: number
}

const OrdersContext = createContext<OrdersContextProps | undefined>(undefined)

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<KitchenOrder[]>([])

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('/api/ordenes')
        if (response.ok) {
          const fetchedOrders = await response.json()
          setOrders(fetchedOrders)
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    }

    fetchOrders()
  }, [])

  const pendingAndPreparingCount = orders.filter(
    (order) => order.status === "pending" || order.status === "preparing"
  ).length

  return (
    <OrdersContext.Provider value={{ orders, setOrders, pendingAndPreparingCount }}>
      {children}
    </OrdersContext.Provider>
  )
}

export const useOrders = (): OrdersContextProps => {
  const context = useContext(OrdersContext)
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider")
  }
  return context
}
