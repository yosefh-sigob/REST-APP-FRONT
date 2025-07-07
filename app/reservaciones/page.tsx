"use client"
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"
import { ReservacionesView } from "@/components/reservaciones/reservaciones-view"

export default function ReservacionesPage() {
  return (
    <AuthenticatedLayout>
      <ReservacionesView />
    </AuthenticatedLayout>
  )
}
