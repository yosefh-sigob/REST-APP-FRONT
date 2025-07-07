import { obtenerProductosAction, obtenerDatosRelacionadosAction } from "@/actions/productos.actions"
import { ProductosView } from "@/components/productos/productos-view"
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"

export default async function ProductosPage() {
  // Cargar datos iniciales en paralelo
  const [productosResult, datosRelacionadosResult] = await Promise.all([
    obtenerProductosAction(),
    obtenerDatosRelacionadosAction(),
  ])

  // Manejar errores de carga
  if (!productosResult.success) {
    return (
      <AuthenticatedLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar productos</h2>
            <p className="text-gray-600">{productosResult.error}</p>
          </div>
        </div>
      </AuthenticatedLayout>
    )
  }

  if (!datosRelacionadosResult.success) {
    return (
      <AuthenticatedLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar datos relacionados</h2>
            <p className="text-gray-600">{datosRelacionadosResult.error}</p>
          </div>
        </div>
      </AuthenticatedLayout>
    )
  }

  return (
    <AuthenticatedLayout>
      <ProductosView
        productosIniciales={productosResult.data || []}
        datosRelacionados={
          datosRelacionadosResult.data || { grupos: [], subgrupos: [], unidades: [], areasProduccion: [] }
        }
      />
    </AuthenticatedLayout>
  )
}
