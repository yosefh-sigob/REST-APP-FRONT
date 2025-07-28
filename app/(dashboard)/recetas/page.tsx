import { obtenerRecetas, obtenerEstadisticasRecetas, obtenerCategoriasRecetas } from "@/actions/recetas.actions"
import RecetasView from "@/components/recetas/recetas-view"

export default async function RecetasPage() {
  try {
    const [recetas, estadisticas, categorias] = await Promise.all([
      obtenerRecetas(),
      obtenerEstadisticasRecetas(),
      obtenerCategoriasRecetas(),
    ])

    return <RecetasView recetas={recetas} estadisticas={estadisticas} categorias={categorias} />
  } catch (error) {
    console.error("Error al cargar recetas:", error)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error al cargar recetas</h2>
          <p className="text-gray-600">Por favor, intenta recargar la página</p>
        </div>
      </div>
    )
  }
}
