import { getGrupos } from "@/actions/catalogos.actions"
import { GruposView } from "@/components/catalogos/grupos/grupos-view"
import { RouteNotFound } from "@/components/ui/route-not-found"

export default async function GruposPage() {
  const response = await getGrupos()

  if (!response.success) {
    return <RouteNotFound />
  }

  return <GruposView initialData={response.data} />
}
