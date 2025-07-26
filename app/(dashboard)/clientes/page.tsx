import { ClientesView } from "@/components/clientes/clientes-view"
import { getClientesData } from "@/actions/clientes.actions"
import type { Cliente } from "@/interfaces/clientes.interface"

export default async function ClientesPage() {
  try {
    const clientes: Cliente[] = await getClientesData()
    return <ClientesView clientes={clientes} />
  } catch (error) {
    console.error("Error en ClientesPage:", error)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error al cargar clientes</h2>
          <p className="text-gray-600">No se pudieron cargar los datos de clientes. Intenta recargar la página.</p>
        </div>
      </div>
    )
  }
}
