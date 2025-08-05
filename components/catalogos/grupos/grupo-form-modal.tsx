"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import type { IGrupo } from "@/interfaces/grupos.interface"
import { grupoSchema, type GrupoFormValues } from "@/schemas/catalogos.schemas"
import { createGrupo, updateGrupo } from "@/actions/catalogos.actions"

import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
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
      form.reset(grupo)
    } else {
      form.reset({ clave: "", nombre: "", descripcion: "", activo: true })
    }
  }, [grupo, form, isOpen])

  const onSubmit = async (data: GrupoFormValues) => {
    setIsLoading(true)
    const promise = isEditing ? updateGrupo(grupo.id, data) : createGrupo(data)

    toast.promise(promise, {
      loading: "Guardando...",
      success: (res) => {
        if (res.success) {
          onClose()
          return toastMessage
        }
        throw new Error(res.message)
      },
      error: (err) => err.message,
      finally: () => setIsLoading(false),
    })
  }

  return (
    <Modal title={title} description={description} isOpen={isOpen} onClose={onClose}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="clave"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Clave</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="Ej: BEB, ENT, PST" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="Ej: Bebidas, Entradas, Postres" {...field} />
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
                <FormLabel>Descripción (Opcional)</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    placeholder="Una breve descripción del grupo de productos."
                    className="resize-none"
                    {...field}
                  />
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
