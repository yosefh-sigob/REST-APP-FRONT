import { db } from "@/lib/database/connection"
import { mesas } from "@/lib/database/schema"
import { eq, and } from "drizzle-orm"
import type { Mesa, NewMesa } from "@/lib/database/connection"

export class MesasService {
  static async crear(data: NewMesa): Promise<Mesa> {
    const [nuevaMesa] = await db.insert(mesas).values(data).returning()
    return nuevaMesa
  }

  static async obtenerPorId(id: string): Promise<Mesa | null> {
    const [mesa] = await db.select().from(mesas).where(eq(mesas.MesaULID, id)).limit(1)

    return mesa || null
  }

  static async obtenerPorEmpresa(empresaId: string): Promise<Mesa[]> {
    return await db.select().from(mesas).where(eq(mesas.EmpresaULID, empresaId))
  }

  static async obtenerPorArea(empresaId: string, areaId: number): Promise<Mesa[]> {
    return await db
      .select()
      .from(mesas)
      .where(and(eq(mesas.EmpresaULID, empresaId), eq(mesas.AreaVentasULID, areaId)))
  }

  static async actualizar(id: string, data: Partial<NewMesa>): Promise<Mesa | null> {
    const [mesaActualizada] = await db
      .update(mesas)
      .set({ ...data, Fecha_UltimoCambio: new Date() })
      .where(eq(mesas.MesaULID, id))
      .returning()

    return mesaActualizada || null
  }

  static async eliminar(id: string): Promise<boolean> {
    const resultado = await db.delete(mesas).where(eq(mesas.MesaULID, id))

    return resultado.rowCount > 0
  }
}
