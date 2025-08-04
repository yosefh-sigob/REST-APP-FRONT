"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import type { IGetAlmacen } from "@/interfaces/almacen.interface"
import { almacenSchema, type AlmacenFormValues } from "@/schemas/catalogos.schemas"
import { createAlmacen, updateAlmacen } from "@/actions/catalogos.actions"

interface AlmacenFormModalProps {
  isOpen: boolean
  onClose: () => void
  almacen: IGetAlmacen | null
}

export default function AlmacenFormModal({ isOpen, onClose, almacen }: AlmacenFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditing = almacen !== null

  const form = useForm<AlmacenFormValues>({
    resolver: zodResolver(almacenSchema),
    defaultValues: {
      ClaveAlmacen: almacen?.ClaveAlmacen || "",
      Nombre: almacen?.Nombre || "",
      Descripcion: almacen?.Descripcion || "",
      Direccion: almacen?.Direccion || "",
      Activo: almacen?.Activo ?? true,
    },
  })

  const onSubmit = async (values: AlmacenFormValues) => {
    setIsSubmitting(true)
    const toastId = toast.loading(isEditing ? "Actualizando almacén..." : "Creando almacén...")

    try {
      const result = isEditing ? await updateAlmacen(almacen.AlmacenULID, values) : await createAlmacen(values)

      if (result.success) {
        toast.success(result.message, { id: toastId })
        onClose()
      } else {
        toast.error(result.message || "Ocurrió un error.", { id: toastId })
      }
    } catch (error) {
      toast.error("Ocurrió un error inesperado.", { id: toastId })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Almacén" : "Nuevo Almacén"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Actualiza la información del almacén."
              : "Completa el formulario para crear un nuevo almacén."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="ClaveAlmacen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clave</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ej. PRINCIPAL"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="ej. Almacén Principal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe el propósito del almacén..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="ej. Calle Falsa 123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Activo"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Activo</FormLabel>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Guardar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
