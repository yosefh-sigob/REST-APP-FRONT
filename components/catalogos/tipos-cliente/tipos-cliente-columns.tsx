"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { toast } from "sonner"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { deleteTipoCliente } from "@/actions/catalogos.actions"
import { TipoClienteFormModal } from "./tipo-cliente-form-modal"
import type { ITipoCliente } from "@/interfaces/tipos-cliente.interface"

const handleDelete = async (id: string) => {
  toast.info("Eliminando tipo de cliente...", { id: "deleting" })
  const result = await deleteTipoCliente(id)
  if (result.success) {
    toast.success("Tipo de cliente eliminado exitosamente", { id: "deleting" })
  } else {
    toast.error(result.message, { id: "deleting" })
  }
}

export const tiposClienteColumns: ColumnDef<ITipoCliente>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "descripcion",
    header: "Descripción",
    cell: ({ row }) => {
      const descripcion = row.original.descripcion
      return descripcion ? (
        <span className="text-sm text-gray-600">{descripcion}</span>
      ) : (
        <span className="text-sm text-gray-400">N/A</span>
      )
    },
  },
  {
    accessorKey: "activo",
    header: "Estado",
    cell: ({ row }) => {
      const activo = row.original.activo
      return <Badge variant={activo ? "default" : "destructive"}>{activo ? "Activo" : "Inactivo"}</Badge>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const tipoCliente = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <TipoClienteFormModal tipoCliente={tipoCliente}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Editar</DropdownMenuItem>
            </TipoClienteFormModal>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleDelete(tipoCliente.id)}>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
