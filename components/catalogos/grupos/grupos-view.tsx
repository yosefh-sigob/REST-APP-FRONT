"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { GrupoFormModal } from "./grupo-form-modal"
import { createColumns } from "./grupos-columns"
import type { Grupo } from "@/interfaces/grupos.interface"

interface GruposViewProps {
  grupos: Grupo[]
}

export function GruposView({ grupos = [] }: GruposViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingGrupo, setEditingGrupo] = useState<Grupo | null>(null)

  const handleEdit = (grupo: Grupo) => {
    setEditingGrupo(grupo)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingGrupo(null)
  }

  const columns = createColumns(handleEdit)

  return (
    <div className="space-y-6">
      {/* Header con botón de regreso */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/catalogos">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Catálogos
          </Link>
        </Button>
      </div>

      {/* Título y descripción */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Grupos de Productos</h1>
          </div>
          <p className="text-muted-foreground">Gestiona las categorías principales de productos del restaurante</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Grupo
        </Button>
      </div>

      {/* Tabla de datos */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Grupos de Productos</CardTitle>
          <CardDescription>Administra las categorías principales de productos de tu restaurante</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={grupos}
            searchKey="nombre"
            searchPlaceholder="Buscar por nombre..."
          />
        </CardContent>
      </Card>

      {/* Modal de formulario */}
      <GrupoFormModal isOpen={isModalOpen} onClose={handleCloseModal} grupo={editingGrupo || undefined} />
    </div>
  )
}
