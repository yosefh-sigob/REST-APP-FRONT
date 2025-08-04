"use client"

import type React from "react"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { createTipoCliente, updateTipoCliente } from "@/actions/catalogos.actions"
import { tipoClienteSchema, type TipoClienteFormValues } from "@/schemas/catalogos.schemas"
import type { ITipoCliente } from "@/interfaces/tipos-cliente.interface"

interface TipoClienteFormModalProps {
  children: React.ReactNode
  tipoCliente?: ITipoCliente
}

export function TipoClienteFormModal({ children, tipoCliente }: TipoClienteFormModalProps) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const isEditMode = !!tipoCliente

  const form = useForm<TipoClienteFormValues>({
    resolver: zodResolver(tipoClienteSchema),
    defaultValues: {
      nombre: tipoCliente?.nombre || "",
      descripcion: tipoCliente?.descripcion || "",
      activo: tipoCliente?.activo ?? true,
    },
  })

  const onSubmit = (values: TipoClienteFormValues) => {
    startTransition(async () => {
      const action = isEditMode ? updateTipoCliente : createTipoCliente
      const toastMessage = isEditMode ? "actualizando" : "creando"
      const id = isEditMode ? tipoCliente.id : undefined

      toast.info(`Estamos ${toastMessage} el tipo de cliente...`, { id: "loading" })

      const result = await action(id!, values)

      if (result.success) {
        toast.success(`Tipo de cliente ${isEditMode ? "actualizado" : "creado"} exitosamente`, { id: "loading" })
        setOpen(false)
        form.reset()
      } else {
        toast.error(result.message, { id: "loading" })
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Editar Tipo de Cliente" : "Crear Nuevo Tipo de Cliente"}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Actualiza la información del tipo de cliente."
              : "Completa el formulario para añadir un nuevo tipo de cliente."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: VIP" {...field} />
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
                    <Textarea placeholder="Ej: Cliente frecuente con beneficios" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="activo"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Activo</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Guardando..." : "Guardar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
