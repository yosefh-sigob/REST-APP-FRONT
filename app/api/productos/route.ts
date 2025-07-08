import { type NextRequest, NextResponse } from "next/server"
import { ProductosService } from "@/lib/services/productos.service"
import { ProductoFormSchema } from "@/schemas/productos.schemas"
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

    // Por ahora solo obtenemos todos los productos ya que el servicio no tiene métodos específicos
    const productos = await ProductosService.obtenerProductos()

    return NextResponse.json(productos)
  } catch (error) {
    console.error("Error al obtener productos:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Extraer campos requeridos del body
    const { UsuarioULID, EmpresaULID, ...datosProducto } = body

    if (!UsuarioULID || !EmpresaULID) {
      return NextResponse.json({ 
        error: "UsuarioULID y EmpresaULID son requeridos" 
      }, { status: 400 })
    }

    // Validar datos del producto
    const validatedData = ProductoFormSchema.parse(datosProducto)

    // Preparar datos para el servicio (fechas como string para el mock)
    const productoData = {
      ...validatedData,
      ProductoULID: generateULID(),
      Fecha_UltimoCambio: new Date().toISOString(),
      Fecha_Sync: new Date().toISOString(),
      UsuarioULID: UsuarioULID.toString(),
      EmpresaULID: EmpresaULID.toString(),
    }

    const nuevoProducto = await ProductosService.crearProducto(productoData)

    return NextResponse.json(nuevoProducto, { status: 201 })
  } catch (error) {
    console.error("Error al crear producto:", error)

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Datos de entrada inválidos", details: error.message }, { status: 400 })
    }

    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
