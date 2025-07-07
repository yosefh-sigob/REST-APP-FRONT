import { z } from "zod"

export const loginSchema = z.object({
  usuario: z
    .string()
    .min(3, "El usuario debe tener al menos 3 caracteres")
    .max(50, "El usuario no puede exceder 50 caracteres"),
  contraseña: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(100, "La contraseña no puede exceder 100 caracteres"),
  pin: z
    .string()
    .length(4, "El PIN debe tener exactamente 4 dígitos")
    .regex(/^\d{4}$/, "El PIN debe contener solo números"),
})

export type LoginFormData = z.infer<typeof loginSchema>
