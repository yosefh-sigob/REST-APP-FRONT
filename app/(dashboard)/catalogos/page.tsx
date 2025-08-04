import { CatalogosView } from "@/components/catalogos/catalogos-view"

export default async function CatalogosPage() {
  // Aquí se pueden obtener datos del servidor si es necesario
  const catalogosData = {
    totalCatalogos: 10,
    catalogosActivos: 8,
    catalogosInactivos: 2,
  }

  return <CatalogosView data={catalogosData} />
}
