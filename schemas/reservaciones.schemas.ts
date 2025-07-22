import { z } from "zod"

export const crearReservacionSchema = z.object({
  clienteNombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),

  clienteEmail: z.string().email("Ingresa un email válido").max(100, "El email no puede exceder 100 caracteres"),

  clienteTelefono: z
    .string()
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .max(20, "El teléfono no puede exceder 20 caracteres")
    .regex(/^[+]?[0-9\s\-$$$$]+$/, "Formato de teléfono inválido"),

  fechaReservacion: z
    .string()
    .min(1, "La fecha es requerida")
    .refine((date) => {
      const selectedDate = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return selectedDate >= today
    }, "La fecha no puede ser anterior a hoy"),

  horaReservacion: z
    .string()
    .min(1, "La hora es requerida")
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido"),

  numeroPersonas: z.number().min(1, "Debe ser al menos 1 persona").max(20, "Máximo 20 personas por reservación"),

  tipoEvento: z.enum(["cumpleanos", "aniversario", "negocio", "familiar", "otro"], {
    required_error: "Selecciona un tipo de evento",
  }),

  observaciones: z.string().max(500, "Las observaciones no pueden exceder 500 caracteres").optional(),

  solicitudesEspeciales: z.string().max(500, "Las solicitudes especiales no pueden exceder 500 caracteres").optional(),
})

export type CrearReservacionData = z.infer<typeof crearReservacionSchema>

export const actualizarReservacionSchema = crearReservacionSchema.partial().extend({
  id: z.string().min(1, "ID es requerido"),
  estado: z.enum(["pendiente", "confirmada", "cancelada", "completada"]).optional(),
  mesaAsignada: z.number().min(1).max(50).optional(),
})

export type ActualizarReservacionData = z.infer<typeof actualizarReservacionSchema>
