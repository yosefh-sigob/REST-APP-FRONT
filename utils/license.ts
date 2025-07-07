export type LicenseType = "Gratis" | "Lite" | "Pro" | "Franquicia"

export interface LicenseFeature {
  name: string
  description: string
  requiredLicense: LicenseType
}

export const LICENSE_HIERARCHY: Record<LicenseType, number> = {
  Gratis: 0,
  Lite: 1,
  Pro: 2,
  Franquicia: 3,
}

export const FEATURES: Record<string, LicenseFeature> = {
  gestionProductos: {
    name: "Gestión de Productos",
    description: "Crear, editar y eliminar productos",
    requiredLicense: "Lite",
  },
  reportesAvanzados: {
    name: "Reportes Avanzados",
    description: "Análisis detallado de ventas y productos",
    requiredLicense: "Pro",
  },
  inventarioAvanzado: {
    name: "Inventario Avanzado",
    description: "Control de stock y alertas de inventario",
    requiredLicense: "Pro",
  },
  multiSucursal: {
    name: "Multi-sucursal",
    description: "Gestión de múltiples ubicaciones",
    requiredLicense: "Franquicia",
  },
  integrationPOS: {
    name: "Integración POS",
    description: "Conexión con sistemas de punto de venta",
    requiredLicense: "Pro",
  },
  apiCompleta: {
    name: "API Completa",
    description: "Acceso completo a la API REST",
    requiredLicense: "Franquicia",
  },
}

export function hasAccess(currentLicense: LicenseType, requiredLicense: LicenseType): boolean {
  return LICENSE_HIERARCHY[currentLicense] >= LICENSE_HIERARCHY[requiredLicense]
}

export function getUpgradeMessage(feature: string, requiredLicense: LicenseType): string {
  return `${feature} requiere el plan ${requiredLicense} o superior. Actualiza tu plan para acceder a esta funcionalidad.`
}

export function getLicenseColor(license: LicenseType): string {
  const colors = {
    Gratis: "bg-gray-500",
    Lite: "bg-blue-500",
    Pro: "bg-purple-500",
    Franquicia: "bg-orange-500",
  }
  return colors[license]
}
