export enum TipoEmpresa {
  RESTAURANTE = "Restaurante",
  FRANQUICIA = "Franquicia",
  CORPORATIVO = "Corporativo",
}

export enum NivelLicencia {
  GRATIS = "Gratis",
  LITE = "Lite",
  PRO = "Pro",
  FRANQUICIA = "Franquicia",
}

export enum TipoProducto {
  PLATILLO = "Platillo",
  PRODUCTO = "Producto",
  BOTELLA = "Botella",
}

export enum TipoPago {
  MENSUAL = "Mensual",
  ANUAL = "Anual",
}

export enum TipoPersona {
  FISICA = "Fisica",
  MORAL = "Moral",
}

export enum EstadoVenta {
  PENDIENTE = "Pendiente",
  PAGADA = "Pagada",
  CANCELADA = "Cancelada",
  DEVUELTA = "Devuelta",
}

export enum TipoVenta {
  COMEDOR = "Comedor",
  DOMICILIO = "Domicilio",
  MOSTRADOR = "Mostrador",
  ONLINE = "Online",
}

export enum EstadoReservacion {
  PENDIENTE = "Pendiente",
  CONFIRMADA = "Confirmada",
  SENTADO = "Sentado",
  CANCELADA = "Cancelada",
  NO_SHOW = "NoShow",
}

export enum CanalReservacion {
  TELEFONO = "Telefono",
  PRESENCIAL = "Presencial",
  ONLINE = "Online",
  APP = "App",
  WHATSAPP = "WhatsApp",
}

export interface Empresa {
  EmpresaULID: string
  TipoEmpresa: TipoEmpresa
  NombreComercial: string
  RazonSocial: string
  RFC: string
  Direccion: string
  Telefono: string
  Email: string
  SitioWeb?: string
  Logo?: string
  NivelLicencia: NivelLicencia
  FechaVencimientoLicencia: Date
  Activa: boolean
  Fecha_UltimoCambio: Date
  Fecha_Sync?: Date
  UsuarioULID: number
}

export interface Usuario {
  UsuarioULID: string
  NombreCompleto: string
  Usuario: string
  Correo: string
  Contraseña: string
  PIN: string
  Celular: string
  Puesto: string
  EsAdministrador: boolean
  Suspendido: boolean
  FechaSuspension?: Date
  Fecha_UltimoCambio: Date
  Fecha_Sync?: Date
  Usuario2ULID?: number
  EmpresaULID: string
}

export interface GrupoProducto {
  GrupoProductoULID: number
  ClaveGrupo: string
  Orden: number
  Descripcion: string
  Clasificacion: string
  MenuQR: boolean
  CatalogoOnline: boolean
  APPComensal: boolean
  Inactiva: boolean
  Paletacolor: string
  Imagen?: string
  Sucursales: boolean
  AplicarComentarios: boolean
  CamposDinamicos?: any
  Fecha_UltimoCambio: Date
  Fecha_Sync?: Date
  UsuarioULID: number
}

export interface SubgrupoProducto {
  SubgrupoProductoULID: string
  ClaveGrupo: number
  ClaveSubGrupo: string
  Descripcion: string
  AplicarComentarios: boolean
  Suspendido: boolean
  Fecha_UltimoCambio: Date
  Fecha_Sync?: Date
  UsuarioULID: number
  EmpresaULID: string
}

export interface Unidad {
  UnidadULID: number
  ClaveUnidad: string
  Descripcion: string
  Abreviacion: string
  Fecha_UltimoCambio: Date
  Fecha_Sync?: Date
  UsuarioULID: number
  EmpresaULID: string
}

export interface AreaProduccion {
  AreaProduccionULID: number
  ClaveAreaProduccion: string
  Descripcion: string
  Impresora?: string
  Fecha_UltimoCambio: Date
  Fecha_Sync?: Date
  UsuarioULID: number
  EmpresaULID: string
}

export interface Almacen {
  AlmacenULID: number
  ClaveAlmacen: string
  Descripcion: string
  Fecha_UltimoCambio: Date
  Fecha_Sync?: Date
  UsuarioULID: number
  SucursalULID: number
  EmpresaULID: string
}

export interface Producto {
  ProductoULID: string
  GrupoProductoULID: number
  SubgrupoProductoULID?: number
  ClaveProducto: string
  TipoProducto: TipoProducto
  Nombredelproducto: string
  Favorito: boolean
  Descripcion?: string
  Imagen?: string // Base64 string
  ExentoImpuesto: boolean
  PrecioAbierto: boolean
  UnidadesULID: number
  AreaProduccionULID?: number
  AlmacenULID?: number
  ControlStock: boolean
  PrecioxUtilidadad: boolean
  Facturable: boolean
  ClaveTributaria?: string
  Suspendido: boolean
  Comedor: boolean
  ADomicilio: boolean
  Mostrador: boolean
  Enlinea: boolean
  EnAPP: boolean
  CanalesVenta: boolean
  EnMenuQR: boolean
  ClasificacionQRULID?: number
  DatosDinamicos?: any
  Fecha_UltimoCambio: Date
  Fecha_Sync?: Date
  UsuarioULID: number
  EmpresaULID: string
}

export interface ProductoPresentacion {
  PresentacionULID: string
  ProductoULID: string
  CodigoPresentacion: string
  NombrePresentacion: string
  CostoInsumos: number
  UnidadesULID: number
  PreciodeVenta: number
  ComisiondeVenta: number
  ComisiondeVentaPorcentaje: number
  Puntos: number
  VariosenEnPlato: boolean
  TieneReceta: boolean
  TiempodeProduccion: number
  Fecha_UltimoCambio: Date
  Fecha_Sync?: Date
  UsuarioULID: number
  EmpresaULID: string
}
