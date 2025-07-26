import { obtenerMesas, obtenerEstadisticasMesas } from "@/actions/mesas.actions"
import { MeseroMesasView } from "@/components/mesero/mesero-mesas-view"

export default async function MeseroMesasPage() {
  // Obtener datos del servidor
  const [mesas, estadisticas] = await Promise.all([obtenerMesas(), obtenerEstadisticasMesas()])

  // En una app real, aquí filtrarías las mesas por el mesero actual
  // Por ahora mostramos todas las mesas para demostración
  const meseroActual = "Juan Pérez" // Esto vendría de la sesión del usuario

  return <MeseroMesasView mesas={mesas} estadisticas={estadisticas} meseroActual={meseroActual} />
}
