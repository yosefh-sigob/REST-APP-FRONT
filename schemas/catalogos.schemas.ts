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
