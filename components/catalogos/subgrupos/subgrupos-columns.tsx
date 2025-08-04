"use client"

import type { Subgrupo } from "@/interfaces/subgrupos.interface"
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
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
import { deleteSubgrupo } from "@/actions/catalogos.actions"
import { toast } from "sonner"

export const columns: ColumnDef<Subgrupo>[] = [
  {
    accessorKey: "nombre",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Nombre
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "descripcion",
    header: "Descripción",
  },
  {
    accessorKey: "grupo_id",
    header: "Grupo",
    // Aquí podrías mapear el ID al nombre del grupo si pasas la lista de grupos
  },
  {
    accessorKey: "activo",
    header: "Estado",
    cell: ({ row }) => {
      const isActive = row.getValue("activo")
      return <Badge variant={isActive ? "default" : "destructive"}>{isActive ? "Activo" : "Inactivo"}</Badge>
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const subgrupo = row.original
      const { handleOpenModal } = (table.options.meta as any) || {}

      const handleDelete = async () => {
        toast.promise(deleteSubgrupo(subgrupo.id), {
          loading: "Eliminando subgrupo...",
          success: "Subgrupo eliminado exitosamente.",
          error: "Error al eliminar el subgrupo.",
        })
      }

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(subgrupo.id)}>Copiar ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleOpenModal(subgrupo)}>Editar</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} className="text-red-500">
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
