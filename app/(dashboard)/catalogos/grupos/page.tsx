import { getGrupos } from "@/actions/catalogos.actions"
import { GruposView } from "@/components/catalogos/grupos/grupos-view"

export default async function GruposPage() {
  const grupos = await getGrupos()

  // Simulación de obtención de áreas de producción para el formulario
  const areasProduccion = [
    { id: "AREA-001", nombre: "Cocina" },
    { id: "AREA-002", nombre: "Bar" },
    { id: "AREA-003", nombre: "Postres" },
  ]

  return <GruposView initialData={grupos} areasProduccion={areasProduccion} />
}
