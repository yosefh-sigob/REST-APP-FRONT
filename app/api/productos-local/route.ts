import { NextResponse } from "next/server"
import { 
  obtenerProductosLocal, 
  obtenerProductoPorIdLocal, 
  crearProductoLocal, 
  actualizarProductoLocal, 
  eliminarProductoLocal 
} from "@/actions/productos.actions"

// GET - Obtener todos los productos o uno específico por ID (datos locales)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (id) {
      // Obtener producto específico
      const result = await obtenerProductoPorIdLocal(id)
      
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 404 })
      }
      
      return NextResponse.json(result.data)
    } else {
      // Obtener todos los productos
      const result = await obtenerProductosLocal()
      
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 500 })
      }
      
      return NextResponse.json(result.data)
    }
  } catch (error) {
    console.error("Error in productos API:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

// POST - Crear nuevo producto
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await crearProductoLocal(body)
    
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }
    
    return NextResponse.json(result.data, { status: 201 })
  } catch (error) {
    console.error("Error creating producto:", error)
    return NextResponse.json({ error: "Error creando producto" }, { status: 500 })
  }
}

// PATCH - Actualizar producto existente
export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: "ID del producto es requerido" }, { status: 400 })
    }
    
    const body = await request.json()
    const result = await actualizarProductoLocal(id, body)
    
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: result.error === "Producto no encontrado" ? 404 : 500 })
    }
    
    return NextResponse.json(result.data)
  } catch (error) {
    console.error("Error updating producto:", error)
    return NextResponse.json({ error: "Error actualizando producto" }, { status: 500 })
  }
}

// DELETE - Eliminar producto
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: "ID del producto es requerido" }, { status: 400 })
    }
    
    const result = await eliminarProductoLocal(id)
    
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: result.error === "Producto no encontrado" ? 404 : 500 })
    }
    
    return NextResponse.json({ success: true, message: result.message })
  } catch (error) {
    console.error("Error deleting producto:", error)
    return NextResponse.json({ error: "Error eliminando producto" }, { status: 500 })
  }
}
