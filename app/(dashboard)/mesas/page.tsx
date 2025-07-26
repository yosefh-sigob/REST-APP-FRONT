import { MesasView } from "@/components/mesas/mesas-view"
import { obtenerMesas, obtenerEstadisticasMesas } from "@/actions/mesas.actions"

export default async function MesasPage() {
  try {
    // Obtener datos en paralelo para mejor performance
    const [mesas, estadisticas] = await Promise.all([obtenerMesas(), obtenerEstadisticasMesas()])

    return <MesasView mesas={mesas} estadisticas={estadisticas} />
  } catch (error) {
    console.error("Error en MesasPage:", error)

    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error al cargar las mesas</h2>
          <p className="text-gray-600">No se pudieron cargar los datos. Por favor, intenta nuevamente.</p>
        </div>
      </div>
    )
  }
}
