import { getTiposCliente } from "@/actions/catalogos.actions"
import { TiposClienteView } from "@/components/catalogos/tipos-cliente/tipos-cliente-view"
import type { ITipoCliente } from "@/interfaces/tipos-cliente.interface"

export default async function TiposClientePage() {
  const data: ITipoCliente[] = await getTiposCliente()

  return <TiposClienteView data={data} />
}
