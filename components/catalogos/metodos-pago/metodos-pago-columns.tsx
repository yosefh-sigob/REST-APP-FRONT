"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"

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
import { AlertModal } from "@/components/modals/alert-modal"
import { MetodoPagoFormModal } from "./metodo-pago-form-modal"
import { deleteMetodoPago } from "@/actions/catalogos.actions"
import type { IMetodoPago } from "@/interfaces/metodos-pago.interface"

export const columns: ColumnDef<IMetodoPago>[] = [
  {
    accessorKey: "nombre",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "descripcion",
    header: "Descripción",
  },
  {
    accessorKey: "requiere_referencia",
    header: "Requiere Referencia",
    cell: ({ row }) => {
      const requiereReferencia = row.original.requiere_referencia
      return <Badge variant={requiereReferencia ? "default" : "secondary"}>{requiereReferencia ? "Sí" : "No"}</Badge>
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
      const metodoPago = row.original
      const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)
      const [isFormModalOpen, setIsFormModalOpen] = useState(false)
      const [loading, setLoading] = useState(false)

      const onDelete = async () => {
        try {
          setLoading(true)
          const res = await deleteMetodoPago(metodoPago.id)
          if (res.success) {
            toast.success(res.message)
          } else {
            toast.error(res.message)
          }
        } catch (error) {
          toast.error("Ocurrió un error al eliminar el método de pago.")
        } finally {
          setLoading(false)
          setIsAlertModalOpen(false)
        }
      }

      return (
        <>
          <AlertModal
            isOpen={isAlertModalOpen}
            onClose={() => setIsAlertModalOpen(false)}
            onConfirm={onDelete}
            loading={loading}
            title="¿Estás seguro de eliminar este método de pago?"
            description="Esta acción no se puede deshacer."
          />
          <MetodoPagoFormModal
            isOpen={isFormModalOpen}
            onClose={() => setIsFormModalOpen(false)}
            initialData={metodoPago}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menú</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setIsFormModalOpen(true)}>Editar</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsAlertModalOpen(true)} className="text-red-600">
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    },
  },
]
