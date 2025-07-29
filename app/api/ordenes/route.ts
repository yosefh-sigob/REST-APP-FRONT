import { NextResponse } from "next/server"
import { getOrdenes, createOrden, updateOrdenStatus, deleteOrden } from "@/actions/cocinaOrdenes.actions"

// GET - Obtener todas las órdenes
export async function GET() {
  try {
    const orders = await getOrdenes()
    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching kitchen orders:", error)
    return NextResponse.json({ error: "Error fetching orders" }, { status: 500 })
  }
}

// POST - Crear nueva orden
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newOrder = await createOrden(body)
    
    if (!newOrder) {
      return NextResponse.json({ error: "Error creating order" }, { status: 500 })
    }
    
    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    console.error("Error creating kitchen order:", error)
    return NextResponse.json({ error: "Error creating order" }, { status: 500 })
  }
}

// PATCH - Actualizar estado de orden
export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const { status } = await request.json()
    
    if (!id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }
    
    const success = await updateOrdenStatus(id, status)
    
    if (!success) {
      return NextResponse.json({ error: "Order not found or update failed" }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating kitchen order:", error)
    return NextResponse.json({ error: "Error updating order" }, { status: 500 })
  }
}

// DELETE - Eliminar orden
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }
    
    const success = await deleteOrden(id)
    
    if (!success) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting kitchen order:", error)
    return NextResponse.json({ error: "Error deleting order" }, { status: 500 })
  }
}
