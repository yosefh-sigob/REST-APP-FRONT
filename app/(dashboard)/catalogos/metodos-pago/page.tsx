import { getMetodosPago } from "@/actions/catalogos.actions"
import { MetodosPagoView } from "@/components/catalogos/metodos-pago/metodos-pago-view"

export default async function MetodosPagoPage() {
  const response = await getMetodosPago()

  return <MetodosPagoView metodosPago={response.data || []} />
}
