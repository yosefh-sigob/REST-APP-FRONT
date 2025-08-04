"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { AreaProduccionFormModal } from "./area-produccion-form-modal"
import { areasProduccionColumns } from "./areas-produccion-columns"
import type { IGetAreaProduccion } from "@/interfaces/areaProduccion.interface"

interface AreasProduccionViewProps {
  areasProduccion: IGetAreaProduccion[]
}

export function AreasProduccionView({ areasProduccion }: AreasProduccionViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingArea, setEditingArea] = useState<IGetAreaProduccion | null>(null)

  const handleEdit = (area: IGetAreaProduccion) => {
    setEditingArea(area)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingArea(null)
  }

  const columns = areasProduccionColumns(handleEdit)

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
            <Printer className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Áreas de Producción</h1>
          </div>
          <p className="text-muted-foreground">Gestiona las áreas de producción y sus impresoras asociadas</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Área
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Áreas</CardTitle>
            <Printer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{areasProduccion.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Áreas Activas</CardTitle>
            <Printer className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {areasProduccion.filter((area) => area.activa).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Con Impresora</CardTitle>
            <Printer className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {areasProduccion.filter((area) => area.impresora && area.impresora.trim() !== "").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de datos */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Áreas de Producción</CardTitle>
          <CardDescription>Administra las áreas de producción de tu restaurante</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={areasProduccion}
            searchKey="descripcion"
            searchPlaceholder="Buscar por descripción..."
          />
        </CardContent>
      </Card>

      {/* Modal de formulario */}
      <AreaProduccionFormModal isOpen={isModalOpen} onClose={handleCloseModal} area={editingArea} />
    </div>
  )
}
