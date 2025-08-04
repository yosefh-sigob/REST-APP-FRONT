"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type SubgrupoFormValues, subgrupoSchema } from "@/schemas/catalogos.schemas"
import { createSubgrupo, updateSubgrupo } from "@/actions/catalogos.actions"
import type { Subgrupo } from "@/interfaces/subgrupos.interface"
import type { Grupo } from "@/interfaces/grupos.interface"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface SubgrupoFormModalProps {
  isOpen: boolean
  onClose: () => void
  subgrupo: Subgrupo | null
  grupos: Grupo[]
}

export function SubgrupoFormModal({ isOpen, onClose, subgrupo, grupos }: SubgrupoFormModalProps) {
  const form = useForm<SubgrupoFormValues>({
    resolver: zodResolver(subgrupoSchema),
    defaultValues: {
      nombre: subgrupo?.nombre || "",
      descripcion: subgrupo?.descripcion || "",
      grupo_id: subgrupo?.grupo_id || "",
      activo: subgrupo?.activo ?? true,
    },
  })

  const onSubmit = async (values: SubgrupoFormValues) => {
    const action = subgrupo ? updateSubgrupo(subgrupo.id, values) : createSubgrupo(values)
    toast.promise(action, {
      loading: `Guardando subgrupo...`,
      success: `Subgrupo ${subgrupo ? "actualizado" : "creado"} exitosamente.`,
      error: `Error al guardar el subgrupo.`,
    })
    const result = await action
    if (result.success) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{subgrupo ? "Editar Subgrupo" : "Crear Subgrupo"}</DialogTitle>
          <DialogDescription>
            {subgrupo ? "Actualiza los detalles del subgrupo." : "Añade un nuevo subgrupo al catálogo."}
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
                    <Input placeholder="Ej: Carnes Rojas" {...field} />
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
                    <Textarea placeholder="Describe el subgrupo..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="grupo_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grupo Padre</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un grupo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {grupos.map((g) => (
                        <SelectItem key={g.id} value={g.id}>
                          {g.nombre}
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
              name="activo"
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
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Guardando..." : "Guardar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
