import { type NextRequest, NextResponse } from "next/server"
import { EmpresaService } from "@/lib/services/empresa.service"
import { empresaSchema } from "@/lib/utils/validations"
import { generateULID } from "@/lib/utils/ulid"

export async function GET() {
  try {
    const empresas = await EmpresaService.obtenerTodas()
    return NextResponse.json(empresas)
  } catch (error) {
    console.error("Error al obtener empresas:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar datos
    const validatedData = empresaSchema.parse(body)

    // Generar ULID
    const empresaData = {
      EmpresaULID: generateULID(),
      ...validatedData,
      FechaRegistro: new Date(),
      Fecha_UltimoCambio: new Date(),
    }

    const nuevaEmpresa = await EmpresaService.crear(empresaData)

    return NextResponse.json(nuevaEmpresa, { status: 201 })
  } catch (error) {
    console.error("Error al crear empresa:", error)

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Datos de entrada inválidos", details: error.message }, { status: 400 })
    }

    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
