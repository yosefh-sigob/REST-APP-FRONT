"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { eliminarGrupo } from "@/actions/catalogos.actions"
import { toast } from "sonner"
import type { Grupo } from "@/interfaces/grupos.interface"

export const columns = (onEdit: (grupo: Grupo) => void): ColumnDef<Grupo>[] => [
  {
    accessorKey: "clave",
    header: "Clave",
    cell: ({ row }) => <div className="font-medium">{row.getValue("clave")}</div>,
  },
  {
    accessorKey: "descripcion",
    header: "Descripción",
    cell: ({ row }) => <div className="max-w-[200px] truncate">{row.getValue("descripcion")}</div>,
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
    cell: ({ row }) => {
      const grupo = row.original

      const handleDelete = async () => {
        if (confirm("¿Estás seguro de que deseas eliminar este grupo?")) {
          try {
            await eliminarGrupo(grupo.id)
            toast.success("Grupo eliminado correctamente")
          } catch (error) {
            toast.error("Error al eliminar el grupo")
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
            <DropdownMenuItem onClick={() => onEdit(grupo)}>
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
