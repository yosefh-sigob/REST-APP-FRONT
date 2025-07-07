import { db } from "@/lib/database/connection"
import { ventas } from "@/lib/database/schema"
import { eq, and, gte, lte } from "drizzle-orm"
import type { Venta, NewVenta } from "@/lib/database/connection"

export class VentasService {
  static async crear(data: NewVenta): Promise<Venta> {
    const [nuevaVenta] = await db.insert(ventas).values(data).returning()
    return nuevaVenta
  }

  static async obtenerPorId(id: string): Promise<Venta | null> {
    const [venta] = await db.select().from(ventas).where(eq(ventas.VentaULID, id)).limit(1)

    return venta || null
  }

  static async obtenerVentasActivas(empresaId: string): Promise<Venta[]> {
    return await db
      .select()
      .from(ventas)
      .where(and(eq(ventas.EmpresaULID, empresaId), eq(ventas.Cancelada, false)))
  }

  static async obtenerVentasPorFecha(empresaId: string, fechaInicio: Date, fechaFin: Date): Promise<Venta[]> {
    return await db
      .select()
      .from(ventas)
      .where(
        and(
          eq(ventas.EmpresaULID, empresaId),
          gte(ventas.FechaApertura, fechaInicio),
          lte(ventas.FechaApertura, fechaFin),
        ),
      )
  }

  static async obtenerVentasPorMesa(empresaId: string, mesaId: number): Promise<Venta[]> {
    return await db
      .select()
      .from(ventas)
      .where(and(eq(ventas.EmpresaULID, empresaId), eq(ventas.MesaULID, mesaId)))
  }

  static async actualizar(id: string, data: Partial<NewVenta>): Promise<Venta | null> {
    const [ventaActualizada] = await db
      .update(ventas)
      .set({ ...data, Fecha_UltimoCambio: new Date() })
      .where(eq(ventas.VentaULID, id))
      .returning()

    return ventaActualizada || null
  }

  static async cerrarVenta(id: string): Promise<Venta | null> {
    const [ventaCerrada] = await db
      .update(ventas)
      .set({
        FechaCierre: new Date(),
        Fecha_UltimoCambio: new Date(),
      })
      .where(eq(ventas.VentaULID, id))
      .returning()

    return ventaCerrada || null
  }

  static async cancelarVenta(id: string, usuarioId: number): Promise<Venta | null> {
    const [ventaCancelada] = await db
      .update(ventas)
      .set({
        Cancelada: true,
        FechaCancelacion: new Date(),
        UsuarioULID: usuarioId,
        Fecha_UltimoCambio: new Date(),
      })
      .where(eq(ventas.VentaULID, id))
      .returning()

    return ventaCancelada || null
  }
}
