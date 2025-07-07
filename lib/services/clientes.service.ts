import { db } from "@/lib/database/connection"
import { clientes } from "@/lib/database/schema"
import { eq, and, like, or } from "drizzle-orm"
import type { Cliente, NewCliente } from "@/lib/database/connection"

export class ClientesService {
  static async crear(data: NewCliente): Promise<Cliente> {
    const [nuevoCliente] = await db.insert(clientes).values(data).returning()
    return nuevoCliente
  }

  static async obtenerPorId(id: string): Promise<Cliente | null> {
    const [cliente] = await db.select().from(clientes).where(eq(clientes.ClienteULID, id)).limit(1)

    return cliente || null
  }

  static async obtenerPorCelular(celular: string, empresaId: string): Promise<Cliente | null> {
    const [cliente] = await db
      .select()
      .from(clientes)
      .where(and(eq(clientes.Celular, celular), eq(clientes.EmpresaULID, empresaId)))
      .limit(1)

    return cliente || null
  }

  static async buscarClientes(empresaId: string, termino: string): Promise<Cliente[]> {
    return await db
      .select()
      .from(clientes)
      .where(
        and(
          eq(clientes.EmpresaULID, empresaId),
          or(
            like(clientes.Nombres, `%${termino}%`),
            like(clientes.Apellidos, `%${termino}%`),
            like(clientes.Celular, `%${termino}%`),
            like(clientes.Correo, `%${termino}%`),
          ),
        ),
      )
  }

  static async obtenerClientesActivos(empresaId: string): Promise<Cliente[]> {
    return await db
      .select()
      .from(clientes)
      .where(and(eq(clientes.EmpresaULID, empresaId), eq(clientes.Suspendido, false)))
  }

  static async actualizar(id: string, data: Partial<NewCliente>): Promise<Cliente | null> {
    const [clienteActualizado] = await db
      .update(clientes)
      .set({ ...data, Fecha_UltimoCambio: new Date() })
      .where(eq(clientes.ClienteULID, id))
      .returning()

    return clienteActualizado || null
  }

  static async suspender(id: string): Promise<Cliente | null> {
    const [clienteSuspendido] = await db
      .update(clientes)
      .set({
        Suspendido: true,
        Fecha_UltimoCambio: new Date(),
      })
      .where(eq(clientes.ClienteULID, id))
      .returning()

    return clienteSuspendido || null
  }

  static async reactivar(id: string): Promise<Cliente | null> {
    const [clienteReactivado] = await db
      .update(clientes)
      .set({
        Suspendido: false,
        Fecha_UltimoCambio: new Date(),
      })
      .where(eq(clientes.ClienteULID, id))
      .returning()

    return clienteReactivado || null
  }
}
