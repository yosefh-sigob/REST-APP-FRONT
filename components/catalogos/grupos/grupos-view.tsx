"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { PlusCircle } from "lucide-react"

import type { IGrupo } from "@/interfaces/grupos.interface"
import { deleteGrupoCatalogos } from "@/actions/catalogos.actions"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { AlertModal } from "@/components/modals/alert-modal"
import { GrupoFormModal } from "./grupo-form-modal"
import { columns } from "./grupos-columns"

interface GruposViewProps {
  initialData: IGrupo[]
}

export function GruposView({ initialData }: GruposViewProps) {
  const router = useRouter()
  const [data, setData] = useState<IGrupo[]>(initialData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [editingGrupo, setEditingGrupo] = useState<IGrupo | undefined>(undefined)
  const [deletingGrupoId, setDeletingGrupoId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleNew = () => {
    setEditingGrupo(undefined)
    setIsModalOpen(true)
  }

  const handleEdit = (grupo: IGrupo) => {
    setEditingGrupo(grupo)
    setIsModalOpen(true)
  }

  const handleDeleteConfirm = (id: string) => {
    setDeletingGrupoId(id)
    setIsAlertOpen(true)
  }

  const handleDelete = async () => {
    if (!deletingGrupoId) return

    setIsLoading(true)
    const promise = deleteGrupoCatalogos(deletingGrupoId).then((res) => {
      if (res.success) {
        setData(data.filter((item) => item.id !== deletingGrupoId))
        return res.message
      }
      throw new Error(res.message)
    })

    toast.promise(promise, {
      loading: "Eliminando grupo...",
      success: (message) => message,
      error: (err) => err.message,
      finally: () => {
        setDeletingGrupoId(null)
        setIsAlertOpen(false)
        setIsLoading(false)
      },
    })
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingGrupo(undefined)
    router.refresh() // Recargar datos del servidor
  }

  return (
    <>
      <AlertModal
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={handleDelete}
        loading={isLoading}
      />
      <GrupoFormModal isOpen={isModalOpen} onClose={handleCloseModal} grupo={editingGrupo} />

      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading title="Grupos de Productos" description="Gestiona los grupos para tus productos." />
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => router.push("/catalogos")}>
              Volver a Catálogos
            </Button>
            <Button onClick={handleNew}>
              <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Grupo
            </Button>
          </div>
        </div>
        <Separator />
        <Card>
          <CardHeader>
            <CardTitle>Lista de Grupos</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns({ onEdit: handleEdit, onDelete: handleDeleteConfirm })} data={data} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
