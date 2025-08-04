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
import { createEstadoMesa, updateEstadoMesa } from "@/actions/catalogos.actions"
import { estadoMesaSchema, type EstadoMesaFormValues } from "@/schemas/catalogos.schemas"
import type { IEstadoMesa } from "@/interfaces/estados-mesa.interface"

interface EstadoMesaFormModalProps {
  isOpen: boolean
  onClose: () => void
  estado?: IEstadoMesa | null
}

export function EstadoMesaFormModal({ isOpen, onClose, estado }: EstadoMesaFormModalProps) {
  const isEditing = !!estado

  const form = useForm<EstadoMesaFormValues>({
    // resolver: zodResolver(estadoMesaSchema), // Comentado temporalmente por problemas de versión de Zod
    defaultValues: {
      nombre: "",
      descripcion: "",
      color: "#22c55e",
      activo: true,
    },
  })

  const { handleSubmit, control, reset, formState } = form
  const { isSubmitting } = formState

  useEffect(() => {
    if (isOpen) {
      if (estado) {
        reset({
          nombre: estado.nombre,
          descripcion: estado.descripcion || "",
          color: estado.color,
          activo: estado.activo,
        })
      } else {
        reset({
          nombre: "",
          descripcion: "",
          color: "#22c55e",
          activo: true,
        })
      }
    }
  }, [isOpen, estado, reset])

  const onSubmit = async (data: EstadoMesaFormValues) => {
    try {
      let result
      if (isEditing && estado) {
        result = await updateEstadoMesa(estado.id, data)
      } else {
        result = await createEstadoMesa(data)
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
          <DialogTitle>{isEditing ? "Editar Estado de Mesa" : "Nuevo Estado de Mesa"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifica los datos del estado de mesa."
              : "Completa los datos para crear un nuevo estado de mesa."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre *</FormLabel>
                  <FormControl>
                    <Input placeholder="Disponible, Ocupada, Reservada..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descripción del estado de mesa..." className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color *</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input type="color" className="w-12 h-10 p-1 border" {...field} />
                      <Input placeholder="#22c55e" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>Color que representará este estado en el sistema</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="activo"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Estado Activo</FormLabel>
                    <FormDescription>Determina si el estado está disponible para uso</FormDescription>
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
