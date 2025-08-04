"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { UnidadFormModal } from "./unidad-form-modal"
import { columns } from "./unidades-columns"
import type { IGetUnidad } from "@/interfaces/unidad.interface"

interface UnidadesViewProps {
  unidades: IGetUnidad[]
}

export function UnidadesView({ unidades }: UnidadesViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUnidad, setEditingUnidad] = useState<IGetUnidad | null>(null)

  const handleEdit = (unidad: IGetUnidad) => {
    setEditingUnidad(unidad)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingUnidad(null)
  }

  return (
    <div className="space-y-6">
      {/* Botón de regreso */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/catalogos">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Catálogos
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Unidades de Medida</h1>
          <p className="text-muted-foreground">
            Gestiona las unidades de medida utilizadas en el inventario y productos.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Unidad
        </Button>
      </div>

      {/* Tabla de datos */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Unidades</CardTitle>
          <CardDescription>Administra todas las unidades de medida del sistema.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns(handleEdit)}
            data={unidades}
            searchKey="nombre"
            searchPlaceholder="Buscar unidades..."
          />
        </CardContent>
      </Card>

      {/* Modal de formulario */}
      <UnidadFormModal isOpen={isModalOpen} onClose={handleCloseModal} unidad={editingUnidad} />
    </div>
  )
}
