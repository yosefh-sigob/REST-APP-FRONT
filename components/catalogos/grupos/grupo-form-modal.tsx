"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { crearGrupo, actualizarGrupo } from "@/actions/catalogos.actions"
import { grupoSchema, type GrupoFormData } from "@/schemas/catalogos.schemas"
import { toast } from "sonner"
import type { Grupo } from "@/interfaces/grupos.interface"

interface GrupoFormModalProps {
  isOpen: boolean
  onClose: () => void
  grupo?: Grupo | null
}

export function GrupoFormModal({ isOpen, onClose, grupo }: GrupoFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditing = !!grupo

  const form = useForm<GrupoFormData>({
    resolver: zodResolver(grupoSchema),
    defaultValues: {
      clave: "",
      descripcion: "",
      activo: true,
    },
  })

  useEffect(() => {
    if (grupo) {
      form.reset({
        clave: grupo.clave,
        descripcion: grupo.descripcion,
        activo: grupo.activo,
      })
    } else {
      form.reset({
        clave: "",
        descripcion: "",
        activo: true,
      })
    }
  }, [grupo, form])

  const onSubmit = async (data: GrupoFormData) => {
    setIsSubmitting(true)
    try {
      // Convertir clave a mayúsculas
      const formData = {
        ...data,
        clave: data.clave.toUpperCase(),
      }

      if (isEditing && grupo) {
        await actualizarGrupo(grupo.id, formData)
        toast.success("Grupo actualizado correctamente")
      } else {
        await crearGrupo(formData)
        toast.success("Grupo creado correctamente")
      }

      onClose()
      form.reset()
    } catch (error) {
      toast.error(isEditing ? "Error al actualizar el grupo" : "Error al crear el grupo")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Grupo" : "Nuevo Grupo"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="clave"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clave</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: BEB"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                      className="uppercase"
                    />
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
                    <Textarea placeholder="Descripción del grupo" {...field} />
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
                    <FormLabel>Estado</FormLabel>
                    <div className="text-sm text-muted-foreground">{field.value ? "Activo" : "Inactivo"}</div>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (isEditing ? "Actualizando..." : "Creando...") : isEditing ? "Actualizar" : "Crear"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
