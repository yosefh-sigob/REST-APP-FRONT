"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Calendar, CalendarDays, Clock, Users, Plus, Loader2 } from "lucide-react"
import { createReservacion } from "@/actions/reservaciones.actions"
import { crearReservacionSchema, type CrearReservacionData } from "@/schemas/reservaciones.schemas"
import { toast } from "@/hooks/use-toast"

interface CrearReservacionFormProps {
  onReservacionCreada?: () => void
}

export function CrearReservacionForm({ onReservacionCreada }: CrearReservacionFormProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CrearReservacionData>({
    resolver: zodResolver(crearReservacionSchema),
    defaultValues: {
      clienteNombre: "",
      clienteEmail: "",
      clienteTelefono: "",
      fechaReservacion: "",
      horaReservacion: "",
      numeroPersonas: 2,
      tipoEvento: "otro",
      observaciones: "",
      solicitudesEspeciales: "",
    },
  })

  const onSubmit = async (data: CrearReservacionData) => {
    setIsSubmitting(true)
    try {
      await createReservacion(data)

      toast({
        title: "Reservación creada",
        description: "La reservación se ha creado exitosamente.",
      })

      form.reset()
      setOpen(false)
      onReservacionCreada?.()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear la reservación. Intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Generar opciones de hora (cada 15 minutos de 12:00 a 23:00)
  const horasDisponibles = []
  for (let hora = 12; hora <= 23; hora++) {
    for (let minuto = 0; minuto < 60; minuto += 15) {
      const horaFormateada = `${hora.toString().padStart(2, "0")}:${minuto.toString().padStart(2, "0")}`
      horasDisponibles.push(horaFormateada)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva Reservación
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Crear Nueva Reservación
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Información del Cliente */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Información del Cliente</h3>

              <FormField
                control={form.control}
                name="clienteNombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: María González" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="clienteEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="cliente@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="clienteTelefono"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono *</FormLabel>
                      <FormControl>
                        <Input placeholder="+52 555 123 4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Detalles de la Reservación */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Detalles de la Reservación</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="fechaReservacion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Fecha *
                      </FormLabel>
                      <FormControl>
                        <Input type="date" min={new Date().toISOString().split("T")[0]} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="horaReservacion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Hora *
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar hora" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {horasDisponibles.map((hora) => (
                            <SelectItem key={hora} value={hora}>
                              {hora}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="numeroPersonas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Personas *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          max="20"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 1)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="tipoEvento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de evento</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo de evento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cumpleanos">Cumpleaños</SelectItem>
                        <SelectItem value="aniversario">Aniversario</SelectItem>
                        <SelectItem value="negocio">Negocio</SelectItem>
                        <SelectItem value="familiar">Familiar</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Notas Adicionales */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Notas Adicionales</h3>

              <FormField
                control={form.control}
                name="observaciones"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observaciones</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Cualquier información adicional sobre la reservación..."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="solicitudesEspeciales"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Solicitudes especiales</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Decoración, menú especial, alergias, etc..."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Botones */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creando...
                  </>
                ) : (
                  "Crear Reservación"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
