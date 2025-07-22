import { getReservaciones } from "@/actions/reservaciones.actions"
import { ReservacionesView } from "@/components/reservaciones/reservaciones-view"

export default async function ReservacionesPage() {
  try {
    const reservaciones = await getReservaciones()

    return <ReservacionesView reservaciones={reservaciones} />
  } catch (error) {
    console.error("Error en ReservacionesPage:", error)

    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error al cargar reservaciones</h2>
          <p className="text-gray-600">No se pudieron cargar las reservaciones. Intenta recargar la página.</p>
        </div>
      </div>
    )
  }
}
