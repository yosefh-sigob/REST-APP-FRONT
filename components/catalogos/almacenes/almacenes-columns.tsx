"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { toast } from "sonner"
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
import type { IGetAlmacen } from "@/interfaces/almacen.interface"
import { deleteAlmacen } from "@/actions/catalogos.actions"

const handleDelete = async (id: string) => {
  const toastId = toast.loading("Eliminando almacén...")
  try {
    const result = await deleteAlmacen(id)
    if (result.success) {
      toast.success("Almacén eliminado exitosamente.", { id: toastId })
    } else {
      toast.error(result.message || "No se pudo eliminar el almacén.", { id: toastId })
    }
  } catch (error) {
    toast.error("Ocurrió un error al eliminar el almacén.", { id: toastId })
  }
}

interface CreateColumnsProps {
  onEdit: (almacen: IGetAlmacen) => void
}

export const createColumns = ({ onEdit }: CreateColumnsProps): ColumnDef<IGetAlmacen>[] => [
  {
    accessorKey: "ClaveAlmacen",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Clave
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-mono">{row.original.ClaveAlmacen}</div>,
  },
  {
    accessorKey: "Nombre",
    header: "Nombre",
  },
  {
    accessorKey: "Descripcion",
    header: "Descripción",
    cell: ({ row }) => <div className="truncate max-w-xs">{row.original.Descripcion}</div>,
  },
  {
    accessorKey: "Direccion",
    header: "Dirección",
    cell: ({ row }) => <div className="truncate max-w-xs">{row.original.Direccion}</div>,
  },
  {
    accessorKey: "Activo",
    header: "Estado",
    cell: ({ row }) => {
      const isActive = row.getValue("Activo")
      return <Badge variant={isActive ? "default" : "destructive"}>{isActive ? "Activo" : "Inactivo"}</Badge>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const almacen = row.original
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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(almacen.AlmacenULID)}>
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEdit(almacen)}>Editar</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500" onClick={() => handleDelete(almacen.AlmacenULID)}>
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
