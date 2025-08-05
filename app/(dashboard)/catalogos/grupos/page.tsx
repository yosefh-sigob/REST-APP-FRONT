import { getGruposCatalogos } from "@/actions/catalogos.actions"
import { GruposView } from "@/components/catalogos/grupos/grupos-view"

export default async function GruposPage() {
  const result = await getGruposCatalogos()

  if (!result.success) {
    throw new Error(result.message || "Error al cargar los grupos")
  }

  return <GruposView initialData={result.data || []} />
}
