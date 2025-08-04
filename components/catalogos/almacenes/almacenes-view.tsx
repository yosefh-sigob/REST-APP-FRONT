"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Warehouse } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import AlmacenFormModal from "./almacen-form-modal"
import { createColumns } from "./almacenes-columns"
import type { IGetAlmacen } from "@/interfaces/almacen.interface"

interface AlmacenesViewProps {
  almacenes: IGetAlmacen[]
}

export default function AlmacenesView({ almacenes = [] }: AlmacenesViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAlmacen, setEditingAlmacen] = useState<IGetAlmacen | null>(null)

  const handleEdit = (almacen: IGetAlmacen) => {
    setEditingAlmacen(almacen)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingAlmacen(null)
  }

  const columns = createColumns({ onEdit: handleEdit })

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
            <Warehouse className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Almacenes</h1>
          </div>
          <p className="text-muted-foreground">Gestiona las ubicaciones de almacenamiento de inventario</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Almacén
        </Button>
      </div>

      {/* Tabla de datos */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Almacenes</CardTitle>
          <CardDescription>Administra las ubicaciones de almacenamiento de tu restaurante</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={almacenes}
            searchKey="Nombre"
            searchPlaceholder="Buscar por nombre..."
          />
        </CardContent>
      </Card>

      {/* Modal de formulario */}
      <AlmacenFormModal isOpen={isModalOpen} onClose={handleCloseModal} almacen={editingAlmacen} />
    </div>
  )
}
