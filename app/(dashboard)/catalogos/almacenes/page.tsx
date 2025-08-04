import { getAlmacenes } from "@/actions/catalogos.actions"
import AlmacenesView from "@/components/catalogos/almacenes/almacenes-view"
import type { IGetAlmacen } from "@/interfaces/almacen.interface"

export default async function AlmacenesPage() {
  let almacenes: IGetAlmacen[] = []
  let error: string | null = null

  try {
    almacenes = await getAlmacenes()
  } catch (e) {
    error = "No se pudieron cargar los almacenes. Por favor, intente de nuevo más tarde."
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>
  }

  return <AlmacenesView almacenes={almacenes} />
}
