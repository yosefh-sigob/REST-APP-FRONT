"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, PlusCircle } from "lucide-react"
import type { Grupo } from "@/interfaces/grupos.interface"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./grupos-columns"
import { GrupoFormModal } from "./grupo-form-modal"

interface GruposViewProps {
  initialData: Grupo[]
  areasProduccion: { id: string; nombre: string }[]
}

export function GruposView({ initialData, areasProduccion }: GruposViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedGrupo, setSelectedGrupo] = useState<Grupo | null>(null)

  const handleOpenModal = (grupo?: Grupo) => {
    setSelectedGrupo(grupo || null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedGrupo(null)
    setIsModalOpen(false)
  }

  // Pasar `handleOpenModal` a las columnas a través del `meta` de la tabla
  const tableColumns = columns.map((col) => {
    if (col.id === "actions") {
      return { ...col, meta: { ...col.meta, handleOpenModal } }
    }
    return col
  })

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/catalogos" className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Volver a Catálogos
          </Link>
          <h1 className="text-2xl font-bold">Gestión de Grupos</h1>
          <p className="text-muted-foreground">Crea, edita y elimina los grupos de productos.</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Nuevo Grupo
        </Button>
      </div>

      <DataTable columns={tableColumns} data={initialData} filterColumnId="nombre" />

      {isModalOpen && (
        <GrupoFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          grupo={selectedGrupo}
          areasProduccion={areasProduccion}
        />
      )}
    </div>
  )
}
