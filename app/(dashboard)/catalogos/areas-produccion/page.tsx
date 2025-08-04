import { getAreasProduccion } from "@/actions/catalogos.actions"
import { AreasProduccionView } from "@/components/catalogos/areas-produccion/areas-produccion-view"

export default async function AreasProduccionPage() {
  const areasProduccion = await getAreasProduccion()

  return <AreasProduccionView areasProduccion={areasProduccion} />
}
