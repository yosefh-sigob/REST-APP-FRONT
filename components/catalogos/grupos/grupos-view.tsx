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

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-start mb-6">
        <div>
          <Link href="/catalogos" passHref>
            <Button variant="outline" className="mb-4 bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Catálogos
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Gestión de Grupos</h1>
          <p className="text-muted-foreground">Crea, edita y elimina los grupos de productos.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Crear Grupo
        </Button>
      </div>
      <DataTable columns={columns} data={initialData} filterColumnId="nombre" />
      <GrupoFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} areasProduccion={areasProduccion} />
    </div>
  )
}
