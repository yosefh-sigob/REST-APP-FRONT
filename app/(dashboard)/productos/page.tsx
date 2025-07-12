import { obtenerProductosAction, obtenerProductosActionAPI, obtenerDatosRelacionadosAction } from "@/actions/productos.actions"
import { ProductosView } from "@/components/productos/productos-view"

export default async function ProductosPage() {
  // Cargar datos iniciales en paralelo
  const [productosResultApi, productosResult, datosRelacionadosResult] = await Promise.all([
    obtenerProductosActionAPI(),
    obtenerProductosAction(),
    obtenerDatosRelacionadosAction(),
  ])

  // Manejar errores de carga
  if (!productosResult.success) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar productos</h2>
          <p className="text-gray-600">{productosResult.error}</p>
        </div>
      </div>
    )
  }

  if (!datosRelacionadosResult.success) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar datos relacionados</h2>
          <p className="text-gray-600">{datosRelacionadosResult.error}</p>
        </div>
      </div>
    )
  }

  return (
  <>
    <ProductosView
      productosIniciales={productosResult.data || []}
      datosRelacionados={
        datosRelacionadosResult.data || { grupos: [], subgrupos: [], unidades: [], areasProduccion: [] }
      }
    />

    {/* 👇 Esto es solo para visualizar en pantalla */}
    <div className="mt-8 bg-gray-100 p-4">
      <h3 className="font-bold mb-2">Contenido de productosResultApi:</h3>
      <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(productosResultApi, null, 2)}</pre>
    </div>
  </>
)
}
