"use client"

import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { tiposClienteColumns } from "./tipos-cliente-columns"
import { TipoClienteFormModal } from "./tipo-cliente-form-modal"
import type { ITipoCliente } from "@/interfaces/tipos-cliente.interface"

interface TiposClienteViewProps {
  data: ITipoCliente[]
}

export function TiposClienteView({ data }: TiposClienteViewProps) {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-start justify-between">
        <Heading
          title={`Tipos de Cliente (${data.length})`}
          description="Gestiona los tipos de cliente para tu restaurante"
        />
        <TipoClienteFormModal>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Añadir Nuevo
          </Button>
        </TipoClienteFormModal>
      </div>
      <Separator />
      <DataTable columns={tiposClienteColumns} data={data} filterKey="nombre" />
    </div>
  )
}
