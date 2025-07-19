"use client"

import { useOrders } from "@/contexts/orders-context"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircleIcon, ClockIcon, UtensilsCrossedIcon } from "lucide-react"
import type { KitchenOrder, KitchenOrderStatus } from "@/interfaces/ordenes.interface"
import { cn } from "@/lib/utils" // Para unir clases condicionalmente

interface CocinaOrdenesViewProps {
  initialOrders: KitchenOrder[]
}

export default function CocinaOrdenesView({ initialOrders }: CocinaOrdenesViewProps) {
  const { orders, setOrders } = useOrders()

  const updateOrderStatus = (orderId: string, newStatus: KitchenOrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus, updatedAt: new Date().toISOString() } : order,
      ),
    )
  }

  const getStatusBadgeClass = (status: KitchenOrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500 text-yellow-50"
      case "preparing":
        return "bg-blue-500 text-blue-50"
      case "ready":
        return "bg-green-500 text-green-50"
      default:
        return ""
    }
  }

  const getStatusIcon = (status: KitchenOrderStatus) => {
    switch (status) {
      case "pending":
        return <ClockIcon className="h-4 w-4 mr-1" />
      case "preparing":
        return <UtensilsCrossedIcon className="h-4 w-4 mr-1" />
      case "ready":
        return <CheckCircleIcon className="h-4 w-4 mr-1" />
      default:
        return null
    }
  }

  const sortedOrders = orders.sort((a, b) => {
    const statusOrder = {
      preparing: 1,
      pending: 2,
      ready: 3,
    }
    return statusOrder[a.status] - statusOrder[b.status]
  })

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Órdenes de Cocina</h1>
      <ScrollArea className="h-[calc(100vh-150px)]">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedOrders.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No hay órdenes pendientes.</p>
          ) : (
            sortedOrders.map((order) => (
              <Card key={order.id} className="flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <span>Orden #{order.tableNumber}</span>
                    <Badge
                      className={cn(
                        "text-xs px-2 py-1 rounded-full flex items-center",
                        getStatusBadgeClass(order.status),
                      )}
                    >
                      {getStatusIcon(order.status)}
                      {order.status === "pending"
                        ? "Pendiente"
                        : order.status === "preparing"
                          ? "En preparación"
                          : "Lista"}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    Creada: {new Date(order.createdAt).toLocaleTimeString()}
                    {order.updatedAt && order.status !== "pending" && (
                      <span> | Actualizada: {new Date(order.updatedAt).toLocaleTimeString()}</span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <h3 className="font-semibold mb-2">Items:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.quantity}x {item.name}
                        {item.notes && <span className="text-gray-500 italic"> ({item.notes})</span>}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="p-4 border-t flex gap-2">
                  {order.status === "pending" && (
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => updateOrderStatus(order.id, "preparing")}
                    >
                      Empezar a Preparar
                    </Button>
                  )}
                  {order.status === "preparing" && (
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => updateOrderStatus(order.id, "ready")}
                    >
                      Marcar como Lista
                    </Button>
                  )}
                  {order.status === "ready" && (
                    <Button variant="secondary" className="w-full" disabled>
                      Lista para Entregar
                    </Button>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
