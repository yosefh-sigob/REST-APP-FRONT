"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Circle, ArrowLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
// import { EstadoMesaFormModal } from "./estado-mesa-form-modal"
import { estadosMesaColumns } from "./estados-mesa-columns"
import { IEstadoMesa } from "@/interfaces/estados-mesa.interface"
import { deleteEstadoMesa, getEstadosMesa } from "@/actions/catalogos.actions"

export default function EstadosMesaView() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEstadoMesa, setEditingEstadoMesa] = useState<IEstadoMesa | null>(null)
  const [estadosMesa, setEstadosMesa] = useState<IEstadoMesa[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Cargar datos al montar el componente
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getEstadosMesa()
        if (response.success) {
          setEstadosMesa(response.data)
        }
      } catch (error) {
        console.error("Error cargando estados de mesa:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const handleEdit = (estadoMesa: IEstadoMesa) => {
    setEditingEstadoMesa(estadoMesa)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingEstadoMesa(null)
  }

  const refreshData = async () => {
    const response = await getEstadosMesa()
    if (response.success) {
      setEstadosMesa(response.data)
    }
  }

  return (
    <div className="space-y-6">
      {/* Botón de regreso */}
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
            <Circle className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Estados de Mesa</h1>
          </div>
          <p className="text-muted-foreground">Gestiona los diferentes estados que pueden tener las mesas del restaurante</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Estado
        </Button>
      </div>

      {/* Tabla de datos */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Estados de Mesa</CardTitle>
          <CardDescription>Administra los estados disponibles para las mesas</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={estadosMesaColumns(handleEdit)}
            data={estadosMesa}
            searchKey="nombre"
            searchPlaceholder="Buscar estados..."
          />
        </CardContent>
      </Card>

      {/* Modal de formulario */}
      {/* <EstadoMesaFormModal isOpen={isModalOpen} onClose={handleCloseModal} estadoMesa={editingEstadoMesa} /> */}
    </div>
  )
}
