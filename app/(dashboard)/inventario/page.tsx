import { obtenerInventario, obtenerEstadisticasInventario } from "@/actions/inventario.actions"
import InventarioView from "@/components/inventario/inventario-view"

export default async function InventarioPage() {
  const [inventario, estadisticas] = await Promise.all([obtenerInventario(), obtenerEstadisticasInventario()])

  return <InventarioView inventario={inventario} estadisticas={estadisticas} />
}
