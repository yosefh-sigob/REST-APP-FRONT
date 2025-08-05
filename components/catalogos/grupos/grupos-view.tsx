"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Package, Plus } from "lucide-react"
import { toast } from "sonner"

import type { IGrupo } from "@/interfaces/grupos.interface"
import { deleteGrupo } from "@/actions/catalogos.actions"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/modals/alert-modal"
import { GrupoFormModal } from "./grupo-form-modal"
import { createColumns } from "./grupos-columns"

interface GruposViewProps {
  initialData: IGrupo[]
}

export function GruposView({ initialData }: GruposViewProps) {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)
  const [activeGrupo, setActiveGrupo] = useState<IGrupo | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleEdit = (grupo: IGrupo) => {
    setActiveGrupo(grupo)
    setIsFormModalOpen(true)
  }

  const handleDeleteRequest = (grupo: IGrupo) => {
    setActiveGrupo(grupo)
    setIsAlertModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!activeGrupo) return

    setIsLoading(true)
    const result = await deleteGrupo(activeGrupo.id)

    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }

    setIsLoading(false)
    setIsAlertModalOpen(false)
    setActiveGrupo(null)
  }

  const columns = createColumns({ onEdit: handleEdit, onDelete: handleDeleteRequest })

  return (
    <>
      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={isLoading}
        title="¿Estás absolutamente seguro?"
        description="Esta acción no se puede deshacer. Esto eliminará permanentemente el grupo."
      />
      <GrupoFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false)
          setActiveGrupo(null)
        }}
        grupo={activeGrupo || undefined}
      />

      <div className="space-y-4 p-4 sm:p-6 md:p-8">
        <div className="flex items-center justify-between">
          <Heading
            title="Grupos de Productos"
            description="Gestiona las categorías principales de productos del restaurante."
            Icon={Package}
          />
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/catalogos">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
              </Link>
            </Button>
            <Button onClick={() => setIsFormModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Grupo
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Grupos</CardTitle>
            <CardDescription>Aquí puedes ver, editar y eliminar los grupos de productos existentes.</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={initialData}
              searchKey="nombre"
              searchPlaceholder="Buscar por nombre..."
            />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
