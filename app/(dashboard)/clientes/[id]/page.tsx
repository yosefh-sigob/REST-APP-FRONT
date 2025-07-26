import { getClienteDetalle } from "@/actions/clientes.actions"
import { ClienteDetalleView } from "@/components/clientes/cliente-detalle-view"
import { notFound } from "next/navigation"

interface ClienteDetallePageProps {
  params: Promise<{ id: string }>
}

export default async function ClienteDetallePage({ params }: ClienteDetallePageProps) {
  const { id } = await params
  const clienteId = Number.parseInt(id, 10)

  if (isNaN(clienteId)) {
    notFound()
  }

  try {
    const clienteDetalle = await getClienteDetalle(clienteId)

    if (!clienteDetalle) {
      notFound()
    }

    return <ClienteDetalleView clienteDetalle={clienteDetalle} />
  } catch (error) {
    console.error("Error al cargar detalle del cliente:", error)
    throw error
  }
}

export async function generateMetadata({ params }: ClienteDetallePageProps) {
  const { id } = await params
  const clienteId = Number.parseInt(id, 10)

  if (isNaN(clienteId)) {
    return {
      title: "Cliente no encontrado",
    }
  }

  try {
    const clienteDetalle = await getClienteDetalle(clienteId)

    if (!clienteDetalle) {
      return {
        title: "Cliente no encontrado",
      }
    }

    return {
      title: `${clienteDetalle.nombre} - Detalle del Cliente`,
      description: `Historial y estadísticas de ${clienteDetalle.nombre}`,
    }
  } catch {
    return {
      title: "Error al cargar cliente",
    }
  }
}
