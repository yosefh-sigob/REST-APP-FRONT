import { getMetodosPago } from "@/actions/catalogos.actions"
import { MetodosPagoView } from "@/components/catalogos/metodos-pago/metodos-pago-view"

export default async function MetodosPagoPage() {
  const metodosPago = await getMetodosPago()

  return <MetodosPagoView initialData={metodosPago} />
}
