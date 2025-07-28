import { obtenerRecetas, obtenerEstadisticasRecetas, obtenerCategorias } from "@/actions/recetas.actions"
import RecetasView from "@/components/recetas/recetas-view"

export default async function RecetasPage() {
  const [recetas, estadisticas, categorias] = await Promise.all([
    obtenerRecetas({ activa: true }),
    obtenerEstadisticasRecetas(),
    obtenerCategorias(),
  ])

  return <RecetasView recetas={recetas} estadisticas={estadisticas} categorias={categorias} />
}
