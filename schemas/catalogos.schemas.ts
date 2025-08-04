import { z } from "zod"

// Esquema para Área de Producción
export const areaProduccionSchema = z.object({
  clave: z
    .string()
    .min(1, "La clave es requerida")
    .max(10, "La clave no puede tener más de 10 caracteres")
    .regex(/^[A-Z0-9]+$/, "La clave solo puede contener letras mayúsculas y números"),
  descripcion: z
    .string()
    .min(1, "La descripción es requerida")
    .max(100, "La descripción no puede tener más de 100 caracteres"),
  impresora: z.string().optional(),
  activa: z.boolean().default(true),
})

export type AreaProduccionFormValues = z.infer<typeof areaProduccionSchema>

// Esquema para Grupo
export const grupoSchema = z.object({
  clave: z
    .string()
    .min(1, "La clave es requerida")
    .max(10, "La clave no puede tener más de 10 caracteres")
    .regex(/^[A-Z0-9]+$/, "La clave solo puede contener letras mayúsculas y números"),
  nombre: z.string().min(1, "El nombre es requerido").max(50, "El nombre no puede tener más de 50 caracteres"),
  descripcion: z.string().optional(),
  activo: z.boolean().default(true),
})

export type GrupoFormValues = z.infer<typeof grupoSchema>

// Esquema para Subgrupo
export const subgrupoSchema = z.object({
  clave: z
    .string()
    .min(1, "La clave es requerida")
    .max(10, "La clave no puede tener más de 10 caracteres")
    .regex(/^[A-Z0-9]+$/, "La clave solo puede contener letras mayúsculas y números"),
  nombre: z.string().min(1, "El nombre es requerido").max(50, "El nombre no puede tener más de 50 caracteres"),
  descripcion: z.string().optional(),
  grupo_id: z.string().min(1, "El grupo es requerido"),
  activo: z.boolean().default(true),
})

export type SubgrupoFormValues = z.infer<typeof subgrupoSchema>

// Esquema para Unidad
export const unidadSchema = z.object({
  clave: z
    .string()
    .min(1, "La clave es requerida")
    .max(10, "La clave no puede tener más de 10 caracteres")
    .regex(/^[A-Z0-9]+$/, "La clave solo puede contener letras mayúsculas y números"),
  nombre: z.string().min(1, "El nombre es requerido").max(50, "El nombre no puede tener más de 50 caracteres"),
  descripcion: z.string().optional(),
  activa: z.boolean().default(true),
})

export type UnidadFormValues = z.infer<typeof unidadSchema>

// Esquema para Almacén
export const almacenSchema = z.object({
  clave_almacen: z
    .string()
    .min(1, "La clave es requerida")
    .max(10, "La clave no puede tener más de 10 caracteres")
    .regex(/^[A-Z0-9]+$/, "La clave solo puede contener letras mayúsculas y números"),
  nombre: z.string().min(1, "El nombre es requerido").max(100, "El nombre no puede tener más de 100 caracteres"),
  descripcion: z.string().optional(),
  direccion: z.string().optional(),
  activo: z.boolean().default(true),
})

export type AlmacenFormValues = z.infer<typeof almacenSchema>

// Esquema para Tipo de Cliente
export const tipoClienteSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido").max(50, "El nombre no puede tener más de 50 caracteres"),
  descripcion: z.string().optional(),
  descuento_porcentaje: z
    .number()
    .min(0, "El descuento no puede ser negativo")
    .max(100, "El descuento no puede ser mayor a 100%")
    .default(0),
  activo: z.boolean().default(true),
})

export type TipoClienteFormValues = z.infer<typeof tipoClienteSchema>

// Esquema para Método de Pago
export const metodoPagoSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido").max(50, "El nombre no puede tener más de 50 caracteres"),
  descripcion: z.string().optional(),
  requiere_referencia: z.boolean().default(false),
  activo: z.boolean().default(true),
})

export type MetodoPagoFormValues = z.infer<typeof metodoPagoSchema>
