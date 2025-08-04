"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { TipoClienteFormModal } from "./tipo-cliente-form-modal"
import { tiposClienteColumns } from "./tipos-cliente-columns"
import type { ITipoCliente } from "@/interfaces/tipos-cliente.interface"

interface TiposClienteViewProps {
  data: ITipoCliente[]
}

export function TiposClienteView({ data }: TiposClienteViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTipo, setEditingTipo] = useState<ITipoCliente | null>(null)

  const handleEdit = (tipo: ITipoCliente) => {
    setEditingTipo(tipo)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTipo(null)
  }

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
            <Users className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Tipos de Cliente</h1>
          </div>
          <p className="text-muted-foreground">Gestiona la clasificación de clientes del restaurante</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Tipo
        </Button>
      </div>

      {/* Tabla de datos */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Tipos de Cliente</CardTitle>
          <CardDescription>Administra los tipos de cliente de tu restaurante ({data.length} registros)</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={tiposClienteColumns}
            data={data}
            searchKey="nombre"
            searchPlaceholder="Buscar por nombre..."
          />
        </CardContent>
      </Card>

      {/* Modal de formulario */}
      <TipoClienteFormModal>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Tipo
        </Button>
      </TipoClienteFormModal>
    </div>
  )
}
