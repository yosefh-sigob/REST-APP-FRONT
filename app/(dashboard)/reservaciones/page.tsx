import { ReservacionesView } from "@/components/reservaciones/reservaciones-view"
import { getReservaciones } from "@/actions/reservaciones.actions"

export default async function ReservacionesPage() {
  const reservaciones = await getReservaciones()

  return <ReservacionesView reservaciones={reservaciones} />
}
