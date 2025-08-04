"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import type { Grupo } from "@/interfaces/grupos.interface"
import { grupoSchema, type GrupoFormValues } from "@/schemas/catalogos.schemas"
import { createGrupo, updateGrupo } from "@/actions/catalogos.actions"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

interface GrupoFormModalProps {
  isOpen: boolean
  onClose: () => void
  grupo?: Grupo
}

export function GrupoFormModal({ isOpen, onClose, grupo }: GrupoFormModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const isEditing = !!grupo

  const form = useForm<GrupoFormValues>({
    resolver: zodResolver(grupoSchema),
    defaultValues: {
      nombre: grupo?.nombre || "",
      descripcion: grupo?.descripcion || "",
      activo: grupo?.activo ?? true,
    },
  })

  const onSubmit = async (data: GrupoFormValues) => {
    setIsLoading(true)
    try {
      const result = isEditing ? await updateGrupo(grupo.id, data) : await createGrupo(data)

      if (result.success) {
        toast.success(result.message)
        form.reset()
        onClose()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Error inesperado. Inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Grupo" : "Nuevo Grupo"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifica los datos del grupo de productos."
              : "Crea un nuevo grupo de productos para categorizar tus items."}
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
                    <Input placeholder="Ej: Bebidas, Comidas, Postres..." {...field} />
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
                    <Textarea placeholder="Descripción del grupo de productos..." className="resize-none" {...field} />
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
                    <FormLabel>Estado Activo</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      El grupo estará disponible para usar en productos
                    </div>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Guardando..." : isEditing ? "Actualizar" : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
