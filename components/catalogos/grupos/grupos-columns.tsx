"use client"

import type React from "react"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit, MoreHorizontal, Trash } from "lucide-react"
import type { IGrupo } from "@/interfaces/grupos.interface"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ActionsCellProps {
  row: {
    original: IGrupo
  }
}

interface CreateColumnsProps {
  onEdit: (grupo: IGrupo) => void
  onDelete: (grupo: IGrupo) => void
}

const ActionsCell: React.FC<ActionsCellProps & CreateColumnsProps> = ({ row, onEdit, onDelete }) => {
  const grupo = row.original
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
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(grupo.id)}>Copiar ID</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onEdit(grupo)}>
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(grupo)} className="text-red-500 focus:text-red-500">
          <Trash className="mr-2 h-4 w-4" />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const createColumns = ({ onEdit, onDelete }: CreateColumnsProps): ColumnDef<IGrupo>[] => [
  {
    accessorKey: "clave",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Clave
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "descripcion",
    header: "Descripción",
    cell: ({ row }) => <div className="max-w-xs truncate">{row.original.descripcion}</div>,
  },
  {
    accessorKey: "activo",
    header: "Estado",
    cell: ({ row }) => (
      <Badge variant={row.original.activo ? "default" : "destructive"}>
        {row.original.activo ? "Activo" : "Inactivo"}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: (props) => <ActionsCell {...props} onEdit={onEdit} onDelete={onDelete} />,
  },
]
