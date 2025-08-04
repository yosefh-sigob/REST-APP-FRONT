"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { toast } from "sonner"
import type { Grupo } from "@/interfaces/grupos.interface"
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
import { deleteGrupo } from "@/actions/catalogos.actions"
import { GrupoFormModal } from "./grupo-form-modal"

function RowActions({ grupo }: { grupo: Grupo }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDelete = async () => {
    const confirmation = confirm("¿Estás seguro de que deseas eliminar este grupo?")
    if (confirmation) {
      const result = await deleteGrupo(grupo.id)
      if (result.success) {
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    }
  }

  // Simulación de áreas de producción
  const areasProduccion = [
    { id: "AREA-001", nombre: "Cocina" },
    { id: "AREA-002", nombre: "Bar" },
    { id: "AREA-003", nombre: "Postres" },
  ]

  return (
    <>
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
          <DropdownMenuItem onClick={() => setIsModalOpen(true)}>Editar</DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete} className="text-red-500">
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <GrupoFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        grupo={grupo}
        areasProduccion={areasProduccion}
      />
    </>
  )
}

export const columns: ColumnDef<Grupo>[] = [
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
    accessorKey: "activo",
    header: "Estado",
    cell: ({ row }) => {
      const activo = row.getValue("activo")
      return <Badge variant={activo ? "default" : "destructive"}>{activo ? "Activo" : "Inactivo"}</Badge>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions grupo={row.original} />,
  },
]
