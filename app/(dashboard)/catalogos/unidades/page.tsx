import { getUnidades } from "@/actions/catalogos.actions"
import { UnidadesView } from "@/components/catalogos/unidades/unidades-view"

export default async function UnidadesPage() {
  const unidades = await getUnidades()

  // Transformar IUnidad[] a IGetUnidad[]
  const unidadesTransformadas = unidades.data.map((u) => ({
    UnidadULID: u.id,
    ClaveUnidad: u.clave,
    Descripcion: (u as any).descripcion || "",
    Abreviacion: u.abreviacion,
    Fecha_UltimoCambio: "",
    Fecha_Sync: "",
    UsuarioULID: "",
    EmpresaULID: "",
  }))

  return <UnidadesView unidades={unidadesTransformadas} />
}
