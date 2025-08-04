import { getUnidades } from "@/actions/catalogos.actions"
import { UnidadesView } from "@/components/catalogos/unidades/unidades-view"

export default async function UnidadesPage() {
  const unidades = await getUnidades()

  return <UnidadesView unidades={unidades} />
}
