"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { MetodoPagoFormModal } from "./metodo-pago-form-modal"
import { columns } from "./metodos-pago-columns"
import type { IMetodoPago } from "@/interfaces/metodos-pago.interface"

interface MetodosPagoViewProps {
  metodosPago: IMetodoPago[]
}

export function MetodosPagoView({ metodosPago }: MetodosPagoViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMetodo, setEditingMetodo] = useState<IMetodoPago | null>(null)

  const handleEdit = (metodo: IMetodoPago) => {
    setEditingMetodo(metodo)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingMetodo(null)
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
            <CreditCard className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Métodos de Pago</h1>
          </div>
          <p className="text-muted-foreground">Gestiona las formas de pago aceptadas en el restaurante</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Método
        </Button>
      </div>

      {/* Tabla de datos */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Métodos de Pago</CardTitle>
          <CardDescription>Administra los métodos de pago de tu restaurante</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={metodosPago}
            searchKey="nombre"
            searchPlaceholder="Buscar por nombre..."
          />
        </CardContent>
      </Card>

      {/* Modal de formulario */}
      <MetodoPagoFormModal isOpen={isModalOpen} onClose={handleCloseModal} initialData={editingMetodo} />
    </div>
  )
}
