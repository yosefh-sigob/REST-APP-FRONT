import { z } from "zod"
import {
  TipoEmpresa,
  TipoPersona,
  TipoProducto,
  EstadoVenta,
  TipoVenta,
  EstadoReservacion,
  CanalReservacion,
  NivelLicencia,
} from "@/interfaces/database"

// Schema para ULID
export const ulidSchema = z.string().length(26, "ULID debe tener exactamente 26 caracteres")

// Schema para Empresa
export const empresaSchema = z.object({
  EmpresaULID: ulidSchema.optional(),
  NombreRestaurante: z.string().min(1, "El nombre del restaurante es requerido").max(100),
  Esquema: z.string().max(100).optional(),
  Licencia: z.nativeEnum(NivelLicencia).default(NivelLicencia.GRATIS),
  TipoEmpresa: z.nativeEnum(TipoEmpresa),
  TipoPersona: z.nativeEnum(TipoPersona),
  RFC: z.string().min(12, "RFC debe tener al menos 12 caracteres").max(13),
  RazonSocial: z.string().min(1, "La razón social es requerida").max(255),
  NombreComercial: z.string().max(255).optional(),
  Calle: z.string().min(1, "La calle es requerida").max(255),
  NumeroExterior: z.string().min(1, "El número exterior es requerido").max(10),
  NumeroInterior: z.string().max(10).optional(),
  Colonia: z.string().min(1, "La colonia es requerida").max(100),
  CodigoPostal: z.string().length(5, "El código postal debe tener 5 dígitos"),
  Ciudad: z.string().min(1, "La ciudad es requerida").max(100),
  Estado: z.string().min(1, "El estado es requerido").max(100),
  Pais: z.string().min(1, "El país es requerido").max(100),
  Telefono: z.string().min(10, "El teléfono debe tener al menos 10 dígitos").max(15),
  Email: z.string().email("Email inválido").max(100),
  SitioWeb: z.string().url("URL inválida").optional(),
  Logo: z.string().optional(),
  UsuarioULID: z.number().int().positive(),
})

// Schema para Usuario
export const usuarioSchema = z.object({
  UsuarioULID: ulidSchema.optional(),
  NombreCompleto: z.string().min(1, "El nombre completo es requerido").max(255),
  Usuario: z.string().min(3, "El usuario debe tener al menos 3 caracteres").max(100),
  Correo: z.string().email("Correo electrónico inválido").max(100),
  Contraseña: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").max(255),
  PIN: z.string().length(4, "El PIN debe tener exactamente 4 dígitos"),
  Celular: z.string().length(10, "El celular debe tener 10 dígitos"),
  Puesto: z.string().max(100).optional(),
  EsAdministrador: z.boolean().default(false),
  Suspendido: z.boolean().default(false),
  EmpresaULID: ulidSchema,
})

// Schema para Configuración
export const configuracionSchema = z.object({
  ConfiguracionULID: ulidSchema.optional(),
  EmpresaULID: ulidSchema,
  HabilitarPedidosQR: z.boolean().default(false),
  VentaComedor: z.boolean().default(true),
  VentaMostrador: z.boolean().default(true),
  VentaADomicilio: z.boolean().default(false),
  VentaAMenuDigital: z.boolean().default(false),
  ModuloReservas: z.boolean().default(false),
  MonedaULID: z.number().int().positive(),
  UsuarioULID: z.number().int().positive(),
})

// Schema para Producto
export const productoSchema = z.object({
  ProductoULID: ulidSchema.optional(),
  GrupoProductoULID: z.number().int().positive(),
  SubgrupoProductoULID: z.number().int().positive(),
  ClaveProducto: z.string().max(10),
  TipoProducto: z.nativeEnum(TipoProducto),
  Nombredelproducto: z.string().min(1, "El nombre del producto es requerido").max(255),
  Favorito: z.boolean().default(false),
  Descripcion: z.string().optional(),
  ExentoImpuesto: z.boolean().default(false),
  PrecioAbierto: z.boolean().default(false),
  UnidadesULID: z.number().int().positive(),
  AreaProduccionULID: z.number().int().positive(),
  AlmacenULID: z.number().int().positive(),
  ControlStock: z.boolean().default(false),
  PrecioxUtilidad: z.boolean().default(false),
  Facturable: z.boolean().default(true),
  ClaveTributaria: z.string().max(20).optional(),
  Suspendido: z.boolean().default(false),
  Comedor: z.boolean().default(true),
  ADomicilio: z.boolean().default(false),
  Mostrador: z.boolean().default(false),
  Enlinea: z.boolean().default(false),
  EnAPP: z.boolean().default(false),
  CanalesVenta: z.boolean().default(false),
  EnMenuQR: z.boolean().default(false),
  ClasificacionQRULID: z.number().int().positive().optional(),
  DatosDinamicos: z.any().optional(),
  UsuarioULID: z.number().int().positive(),
  EmpresaULID: ulidSchema,
})

