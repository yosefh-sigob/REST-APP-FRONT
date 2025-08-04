"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteUnidad } from "@/actions/catalogos.actions"
import { toast } from "@/hooks/use-toast"
import type { IGetUnidad } from "@/interfaces/unidad.interface"

export const columns = (onEdit: (unidad: IGetUnidad) => void): ColumnDef<IGetUnidad>[] => [
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
    accessorKey: "abreviacion",
    header: "Abreviación",
    cell: ({ row }) => <div className="text-sm text-muted-foreground">{row.getValue("abreviacion")}</div>,
  },
  {
    accessorKey: "descripcion",
    header: "Descripción",
    cell: ({ row }) => {
      const descripcion = row.getValue("descripcion") as string
      return (
        <div className="max-w-[200px] truncate text-sm text-muted-foreground">{descripcion || "Sin descripción"}</div>
      )
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
      const unidad = row.original

      const handleDelete = async () => {
        if (confirm("¿Estás seguro de que deseas eliminar esta unidad?")) {
          const result = await deleteUnidad(unidad.id)
          if (result.success) {
            toast({
              title: "Éxito",
              description: result.message,
            })
          } else {
            toast({
              title: "Error",
              description: result.message,
              variant: "destructive",
            })
          }
        }
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
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEdit(unidad)}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
