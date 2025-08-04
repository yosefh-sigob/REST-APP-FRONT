import { CatalogosView } from "@/components/catalogos/catalogos-view"

export default async function CatalogosPage() {
  // Simulación de datos, en el futuro esto vendría de una API
  const catalogosData = [
    { title: "Grupos de Productos", count: 5, status: "active" as const },
    { title: "Subgrupos", count: 12, status: "active" as const },
    { title: "Unidades de Medida", count: 8, status: "active" as const },
    { title: "Áreas de Producción", count: 3, status: "pending" as const },
    { title: "Almacenes", count: 2, status: "active" as const },
    { title: "Tipos de Cliente", count: 4, status: "inactive" as const },
    { title: "Métodos de Pago", count: 6, status: "active" as const },
    { title: "Estados de Mesa", count: 4, status: "active" as const },
    { title: "Estados de Orden", count: 5, status: "pending" as const },
    { title: "Tipos de Reservación", count: 3, status: "active" as const },
  ]

  return <CatalogosView catalogos={catalogosData} />
}
