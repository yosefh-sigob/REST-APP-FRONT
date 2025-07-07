"use client"

import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"
import { DashboardView } from "@/components/dashboard/dashboard-view"

export default function DashboardPage() {
  return (
    <AuthenticatedLayout>
      <DashboardView />
    </AuthenticatedLayout>
  )
}
