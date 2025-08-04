"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"

import { columns } from "./metodos-pago-columns"
import { MetodoPagoFormModal } from "./metodo-pago-form-modal"
import type { IMetodoPago } from "@/interfaces/metodos-pago.interface"

interface MetodosPagoViewProps {
  initialData: IMetodoPago[]
}

export function MetodosPagoView({ initialData }: MetodosPagoViewProps) {
  const [data] = useState<IMetodoPago[]>(initialData)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <Heading title="Métodos de Pago" description="Gestiona los métodos de pago disponibles para tu restaurante" />
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Método
        </Button>
      </div>

      <Separator />

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Lista de Métodos de Pago</h3>
          <p className="text-sm text-muted-foreground">Administra los métodos de pago de tu restaurante</p>
        </div>

        <DataTable searchKey="nombre" columns={columns} data={data} />
      </div>

      <MetodoPagoFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
