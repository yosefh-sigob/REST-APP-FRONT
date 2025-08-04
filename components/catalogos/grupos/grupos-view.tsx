"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus } from "lucide-react"
import type { Grupo } from "@/interfaces/grupos.interface"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { createColumns } from "./grupos-columns"
import { GrupoFormModal } from "./grupo-form-modal"

interface GruposViewProps {
  grupos: Grupo[]
}

export function GruposView({ grupos = [] }: GruposViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedGrupo, setSelectedGrupo] = useState<Grupo | undefined>(undefined)

  const handleOpenModal = (grupo?: Grupo) => {
    setSelectedGrupo(grupo)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedGrupo(undefined)
    setIsModalOpen(false)
  }

  const columns = createColumns(handleOpenModal)

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
            <h1 className="text-2xl font-bold tracking-tight">Grupos de Productos</h1>
            <p className="text-muted-foreground">Gestiona las categorías principales de productos del restaurante</p>
          </div>
          <Button onClick={() => handleOpenModal()}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Grupo
          </Button>
        </div>
      </div>

      {/* Tabla */}
      <DataTable columns={columns} data={grupos} searchKey="nombre" searchPlaceholder="Buscar grupos..." />

      {/* Modal */}
      <GrupoFormModal isOpen={isModalOpen} onClose={handleCloseModal} grupo={selectedGrupo} />
    </div>
  )
}
