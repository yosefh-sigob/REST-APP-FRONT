import { getMeseroOrdenes, getMeseroOrdenesStats } from "@/actions/meseroOrdenes.actions"
import { MeseroOrdenesView } from "@/components/mesero/mesero-ordenes-view"

export default async function MeseroOrdenesPage() {
  // Simular ID del mesero actual (en producción vendría de la sesión)
  const meseroId = "mesero-001"

  // Obtener datos en paralelo
  const [ordenes, stats] = await Promise.all([getMeseroOrdenes(meseroId), getMeseroOrdenesStats(meseroId)])

  return <MeseroOrdenesView ordenes={ordenes} stats={stats} meseroId={meseroId} />
}
