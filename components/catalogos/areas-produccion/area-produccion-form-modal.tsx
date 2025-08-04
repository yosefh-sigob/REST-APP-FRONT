"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { createAreaProduccion, updateAreaProduccion } from "@/actions/catalogos.actions"
import { areaProduccionSchema, type AreaProduccionFormValues } from "@/schemas/catalogos.schemas"
import type { IGetAreaProduccion } from "@/interfaces/areaProduccion.interface"

interface AreaProduccionFormModalProps {
  isOpen: boolean
  onClose: () => void
  area?: IGetAreaProduccion | null
}

export function AreaProduccionFormModal({ isOpen, onClose, area }: AreaProduccionFormModalProps) {
  const isEditing = !!area

  const form = useForm<AreaProduccionFormValues>({
    resolver: zodResolver(areaProduccionSchema),
    defaultValues: {
      clave: "",
      descripcion: "",
      impresora: "",
      activa: true,
    },
  })

  const { handleSubmit, control, reset, formState, setValue, watch } = form
  const { isSubmitting } = formState

  // Observar el campo clave para convertir a mayúsculas
  const claveValue = watch("clave")

  useEffect(() => {
    if (claveValue) {
      setValue("clave", claveValue.toUpperCase())
    }
  }, [claveValue, setValue])

  useEffect(() => {
    if (isOpen) {
      if (area) {
        reset({
          clave: area.clave,
          descripcion: area.descripcion,
          impresora: area.impresora || "",
          activa: area.activa,
        })
      } else {
        reset({
          clave: "",
          descripcion: "",
          impresora: "",
          activa: true,
        })
      }
    }
  }, [isOpen, area, reset])

  const onSubmit = async (data: AreaProduccionFormValues) => {
    try {
      let result
      if (isEditing && area) {
        result = await updateAreaProduccion(area.id, data)
      } else {
        result = await createAreaProduccion(data)
      }

      if (result.success) {
        toast({
          title: "Éxito",
          description: result.message,
        })
        onClose()
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
        description: "Ocurrió un error inesperado.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Área de Producción" : "Nueva Área de Producción"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifica los datos del área de producción."
              : "Completa los datos para crear una nueva área de producción."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={control}
              name="clave"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clave *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="COC, BAR, PAN..."
                      {...field}
                      className="font-mono"
                      onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                    />
                  </FormControl>
                  <FormDescription>Identificador único del área (solo mayúsculas y números)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción *</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descripción del área de producción..." className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="impresora"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Impresora</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de la impresora (opcional)" {...field} />
                  </FormControl>
                  <FormDescription>Nombre de la impresora asociada a esta área</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="activa"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Área Activa</FormLabel>
                    <FormDescription>Determina si el área está disponible para uso</FormDescription>
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
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? "Actualizar" : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
