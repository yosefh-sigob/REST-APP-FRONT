'use server'

import { ClientesView } from "@/components/clientes/clientes-view"
import { getClientesData } from "@/actions/clientes.actions"
import { type Cliente } from "@/interfaces/clientes.interface"

export default async function ClientesPage() {
  const clientes: Cliente[] = await getClientesData()

  return <ClientesView clientes={clientes} />
}
