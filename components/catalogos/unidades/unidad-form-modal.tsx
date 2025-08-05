"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { createUnidad, updateUnidad } from "@/actions/catalogos.actions"
import { unidadSchema, type UnidadFormValues } from "@/schemas/catalogos.schemas"
import { toast } from "@/hooks/use-toast"
import type { IGetUnidad } from "@/interfaces/unidad.interface"

interface UnidadFormModalProps {
  isOpen: boolean
  onClose: () => void
  unidad?: IGetUnidad | null
}

export function UnidadFormModal({ isOpen, onClose, unidad }: UnidadFormModalProps) {
  const isEditing = !!unidad

  const form = useForm<UnidadFormValues>({
    resolver: zodResolver(unidadSchema),
    defaultValues: {
      clave: "",
      nombre: "",
      descripcion: "",
      activa: true,
    },
  })

  useEffect(() => {
    if (unidad) {
      form.reset({
        clave: unidad.ClaveUnidad,
        nombre: unidad.Descripcion || "",
        descripcion: unidad.Descripcion || "",
        activa: true as boolean,
      })
    } else {
      form.reset({
        clave: "",
        nombre: "",
        descripcion: "",
        activa: true as boolean,
      })
    }
  }, [unidad, form])

  const onSubmit = async (data: UnidadFormValues) => {
    const payload = {
      clave: data.clave,
      nombre: data.nombre,
      abreviacion: unidad?.Abreviacion || "",
      descripcion: data.descripcion,
      activo: Boolean(data.activa),
    }
    try {
      const result = isEditing
        ? await updateUnidad(unidad?.UnidadULID || "", payload)
        : await createUnidad(payload)

      if (result.success) {
        toast({
          title: "Éxito",
          description: result.message,
        })
        onClose()
        form.reset()
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error inesperado",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Unidad" : "Nueva Unidad"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifica los datos de la unidad de medida."
              : "Completa los datos para crear una nueva unidad de medida."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <FormField
              control={form.control}
              name="clave"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Clave *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="KG, LT, PZ..."
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                    />
                  </FormControl>
                  <FormDescription>Código único de la unidad (solo mayúsculas y números)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nombre"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Nombre *</FormLabel>
                  <FormControl>
                    <Input placeholder="Kilogramo, Litro, Pieza..." {...field} />
                  </FormControl>
                  <FormDescription>Nombre completo de la unidad</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descripción opcional de la unidad..." className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="activa"
              render={({ field }: any) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Estado Activa</FormLabel>
                    <FormDescription>Las unidades inactivas no aparecerán en los formularios</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Guardando..." : isEditing ? "Actualizar" : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
