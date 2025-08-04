"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"
import { columns } from "./grupos-columns"
import { GrupoFormModal } from "./grupo-form-modal"
import type { Grupo } from "@/interfaces/grupos.interface"

interface GruposViewProps {
  grupos: Grupo[]
}

export function GruposView({ grupos }: GruposViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingGrupo, setEditingGrupo] = useState<Grupo | null>(null)

  const handleOpenModal = (grupo?: Grupo) => {
    setEditingGrupo(grupo || null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingGrupo(null)
  }

  // Crear columnas con la función de edición
  const tableColumns = columns(handleOpenModal)

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <Link href="/catalogos">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Catálogos
          </Button>
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Grupos de Productos</h1>
            <p className="text-gray-600 mt-1">Gestiona las categorías principales de productos del menú</p>
          </div>
          <Button onClick={() => handleOpenModal()}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Grupo
          </Button>
        </div>
      </div>

      {/* Tabla */}
      <DataTable columns={tableColumns} data={grupos} searchKey="descripcion" searchPlaceholder="Buscar grupos..." />

      {/* Modal */}
      <GrupoFormModal isOpen={isModalOpen} onClose={handleCloseModal} grupo={editingGrupo} />
    </div>
  )
}
