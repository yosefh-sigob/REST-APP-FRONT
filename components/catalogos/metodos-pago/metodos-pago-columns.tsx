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
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const onConfirm = async () => {
    try {
      setLoading(true)
      const result = await deleteMetodoPago(data.id)

      if (result.success) {
        toast.success(result.message)
        setOpen(false)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Algo salió mal")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onConfirm} loading={loading} />
      <MetodoPagoFormModal isOpen={openEdit} onClose={() => setOpenEdit(false)} initialData={data} />
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
            <Edit className="mr-2 h-4 w-4" /> Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Eliminar
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
      return descripcion || "Sin descripción"
    },
  },
  {
    accessorKey: "requiere_referencia",
    header: "Requiere Referencia",
    cell: ({ row }) => {
      const requiere = row.getValue("requiere_referencia") as boolean
      return <Badge variant={requiere ? "default" : "secondary"}>{requiere ? "Sí" : "No"}</Badge>
    },
  },
  {
    accessorKey: "activo",
    header: "Estado",
    cell: ({ row }) => {
      const activo = row.getValue("activo") as boolean
      return <Badge variant={activo ? "default" : "secondary"}>{activo ? "Activo" : "Inactivo"}</Badge>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
