import { z } from "zod"

export const estadoMesaSchema = z.enum(["libre", "ocupada", "reservada", "limpieza"])

export const mesaSchema = z.object({
  id: z.string().min(1, "ID es requerido"),
  numero: z.number().min(1, "El número de mesa debe ser mayor a 0"),
  capacidad: z.number().min(1, "La capacidad debe ser mayor a 0").max(20, "Capacidad máxima de 20 personas"),
  estado: estadoMesaSchema,
  ubicacion: z.string().optional(),
  clientes: z.number().min(0).optional(),
  mesero: z.string().optional(),
  fechaOcupacion: z.string().optional(),
  horaReserva: z.string().optional(),
  tiempo: z.string().optional(),
  observaciones: z.string().optional(),
  activa: z.boolean().default(true),
  fechaCreacion: z.string(),
  fechaActualizacion: z.string(),
})

export const actualizarMesaSchema = z
  .object({
    estado: estadoMesaSchema.optional(),
    clientes: z.number().min(0).max(20).optional(),
    mesero: z.string().min(1, "Mesero es requerido").optional(),
    observaciones: z.string().optional(),
  })
  .refine(
    (data) => {
      // Si el estado es ocupada, debe tener clientes y mesero
      if (data.estado === "ocupada") {
        return data.clientes && data.clientes > 0 && data.mesero
      }
      // Si el estado es reservada, debe tener mesero
      if (data.estado === "reservada") {
        return data.mesero
      }
      return true
    },
    {
      message: "Datos incompletos para el estado seleccionado",
    },
  )

export const crearMesaSchema = z.object({
  numero: z.number().min(1, "El número de mesa debe ser mayor a 0"),
  capacidad: z.number().min(1, "La capacidad debe ser mayor a 0").max(20, "Capacidad máxima de 20 personas"),
  ubicacion: z.string().min(1, "La ubicación es requerida"),
  observaciones: z.string().optional(),
})

export type MesaFormData = z.infer<typeof mesaSchema>
export type ActualizarMesaFormData = z.infer<typeof actualizarMesaSchema>
export type CrearMesaFormData = z.infer<typeof crearMesaSchema>
