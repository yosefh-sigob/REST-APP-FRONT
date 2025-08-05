"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Edit, Trash } from "lucide-react"

import type { IGrupo } from "@/interfaces/grupos.interface"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CreateColumnsProps {
  onEdit: (grupo: IGrupo) => void
  onDelete: (grupo: IGrupo) => void
}

export const createColumns = ({ onEdit, onDelete }: CreateColumnsProps): ColumnDef<IGrupo>[] => [
  {
    accessorKey: "clave",
    header: "Clave",
    cell: ({ row }) => <div className="font-medium">{row.getValue("clave")}</div>,
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
    cell: ({ row }) => <div className="font-medium">{row.getValue("nombre")}</div>,
  },
  {
    accessorKey: "descripcion",
    header: "Descripción",
    cell: ({ row }) => {
      const descripcion = row.getValue("descripcion") as string
      return <div className="max-w-[200px] truncate text-muted-foreground">{descripcion || "Sin descripción"}</div>
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
    header: "Acciones",
    cell: ({ row }) => {
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
            <DropdownMenuItem onClick={() => onEdit(grupo)}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(grupo)} className="text-red-600">
              <Trash className="mr-2 h-4 w-4" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
