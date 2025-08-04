import { z } from "zod"

// Esquema para Grupos
export const grupoSchema = z.object({
  id: z.string().optional(),
  nombre: z
    .string({ required_error: "El nombre es requerido." })
    .min(3, { message: "El nombre debe tener al menos 3 caracteres." })
    .max(50, { message: "El nombre no puede tener más de 50 caracteres." }),
  descripcion: z
    .string()
    .max(200, { message: "La descripción no puede tener más de 200 caracteres." })
    .optional()
    .or(z.literal("")),
  area_produccion_id: z.string({ required_error: "El área de producción es requerida." }),
  activo: z.boolean().default(true),
})

export type GrupoFormValues = z.infer<typeof grupoSchema>

// Esquema para Subgrupos
export const subgrupoSchema = z.object({
  id: z.string().optional(),
  nombre: z
    .string({ required_error: "El nombre es requerido." })
    .min(3, { message: "El nombre debe tener al menos 3 caracteres." })
    .max(50, { message: "El nombre no puede tener más de 50 caracteres." }),
  descripcion: z
    .string()
    .max(200, { message: "La descripción no puede tener más de 200 caracteres." })
    .optional()
    .or(z.literal("")),
  grupo_id: z.string({ required_error: "El grupo es requerido." }),
  activo: z.boolean().default(true),
})

export type SubgrupoFormValues = z.infer<typeof subgrupoSchema>

// Esquema para Unidades de Medida
export const unidadSchema = z.object({
  id: z.string().optional(),
  clave: z
    .string({ required_error: "La clave es requerida." })
    .min(1, { message: "La clave debe tener al menos 1 carácter." })
    .max(10, { message: "La clave no puede tener más de 10 caracteres." })
    .regex(/^[A-Z0-9]+$/, { message: "La clave solo puede contener letras mayúsculas y números." }),
  nombre: z
    .string({ required_error: "El nombre es requerido." })
    .min(3, { message: "El nombre debe tener al menos 3 caracteres." })
    .max(50, { message: "El nombre no puede tener más de 50 caracteres." }),
  abreviacion: z
    .string({ required_error: "La abreviación es requerida." })
    .min(1, { message: "La abreviación debe tener al menos 1 carácter." })
    .max(5, { message: "La abreviación no puede tener más de 5 caracteres." }),
  descripcion: z
    .string()
    .max(200, { message: "La descripción no puede tener más de 200 caracteres." })
    .optional()
    .or(z.literal("")),
  activo: z.boolean().default(true),
})

export type UnidadFormValues = z.infer<typeof unidadSchema>

// Esquema para Áreas de Producción
export const areaProduccionSchema = z.object({
  id: z.string().optional(),
  clave: z
    .string({ required_error: "La clave es requerida." })
    .min(2, { message: "La clave debe tener al menos 2 caracteres." })
    .max(10, { message: "La clave no puede tener más de 10 caracteres." })
    .regex(/^[A-Z0-9]+$/, { message: "La clave solo puede contener letras mayúsculas y números." }),
  descripcion: z
    .string({ required_error: "La descripción es requerida." })
    .min(3, { message: "La descripción debe tener al menos 3 caracteres." })
    .max(100, { message: "La descripción no puede tener más de 100 caracteres." }),
  impresora: z
    .string()
    .max(50, { message: "El nombre de la impresora no puede tener más de 50 caracteres." })
    .optional()
    .or(z.literal("")),
  activa: z.boolean().default(true),
})

export type AreaProduccionFormValues = z.infer<typeof areaProduccionSchema>
