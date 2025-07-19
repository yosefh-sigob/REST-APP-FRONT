import { getOrdenes } from "@/actions/cocinaOrdenes.actions"
import CocinaOrdenesView from "@/components/cocina/cocina-ordenes-view"

export default async function page() {
  const orders = await getOrdenes()

  return <CocinaOrdenesView initialOrders={orders} />
}
