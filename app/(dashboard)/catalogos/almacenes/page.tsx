import { getAlmacenes } from "@/actions/catalogos.actions"
import AlmacenesView from "@/components/catalogos/almacenes/almacenes-view"
import type { IGetAlmacen, IAlmacen } from "@/interfaces/almacen.interface"

export default async function AlmacenesPage() {
  let almacenes: IAlmacen[] = []
  let almacenesGet: IGetAlmacen[] = []
  let error: string | null = null

  try {
    const result = await getAlmacenes()
    if (result.success) {
      almacenes = result.data
      almacenesGet = almacenes.map((a) => ({
        AlmacenULID: a.id,
        ClaveAlmacen: a.clave,
        Nombre: a.nombre,
        Descripcion: a.descripcion,
        Direccion: a.direccion,
        Activo: a.activo,
        Fecha_UltimoCambio: "",
        Fecha_Sync: "",
        UsuarioULID: "",
        EmpresaULID: "",
      }))
    } else {
      error = result.message
    }
  } catch (e) {
    error = "No se pudieron cargar los almacenes. Por favor, intente de nuevo más tarde."
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>
  }

  return <AlmacenesView almacenes={almacenesGet} />
}
