"use client"

import { useState } from "react"
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"
import { ClientesView } from "@/components/clientes/clientes-view"
import { mockClientes } from "@/lib/data/mock-data"
import type { Cliente } from "@/lib/types"

export default function ClientesPage() {
  const [clientes] = useState<Cliente[]>(mockClientes)
  const [busqueda, setBusqueda] = useState("")
  const [dialogAbierto, setDialogAbierto] = useState(false)
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null)

  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.apellidos.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.telefono.includes(busqueda),
  )

  const abrirDetalleCliente = (cliente: Cliente) => {
    setClienteSeleccionado(cliente)
    setDialogAbierto(true)
  }

  return (
    <AuthenticatedLayout>
      <ClientesView
        clientes={clientes}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        dialogAbierto={dialogAbierto}
        setDialogAbierto={setDialogAbierto}
        clienteSeleccionado={clienteSeleccionado}
        setClienteSeleccionado={setClienteSeleccionado}
        abrirDetalleCliente={abrirDetalleCliente}
        clientesFiltrados={clientesFiltrados}
      />
    </AuthenticatedLayout>
  )
}
