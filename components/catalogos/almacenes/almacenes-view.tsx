"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import type { IGetAlmacen } from "@/interfaces/almacen.interface"
import { createColumns } from "./almacenes-columns"
import { DataTable } from "@/components/ui/data-table"
import AlmacenFormModal from "./almacen-form-modal"

interface AlmacenesViewProps {
  almacenes: IGetAlmacen[]
}

export default function AlmacenesView({ almacenes = [] }: AlmacenesViewProps) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAlmacen, setSelectedAlmacen] = useState<IGetAlmacen | null>(null)

  const handleOpenModal = (almacen?: IGetAlmacen) => {
    setSelectedAlmacen(almacen || null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedAlmacen(null)
    setIsModalOpen(false)
  }

  const columns = createColumns({ onEdit: handleOpenModal })

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <Button variant="ghost" onClick={() => router.push("/catalogos")} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a Catálogos
      </Button>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Almacenes</h1>
          <p className="text-muted-foreground">Crea, edita y administra los almacenes de tu restaurante.</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Almacén
        </Button>
      </div>

      <DataTable columns={columns} data={almacenes} filterColumn="Nombre" />

      {isModalOpen && <AlmacenFormModal isOpen={isModalOpen} onClose={handleCloseModal} almacen={selectedAlmacen} />}
    </div>
  )
}
