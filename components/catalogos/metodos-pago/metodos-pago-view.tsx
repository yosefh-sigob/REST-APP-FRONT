"use client"

import { useState } from "react"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { MetodoPagoFormModal } from "./metodo-pago-form-modal"
import { columns } from "./metodos-pago-columns"
import type { IMetodoPago } from "@/interfaces/metodos-pago.interface"

interface MetodosPagoViewProps {
  metodosPago: IMetodoPago[]
}

export function MetodosPagoView({ metodosPago }: MetodosPagoViewProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/catalogos">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <Heading title="Métodos de Pago" description="Gestiona los métodos de pago del restaurante" />
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Método
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="nombre" columns={columns} data={metodosPago} />
      <MetodoPagoFormModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
