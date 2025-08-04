"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Edit, Trash } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { AlertModal } from "@/components/modals/alert-modal"
import { MetodoPagoFormModal } from "./metodo-pago-form-modal"
import { deleteMetodoPago } from "@/actions/catalogos.actions"
import type { IMetodoPago } from "@/interfaces/metodos-pago.interface"

const CellAction = ({ data }: { data: IMetodoPago }) => {
  const [loading, setLoading] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const onConfirmDelete = async () => {
    try {
      setLoading(true)
      const result = await deleteMetodoPago(data.id)

      if (result.success) {
        toast.success(result.message)
        setOpenDelete(false)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Ocurrió un error inesperado")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={onConfirmDelete}
        loading={loading}
        title="¿Eliminar método de pago?"
        description="Esta acción no se puede deshacer. El método de pago será eliminado permanentemente."
      />
      <MetodoPagoFormModal initialData={data} isOpen={openEdit} onClose={() => setOpenEdit(false)} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpenEdit(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export const columns: ColumnDef<IMetodoPago>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "descripcion",
    header: "Descripción",
    cell: ({ row }) => {
      const descripcion = row.getValue("descripcion") as string
      return descripcion || <span className="text-muted-foreground italic">Sin descripción</span>
    },
  },
  {
    accessorKey: "requiere_referencia",
    header: "Requiere Referencia",
    cell: ({ row }) => {
      const requiere = row.getValue("requiere_referencia") as boolean
      return requiere ? <Badge variant="secondary">Sí</Badge> : <Badge variant="outline">No</Badge>
    },
  },
  {
    accessorKey: "activo",
    header: "Estado",
    cell: ({ row }) => {
      const activo = row.getValue("activo") as boolean
      return activo ? <Badge variant="default">Activo</Badge> : <Badge variant="secondary">Inactivo</Badge>
    },
  },
  {
    id: "acciones",
    header: "Acciones",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
