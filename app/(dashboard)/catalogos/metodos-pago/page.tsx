import { getMetodosPago } from "@/actions/catalogos.actions"
import { MetodosPagoView } from "@/components/catalogos/metodos-pago/metodos-pago-view"
import type { IMetodoPago } from "@/interfaces/metodos-pago.interface"

export default async function MetodosPagoPage() {
  const data: IMetodoPago[] = await getMetodosPago()

  return <MetodosPagoView data={data} />
}
