"use client"

import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import type { IGrupo } from "@/interfaces/grupos.interface"
import { grupoSchema, type GrupoFormValues } from "@/schemas/catalogos.schemas"
import { createGrupoCatalogos, updateGrupoCatalogos } from "@/actions/catalogos.actions"

import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Form, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

interface GrupoFormModalProps {
  isOpen: boolean
  onClose: () => void
  grupo?: IGrupo
}

export function GrupoFormModal({ isOpen, onClose, grupo }: GrupoFormModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const isEditing = !!grupo

  const title = isEditing ? "Editar Grupo" : "Nuevo Grupo"
  const description = isEditing ? "Modifica los datos del grupo." : "Crea un nuevo grupo de productos."
  const toastMessage = isEditing ? "Grupo actualizado." : "Grupo creado."
  const action = isEditing ? "Guardar Cambios" : "Crear"

  const form = useForm<GrupoFormValues>({
    resolver: zodResolver(grupoSchema),
    defaultValues: {
      clave: "",
      nombre: "",
      descripcion: "",
      activo: true,
    },
  })

  useEffect(() => {
    if (grupo) {
      form.reset({
        clave: grupo.clave || "",
        nombre: grupo.nombre || "",
        descripcion: grupo.descripcion || "",
        activo: grupo.activo ?? true,
      })
    } else {
      form.reset({
        clave: "",
        nombre: "",
        descripcion: "",
        activo: true,
      })
    }
  }, [grupo, form, isOpen])

  const onSubmit = async (data: GrupoFormValues) => {
    setIsLoading(true)
    try {
      const promise = isEditing ? updateGrupoCatalogos(grupo.id, data) : createGrupoCatalogos(data)

      const result = await promise

      if (result.success) {
        toast.success(toastMessage)
        onClose()
      } else {
        toast.error(result.message || "Error al guardar")
      }
    } catch (error) {
      toast.error("Error inesperado al guardar")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal title={title} description={description} isOpen={isOpen} onClose={onClose}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="clave"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Clave</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Ej: BEB, ENT, PST"
                    value={field.value || ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                  />
                </FormControl>
                {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
              </FormItem>
            )}
          />

          <Controller
            name="nombre"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Ej: Bebidas, Entradas, Postres"
                    value={field.value || ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                  />
                </FormControl>
                {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
              </FormItem>
            )}
          />

          <Controller
            name="descripcion"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Descripción (Opcional)</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    placeholder="Una breve descripción del grupo de productos."
                    className="resize-none"
                    value={field.value || ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                  />
                </FormControl>
                {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
              </FormItem>
            )}
          />

          <Controller
            name="activo"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Estado</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    {field.value ? "El grupo estará activo y visible." : "El grupo estará inactivo y oculto."}
                  </p>
                </div>
                <FormControl>
                  <Switch disabled={isLoading} checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button disabled={isLoading} variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button disabled={isLoading} type="submit">
              {isLoading ? "Guardando..." : action}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  )
}
