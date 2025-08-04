"use client"

import type { Grupo } from "@/interfaces/grupos.interface"
import type { Subgrupo } from "@/interfaces/subgrupos.interface"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { PlusCircle, ArrowLeft } from "lucide-react"
import { columns } from "./subgrupos-columns"
import { SubgrupoFormModal } from "./subgrupo-form-modal"
import Link from "next/link"

interface SubgruposViewProps {
  subgrupos: Subgrupo[]
  grupos: Grupo[]
}

export function SubgruposView({ subgrupos, grupos }: SubgruposViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSubgrupo, setSelectedSubgrupo] = useState<Subgrupo | null>(null)

  const handleOpenModal = (subgrupo?: Subgrupo) => {
    setSelectedSubgrupo(subgrupo || null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedSubgrupo(null)
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
          <h1 className="text-2xl font-bold">Gestión de Subgrupos</h1>
          <p className="text-muted-foreground">Crea, edita y elimina subgrupos de productos.</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Nuevo Subgrupo
        </Button>
      </div>

      <DataTable columns={tableColumns} data={subgrupos} filterColumnId="nombre" />

      {isModalOpen && (
        <SubgrupoFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          subgrupo={selectedSubgrupo}
          grupos={grupos}
        />
      )}
    </div>
  )
}
