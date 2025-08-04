"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { createMetodoPago, updateMetodoPago } from "@/actions/catalogos.actions"
import { metodoPagoSchema, type MetodoPagoFormValues } from "@/schemas/catalogos.schemas"
import type { IMetodoPago } from "@/interfaces/metodos-pago.interface"

interface MetodoPagoFormModalProps {
  isOpen: boolean
  onClose: () => void
  initialData?: IMetodoPago | null
}

export function MetodoPagoFormModal({ isOpen, onClose, initialData }: MetodoPagoFormModalProps) {
  const [loading, setLoading] = useState(false)

  const title = initialData ? "Editar Método de Pago" : "Crear Método de Pago"
  const description = initialData ? "Edita los detalles del método de pago." : "Añade un nuevo método de pago."
  const action = initialData ? "Guardar cambios" : "Crear"

  const form = useForm<MetodoPagoFormValues>({
    resolver: zodResolver(metodoPagoSchema),
    defaultValues: initialData || {
      nombre: "",
      descripcion: "",
      requiere_referencia: false,
      activo: true,
    },
  })

  const onSubmit = async (values: MetodoPagoFormValues) => {
    try {
      setLoading(true)
      const promise = initialData ? updateMetodoPago(initialData.id, values) : createMetodoPago(values)

      toast.promise(promise, {
        loading: `Guardando ${initialData ? "cambios" : "método de pago"}...`,
        success: (res) => {
          if (!res.success) {
            throw new Error(res.message)
          }
          onClose()
          return res.message
        },
        error: (err) => err.message,
      })
    } catch (error) {
      // El toast.promise ya maneja el error
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal title={title} description={description} isOpen={isOpen} onClose={onClose}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Ej: Tarjeta de Crédito" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    placeholder="Describe brevemente el método de pago."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel>Requiere Referencia</FormLabel>
              <p className="text-[0.8rem] text-muted-foreground">
                Indica si este método necesita un número de referencia (ej. transferencia).
              </p>
            </div>
            <FormField
              control={form.control}
              name="requiere_referencia"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch disabled={loading} checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel>Activo</FormLabel>
              <p className="text-[0.8rem] text-muted-foreground">
                Indica si el método de pago está disponible para su uso.
              </p>
            </div>
            <FormField
              control={form.control}
              name="activo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch disabled={loading} checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button disabled={loading} variant="outline" onClick={onClose} type="button">
              Cancelar
            </Button>
            <Button disabled={loading} type="submit">
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  )
}