// Schema para Mesa
export const mesaSchema = z.object({
  MesaULID: ulidSchema.optional(),
  ClaveMesa: z.string().max(3),
  NombreMesa: z.string().min(1, "El nombre de la mesa es requerido").max(20),
  TipoMesaULID: z.number().int().positive(),
  AreaVentasULID: z.number().int().positive(),
  ComensalesMaximos: z.number().int().positive(),
  UsuarioULID: z.number().int().positive(),
  EmpresaULID: ulidSchema,
})

// Schema para Cliente
export const clienteSchema = z.object({
  ClienteULID: ulidSchema.optional(),
  Celular: z.string().min(10, "El celular debe tener al menos 10 dígitos").max(25),
  Nombres: z.string().min(1, "Los nombres son requeridos").max(30),
  Apellidos: z.string().min(1, "Los apellidos son requeridos").max(30),
  NombreCorto: z.string().max(20).optional(),
  NotasEspeciales: z.string().max(100).optional(),
  FechaNacimiento: z.date().optional(),
  Correo: z.string().email("Correo electrónico inválido").max(25).optional(),
  Comentarios: z.string().max(255).optional(),
  LimitedeCredito: z.number().min(0).default(0),
  DiasdeCredito: z.number().int().min(0).default(0),
  SaldodeCredito: z.number().min(0).default(0),
  Suspendido: z.boolean().default(false),
  UsuarioULID: z.number().int().positive(),
  EmpresaULID: ulidSchema,
})

// Schema para Venta
export const ventaSchema = z.object({
  VentaULID: ulidSchema.optional(),
  TurnoULID: z.number().int().positive(),
  CanalULID: z.number().int().positive(),
  EstadoVenta: z.nativeEnum(EstadoVenta),
  NumCuenta: z.string().max(20),
  TipoVenta: z.nativeEnum(TipoVenta),
  TipoDescuentoULID: z.number().int().positive().optional(),
  AreaULID: z.number().int().positive(),
  Personas: z.number().min(1),
  FechaApertura: z.date(),
  Cancelada: z.boolean().default(false),
  UsuarioULID: z.number().int().positive(),
  MesaULID: z.number().int().positive().optional(),
  MeseroULID: z.number().int().positive().optional(),
  Subtotal: z.number().min(0).default(0),
  CostoReparto: z.number().min(0).default(0),
  Comisiones: z.number().min(0).default(0),
  ImpuestoULID: z.number().int().positive().optional(),
  Descuentos: z.number().min(0).default(0),
  TotalPropina: z.number().min(0).default(0),
  Total: z.number().min(0).default(0),
  Saldo: z.number().min(0).default(0),
  EstadoCuenta: z.string().max(50).optional(),
  EmpresaULID: ulidSchema,
})

// Schema para Reservación
export const reservacionSchema = z.object({
  ReservacionULID: ulidSchema.optional(),
  CanalReservacion: z.nativeEnum(CanalReservacion),
  ComisionistaULID: z.number().int().positive().optional(),
  TipoReservacionULID: z.number().int().positive(),
  ListadeEspera: z.boolean().default(false),
  Niños: z.boolean().default(false),
  CantidadNiños: z.number().int().min(0).optional(),
  Mascotas: z.boolean().default(false),
  SilladeRuedas: z.boolean().default(false),
  SillaBebe: z.boolean().default(false),
  ClienteULID: z.number().int().positive(),
  ClienteNombre: z.string().min(1, "El nombre del cliente es requerido").max(255),
  PaisCelular: z.string().max(5).default("+52"),
  ClienteCelular: z.string().min(10, "El celular debe tener al menos 10 dígitos").max(15),
  ClienteCorreo: z.string().email("Email inválido").max(100).optional(),
  NumeroPersonas: z.number().int().min(1, "Debe ser al menos 1 persona"),
  Notas: z.string().max(500).optional(),
  MesaULID: z.number().int().positive(),
  FechaReservacion: z.date(),
  HoraReservacion: z.string(),
  TiempodeEspera: z.number().min(0).default(0),
  EstadoReservacion: z.nativeEnum(EstadoReservacion).default(EstadoReservacion.PENDIENTE),
  UsuarioULID: z.number().int().positive(),
  EmpresaULID: ulidSchema,
})

// Schema para Encuesta
export const encuestaSchema = z.object({
  EncuestaULID: ulidSchema.optional(),
  Titulo: z.string().min(1, "El título es requerido").max(255),
  Descripcion: z.string().max(500).optional(),
  FechaInicio: z.date(),
  FechaFin: z.date(),
  Activa: z.boolean().default(false),
  TipoEncuesta: z.string().max(50),
  Preguntas: z.any(),
  UsuarioULID: z.number().int().positive(),
  EmpresaULID: ulidSchema,
})

// Schema para Campaña SMS
export const campanaSMSSchema = z.object({
  CampanaULID: ulidSchema.optional(),
  Nombre: z.string().min(1, "El nombre es requerido").max(255),
  Mensaje: z.string().min(1, "El mensaje es requerido").max(160),
  FechaEnvio: z.date(),
  Estado: z.string().max(50),
  Destinatarios: z.number().int().min(0).default(0),
  Enviados: z.number().int().min(0).default(0),
  Entregados: z.number().int().min(0).default(0),
  Respuestas: z.number().int().min(0).default(0),
  UsuarioULID: z.number().int().positive(),
  EmpresaULID: ulidSchema,
})
