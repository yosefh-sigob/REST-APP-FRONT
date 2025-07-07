"use client"
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"
import { MesasView } from "@/components/mesas/mesas-view"

export default function MesasPage() {
  return (
    <AuthenticatedLayout>
      <MesasView />
    </AuthenticatedLayout>
  )
}
