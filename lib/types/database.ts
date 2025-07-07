// Tipos base para el sistema
export type ULID = string

// Enums principales
export enum TipoEmpresa {
  UNICA = "Unica",
  MATRIZ = "Matriz",
  SUCURSAL = "Sucursal",
}

export enum TipoPersona {
  FISICA = "Fisica",
  MORAL = "Moral",
}

export enum TipoProducto {
  PLATILLO = "Platillo",
  PRODUCTO = "Producto",
}

export enum EstadoVenta {
  PEDIDO = "Pedido",
  EN_PROCESO = "En Proceso",
  ACEPTADO = "Aceptado",
}

export enum TipoVenta {
  COMEDOR = "Comedor",
  MOSTRADOR = "Mostrador",
  DOMICILIO = "Domicilio",
  FICHAS = "Fichas",
  EVENTOS = "Eventos",
}

export enum EstadoComanda {
  PEDIDO = "Pedido",
  EN_PROCESO = "En Proceso",
  ACEPTADO = "Aceptado",
  PAUSADO = "Pausado",
  TERMINADO = "Terminado",
}

export enum EstadoReservacion {
  PENDIENTE = "Pendiente",
  CONFIRMADA = "Confirmada",
  SENTADO = "Sentado",
  CANCELADA = "Cancelada",
}

// Interfaces principales
export interface Empresa {
  EmpresaULID: ULID
  NombreRestaurante: string
  Esquema: string
  Licencia: string
  TipoEmpresa: TipoEmpresa
  FechaRegistro: Date
  Fecha_UltimoCambio: Date
  Fecha_Sync?: Date
  UsuarioULID: number
}

export interface Usuario {
  UsuarioULID: ULID
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
  Fecha_Sync: Date
  Usuario2ULID?: number
  EmpresaULID: ULID
}

export interface Producto {
  ProductoULID: ULID
  GrupoProductoULID: number
  SubgrupoProductoULID: number
  ClaveProducto: string
  TipoProducto: TipoProducto
  Nombredelproducto: string
  Favorito: boolean
  Descripcion: string
  ExentoImpuesto: boolean
  PrecioAbierto: boolean
  UnidadesULID: number
  AreaProduccionULID: number
  AlmacenULID: number
  ControlStock: boolean
  PrecioxUtilidad: boolean
  Facturable: boolean
  ClaveTributaria: string
  Suspendido: boolean
  Comedor: boolean
  ADomicilio: boolean
  Mostrador: boolean
  Enlinea: boolean
  EnAPP: boolean
  CanalesVenta: boolean
  EnMenuQR: boolean
  ClasificacionQRULID: number
  DatosDinamicos?: any
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  UsuarioULID: number
  EmpresaULID: ULID
}

export interface Mesa {
  MesaULID: ULID
  ClaveMesa: string
  NombreMesa: string
  TipoMesaULID: number
  AreaVentasULID: number
  ComensalesMaximos: number
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  UsuarioULID: number
  EmpresaULID: ULID
}

export interface Venta {
  VentaULID: ULID
  TurnoULID: number
  CanalULID: number
  EstadoVenta: EstadoVenta
  NumCuenta: string
  TipoVenta: TipoVenta
  TipoDescuentoULID: number
  AreaULID: number
  Personas: number
  FechaApertura: Date
  Cancelada: boolean
  UsuarioULID: number
  FechaCancelacion?: Date
  Impresa: boolean
  FechaImpresion?: Date
  FechaCierre?: Date
  MesaULID: number
  MeseroULID: number
  Subtotal: number
  CostoReparto: number
  Comisiones: number
  ImpuestoULID: number
  Descuentos: number
  TotalPropina: number
  Total: number
  Saldo: number
  EstadoCuenta: string
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  EmpresaULID: ULID
}

export interface Cliente {
  ClienteULID: ULID
  Celular: string
  Nombres: string
  Apellidos: string
  NombreCorto: string
  NotasEspeciales: string
  FechaNacimiento: Date
  Correo: string
  Comentarios: string
  LimitedeCredito: number
  DiasdeCredito: number
  SaldodeCredito: number
  Suspendido: boolean
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  UsuarioULID: number
  EmpresaULID: ULID
}

export interface Reservacion {
  ReservacionULID: ULID
  CanalReservacion: "En Sitio" | "Telefono" | "Online"
  ComisionistaULID: number
  TipoReservacionULID: number
  ListadeEspera: boolean
  Niños: boolean
  CantidadNiños: number
  Mascotas: boolean
  SilladeRuedas: boolean
  SillaBebe: boolean
  ClienteULID: number
  ClienteNombre: string
  PaisCelular: string
  ClienteCelular: string
  ClienteCorreo: string
  NumeroPersonas: number
  Notas: string
  MesaULID: number
  FechaReservacion: Date
  HoraReservacion: string
  TiempodeEspera: number
  EstadoReservacion: EstadoReservacion
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  UsuarioULID: number
  EmpresaULID: ULID
}
