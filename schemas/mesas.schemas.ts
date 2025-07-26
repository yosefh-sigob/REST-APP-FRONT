import { z } from "zod"

export const mesaSchema = z.object({
  numero: z.number().min(1, "El número de mesa debe ser mayor a 0"),
  capacidad: z.number().min(1, "La capacidad debe ser mayor a 0").max(20, "La capacidad máxima es 20"),
  ubicacion: z.string().min(1, "La ubicación es requerida"),
  observaciones: z.string().optional(),
})

export const actualizarEstadoMesaSchema = z.object({
  estado: z.enum(["libre", "ocupada", "reservada", "limpieza"], {
    required_error: "El estado es requerido",
  }),
  clientes: z.number().min(0).optional(),
  mesero: z.string().optional(),
  observaciones: z.string().optional(),
})

export const asignarMeseroSchema = z.object({
  mesero: z.string().min(1, "El mesero es requerido"),
})

export type MesaFormData = z.infer<typeof mesaSchema>
export type ActualizarEstadoMesaData = z.infer<typeof actualizarEstadoMesaSchema>
export type AsignarMeseroData = z.infer<typeof asignarMeseroSchema>
