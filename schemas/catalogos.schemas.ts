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
    .min(1, { message: "La clave es requerida." })
    .min(2, { message: "La clave debe tener entre 2 y 10 caracteres." })
    .max(10, { message: "La clave no puede tener más de 10 caracteres." })
    .regex(/^[A-Z0-9]+$/, { message: "La clave solo puede contener letras mayúsculas y números." })
    .transform((val) => val.toUpperCase()),
  nombre: z
    .string()
    .min(1, { message: "El nombre es requerido." })
    .min(3, { message: "El nombre debe tener al menos 3 caracteres." })
    .max(50, { message: "El nombre no puede tener más de 50 caracteres." }),
  descripcion: z
    .string()
    .max(200, { message: "La descripción no puede tener más de 200 caracteres." })
    .optional(),
  activo: z.boolean(),
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
  activa: z.boolean(),
})

export type UnidadFormValues = {
  clave: string
  nombre: string
  descripcion?: string
  activa: boolean
}

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

// Esquema para Estado de Mesa
export const estadoMesaSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido").max(50, "El nombre no puede tener más de 50 caracteres"),
  descripcion: z.string().optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Debe ser un color hexadecimal válido"),
  activo: z.boolean().default(true),
})

export type EstadoMesaFormValues = z.infer<typeof estadoMesaSchema>

// Esquema para Estado de Orden
export const estadoOrdenSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido").max(50, "El nombre no puede tener más de 50 caracteres"),
  descripcion: z.string().optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Debe ser un color hexadecimal válido"),
  permite_cancelacion: z.boolean().default(true),
  activo: z.boolean().default(true),
})

export type EstadoOrdenFormValues = z.infer<typeof estadoOrdenSchema>

// Esquema para Tipo de Reservación
export const tipoReservacionSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido").max(50, "El nombre no puede tener más de 50 caracteres"),
  descripcion: z.string().optional(),
  requiere_anticipo: z.boolean().default(false),
  porcentaje_anticipo: z.number().min(0).max(100).optional(),
  tiempo_limite_horas: z.number().min(1).max(168).default(2), // 1 hora a 1 semana
  activo: z.boolean().default(true),
})

export type TipoReservacionFormValues = z.infer<typeof tipoReservacionSchema>
