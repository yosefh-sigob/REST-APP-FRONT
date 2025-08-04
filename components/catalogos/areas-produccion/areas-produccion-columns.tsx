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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteAreaProduccion } from "@/actions/catalogos.actions"
import { toast } from "@/hooks/use-toast"
import type { IGetAreaProduccion } from "@/interfaces/areaProduccion.interface"

export const areasProduccionColumns = (onEdit: (area: IGetAreaProduccion) => void): ColumnDef<IGetAreaProduccion>[] => [
  {
    accessorKey: "clave",
    header: "Clave",
    cell: ({ row }) => <div className="font-mono font-medium">{row.getValue("clave")}</div>,
  },
  {
    accessorKey: "descripcion",
    header: "Descripción",
    cell: ({ row }) => <div className="font-medium">{row.getValue("descripcion")}</div>,
  },
  {
    accessorKey: "impresora",
    header: "Impresora",
    cell: ({ row }) => {
      const impresora = row.getValue("impresora") as string
      return (
        <div className="text-sm">
          {impresora && impresora.trim() !== "" ? (
            <span className="font-mono text-blue-600">{impresora}</span>
          ) : (
            <span className="text-muted-foreground italic">Sin impresora</span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "activa",
    header: "Estado",
    cell: ({ row }) => {
      const activa = row.getValue("activa") as boolean
      return <Badge variant={activa ? "default" : "secondary"}>{activa ? "Activa" : "Inactiva"}</Badge>
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const area = row.original

      const handleDelete = async () => {
        try {
          const result = await deleteAreaProduccion(area.id)
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
        } catch (error) {
          toast({
            title: "Error",
            description: "Ocurrió un error al eliminar el área de producción.",
            variant: "destructive",
          })
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
            <DropdownMenuItem onClick={() => onEdit(area)}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600 focus:text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. Se eliminará permanentemente el área de producción{" "}
                    <strong>{area.descripcion}</strong>.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
