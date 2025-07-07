import { z } from "zod"

// Esquema base para producto
export const productoBaseSchema = z.object({
  ClaveProducto: z.string().min(1, "La clave del producto es requerida").max(10, "Máximo 10 caracteres"),
  TipoProducto: z.enum(["Platillo", "Producto", "Botella"], {
    required_error: "El tipo de producto es requerido",
  }),
  Nombredelproducto: z.string().min(1, "El nombre del producto es requerido").max(50, "Máximo 50 caracteres"),
  Descripcion: z.string().optional(),
  Imagen: z.string().optional(),
  Favorito: z.boolean().default(false),
  ExentoImpuesto: z.boolean().default(false),
  PrecioAbierto: z.boolean().default(false),
  ControlStock: z.boolean().default(false),
  PrecioxUtilidad: z.boolean().default(false),
  Facturable: z.boolean().default(true),
  ClaveTributaria: z.string().optional(),
  Suspendido: z.boolean().default(false),
  Comedor: z.boolean().default(false),
  ADomicilio: z.boolean().default(false),
  Mostrador: z.boolean().default(false),
  Enlinea: z.boolean().default(false),
  EnAPP: z.boolean().default(false),
  EnMenuQR: z.boolean().default(false),

  // IDs opcionales para relaciones
  GrupoProductoID: z.string().optional(),
  SubgrupoProductoID: z.string().optional(),
  UnidadID: z.string().optional(),
  AreaProduccionID: z.string().optional(),
  AlmacenID: z.string().optional(),
  ClasificacionQRID: z.string().optional(),
})

// Esquema para crear producto
export const createProductoSchema = productoBaseSchema

// Esquema para actualizar producto
export const updateProductoSchema = productoBaseSchema.partial()

// Esquema completo del producto (incluye campos del sistema)
export const productoSchema = productoBaseSchema.extend({
  ProductoULID: z.string(),
  Fecha_UltimoCambio: z.string().optional(),
  Fecha_Sync: z.string().optional(),
  UsuarioULID: z.string().optional(),
  EmpresaULID: z.string().optional(),
})

// Tipos TypeScript
export type CreateProductoInput = z.infer<typeof createProductoSchema>
export type UpdateProductoInput = z.infer<typeof updateProductoSchema>
export type Producto = z.infer<typeof productoSchema>

// Esquemas para respuestas de API
export const getProductosResponseSchema = z.object({
  productos: z.array(productoSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
})

export type GetProductosResponse = z.infer<typeof getProductosResponseSchema>
