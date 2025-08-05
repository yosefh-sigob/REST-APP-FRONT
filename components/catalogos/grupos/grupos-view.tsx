"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { toast } from "sonner"

import type { IGrupo } from "@/interfaces/grupos.interface"
import { deleteGrupoCatalogos } from "@/actions/catalogos.actions"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"

import { createColumns } from "./grupos-columns"
import { GrupoFormModal } from "./grupo-form-modal"
import { AlertModal } from "@/components/modals/alert-modal"

interface GruposViewProps {
  initialData: IGrupo[]
}

export function GruposView({ initialData }: GruposViewProps) {
  const [data, setData] = useState<IGrupo[]>(initialData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedGrupo, setSelectedGrupo] = useState<IGrupo | undefined>(undefined)
  const [grupoToDelete, setGrupoToDelete] = useState<IGrupo | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const handleEdit = (grupo: IGrupo) => {
    setSelectedGrupo(grupo)
    setIsModalOpen(true)
  }

  const handleDeleteRequest = (grupo: IGrupo) => {
    setGrupoToDelete(grupo)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!grupoToDelete) return

    setIsLoading(true)
    try {
      const result = await deleteGrupoCatalogos(grupoToDelete.id)

      if (result.success) {
        setData((prev) => prev.filter((item) => item.id !== grupoToDelete.id))
        toast.success("Grupo eliminado correctamente")
      } else {
        toast.error(result.message || "Error al eliminar el grupo")
      }
    } catch (error) {
      toast.error("Error inesperado al eliminar")
    } finally {
      setIsLoading(false)
      setIsDeleteModalOpen(false)
      setGrupoToDelete(undefined)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedGrupo(undefined)
    // Recargar datos después de cerrar el modal
    window.location.reload()
  }

  const columns = createColumns({
    onEdit: handleEdit,
    onDelete: handleDeleteRequest,
  })

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Grupos (${data.length})`} description="Gestiona los grupos de productos" />
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Nuevo
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="nombre" />

      <GrupoFormModal isOpen={isModalOpen} onClose={handleModalClose} grupo={selectedGrupo} />

      <AlertModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setGrupoToDelete(undefined)
        }}
        onConfirm={handleDeleteConfirm}
        loading={isLoading}
      />
    </>
  )
}
