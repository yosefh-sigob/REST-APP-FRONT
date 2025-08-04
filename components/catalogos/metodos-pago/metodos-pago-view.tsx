"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PlusCircle, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { DataTable } from "@/components/ui/data-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { columns } from "./metodos-pago-columns"
import { MetodoPagoFormModal } from "./metodo-pago-form-modal"
import type { IMetodoPago } from "@/interfaces/metodos-pago.interface"

interface MetodosPagoViewProps {
  data: IMetodoPago[]
}

export function MetodosPagoView({ data }: MetodosPagoViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  return (
    <>
      <MetodoPagoFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="flex-1 space-y-4 p-4 sm:p-6 md:p-8">
        <div className="flex items-center justify-between">
          <Heading
            title="Métodos de Pago"
            description="Gestiona los métodos de pago aceptados en tu restaurante."
            Icon={CreditCard}
          />
          <Button onClick={() => setIsModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Método
          </Button>
        </div>

        <Button variant="outline" onClick={() => router.push("/catalogos")} className="mb-4">
          &larr; Volver a Catálogos
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Métodos de Pago</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={data} filterKey="nombre" />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
