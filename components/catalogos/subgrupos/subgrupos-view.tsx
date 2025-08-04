"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Package2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { SubgrupoFormModal } from "./subgrupo-form-modal"
import { columns } from "./subgrupos-columns"
import type { Grupo } from "@/interfaces/grupos.interface"
import type { Subgrupo } from "@/interfaces/subgrupos.interface"

interface SubgruposViewProps {
  subgrupos: Subgrupo[]
  grupos: Grupo[]
}

export function SubgruposView({ subgrupos, grupos }: SubgruposViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSubgrupo, setEditingSubgrupo] = useState<Subgrupo | null>(null)

  const handleEdit = (subgrupo: Subgrupo) => {
    setEditingSubgrupo(subgrupo)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingSubgrupo(null)
  }

  // Pasar handleEdit a las columnas
  const tableColumns = columns.map((col) => {
    if (col.id === "actions") {
      return { ...col, meta: { ...col.meta, handleEdit } }
    }
    return col
  })

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
            <Package2 className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Subgrupos de Productos</h1>
          </div>
          <p className="text-muted-foreground">Gestiona las subcategorías dentro de cada grupo de productos</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Subgrupo
        </Button>
      </div>

      {/* Tabla de datos */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Subgrupos de Productos</CardTitle>
          <CardDescription>Administra las subcategorías de productos de tu restaurante</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={tableColumns}
            data={subgrupos}
            searchKey="nombre"
            searchPlaceholder="Buscar por nombre..."
          />
        </CardContent>
      </Card>

      {/* Modal de formulario */}
      <SubgrupoFormModal isOpen={isModalOpen} onClose={handleCloseModal} subgrupo={editingSubgrupo} grupos={grupos} />
    </div>
  )
}
