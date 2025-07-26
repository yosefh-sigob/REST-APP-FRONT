import { getClientesData } from "@/actions/clientes.actions"
import { ClientesView } from "@/components/clientes/clientes-view"

export default async function ClientesPage() {
  try {
    const clientes = await getClientesData()

    return <ClientesView clientes={clientes} />
  } catch (error) {
    console.error("Error al cargar clientes:", error)
    throw error
  }
}

export const metadata = {
  title: "Gestión de Clientes",
  description: "Administra la base de datos de clientes del restaurante",
}
