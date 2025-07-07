import { type NextRequest, NextResponse } from "next/server"
import { ProductosService } from "@/lib/services/productos.service"
import { productoSchema } from "@/lib/utils/validations"
import { generateULID } from "@/lib/utils/ulid"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const empresaId = searchParams.get("empresaId")
    const termino = searchParams.get("buscar")
    const activos = searchParams.get("activos")

    if (!empresaId) {
      return NextResponse.json({ error: "ID de empresa requerido" }, { status: 400 })
    }

    let productos

    if (termino) {
      productos = await ProductosService.buscarProductos(empresaId, termino)
    } else if (activos === "true") {
      productos = await ProductosService.obtenerProductosActivos(empresaId)
    } else {
      productos = await ProductosService.obtenerPorEmpresa(empresaId)
    }

    return NextResponse.json(productos)
  } catch (error) {
    console.error("Error al obtener productos:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar datos
    const validatedData = productoSchema.parse(body)

    // Generar ULID
    const productoData = {
      ProductoULID: generateULID(),
      ...validatedData,
      Fecha_UltimoCambio: new Date(),
      Fecha_Sync: new Date(),
    }

    const nuevoProducto = await ProductosService.crear(productoData)

    return NextResponse.json(nuevoProducto, { status: 201 })
  } catch (error) {
    console.error("Error al crear producto:", error)

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Datos de entrada inválidos", details: error.message }, { status: 400 })
    }

    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
