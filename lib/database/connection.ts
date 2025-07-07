import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

// Configuración de la base de datos
const connectionString = process.env.DATABASE_URL || "postgresql://localhost:5432/apprest"

// Crear conexión
const client = postgres(connectionString)
export const db = drizzle(client, { schema })

// Tipos derivados del esquema
export type Empresa = typeof schema.empresa.$inferSelect
export type NewEmpresa = typeof schema.empresa.$inferInsert
export type Usuario = typeof schema.usuarios.$inferSelect
export type NewUsuario = typeof schema.usuarios.$inferInsert
export type Producto = typeof schema.productos.$inferSelect
export type NewProducto = typeof schema.productos.$inferInsert
export type Mesa = typeof schema.mesas.$inferSelect
export type NewMesa = typeof schema.mesas.$inferInsert
export type Venta = typeof schema.ventas.$inferSelect
export type NewVenta = typeof schema.ventas.$inferInsert
export type Cliente = typeof schema.clientes.$inferSelect
export type NewCliente = typeof schema.clientes.$inferInsert
