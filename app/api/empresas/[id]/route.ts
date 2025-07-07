import { type NextRequest, NextResponse } from "next/server"
import { EmpresaService } from "@/lib/services/empresa.service"
import { empresaSchema } from "@/lib/utils/validations"
import { isValidULID } from "@/lib/utils/ulid"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!isValidULID(id)) {
      return NextResponse.json({ error: "ID de empresa inválido" }, { status: 400 })
    }

    const empresa = await EmpresaService.obtenerPorId(id)

    if (!empresa) {
      return NextResponse.json({ error: "Empresa no encontrada" }, { status: 404 })
    }

    return NextResponse.json(empresa)
  } catch (error) {
    console.error("Error al obtener empresa:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()

    if (!isValidULID(id)) {
      return NextResponse.json({ error: "ID de empresa inválido" }, { status: 400 })
    }

    // Validar datos (parcial para actualización)
    const validatedData = empresaSchema.partial().parse(body)

    const empresaActualizada = await EmpresaService.actualizar(id, validatedData)

    if (!empresaActualizada) {
      return NextResponse.json({ error: "Empresa no encontrada" }, { status: 404 })
    }

    return NextResponse.json(empresaActualizada)
  } catch (error) {
    console.error("Error al actualizar empresa:", error)

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Datos de entrada inválidos", details: error.message }, { status: 400 })
    }

    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!isValidULID(id)) {
      return NextResponse.json({ error: "ID de empresa inválido" }, { status: 400 })
    }

    const eliminado = await EmpresaService.eliminar(id)

    if (!eliminado) {
      return NextResponse.json({ error: "Empresa no encontrada" }, { status: 404 })
    }

    return NextResponse.json({ message: "Empresa eliminada exitosamente" })
  } catch (error) {
    console.error("Error al eliminar empresa:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
