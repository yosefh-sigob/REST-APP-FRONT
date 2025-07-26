import { obtenerMesas, obtenerEstadisticasMesas } from "@/actions/mesas.actions"
import { MesasView } from "@/components/mesas/mesas-view"

export default async function MesasPage() {
  try {
    const [mesas, estadisticas] = await Promise.all([obtenerMesas(), obtenerEstadisticasMesas()])

    return <MesasView mesas={mesas} estadisticas={estadisticas} />
  } catch (error) {
    console.error("Error al cargar mesas:", error)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error al cargar mesas</h2>
          <p className="text-gray-600">No se pudieron cargar los datos de las mesas.</p>
        </div>
      </div>
    )
  }
}
