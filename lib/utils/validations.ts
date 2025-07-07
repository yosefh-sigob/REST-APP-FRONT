import { z } from "zod"

// Validaciones para Empresa
export const empresaSchema = z.object({
  NombreRestaurante: z.string().min(1, "El nombre del restaurante es requerido").max(100),
  Esquema: z.string().max(100).optional(),
  Licencia: z.string().max(3).optional(),
  TipoEmpresa: z.enum(["Unica", "Matriz", "Sucursal"]),
  UsuarioULID: z.number().int().positive(),
})

// Validaciones para Usuario
export const usuarioSchema = z.object({
  NombreCompleto: z.string().min(1, "El nombre completo es requerido").max(255),
  Usuario: z.string().min(3, "El usuario debe tener al menos 3 caracteres").max(100),
  Correo: z.string().email("Correo electrónico inválido").max(100),
  Contraseña: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").max(8),
  PIN: z.string().length(4, "El PIN debe tener exactamente 4 dígitos"),
  Celular: z.string().length(10, "El celular debe tener 10 dígitos"),
  Puesto: z.string().max(100).optional(),
  EsAdministrador: z.boolean().default(false),
  EmpresaULID: z.string().length(26, "ULID de empresa inválido"),
})

// Validaciones para Producto
export const productoSchema = z.object({
  GrupoProductoULID: z.number().int().positive(),
  SubgrupoProductoULID: z.number().int().positive(),
  ClaveProducto: z.string().max(10),
  TipoProducto: z.enum(["Platillo", "Producto"]),
  Nombredelproducto: z.string().min(1, "El nombre del producto es requerido").max(20),
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
  EmpresaULID: z.string().length(26, "ULID de empresa inválido"),
})

// Validaciones para Mesa
export const mesaSchema = z.object({
  ClaveMesa: z.string().max(3),
  NombreMesa: z.string().min(1, "El nombre de la mesa es requerido").max(20),
  TipoMesaULID: z.number().int().positive(),
  AreaVentasULID: z.number().int().positive(),
  ComensalesMaximos: z.number().int().positive(),
  UsuarioULID: z.number().int().positive(),
  EmpresaULID: z.string().length(26, "ULID de empresa inválido"),
})

// Validaciones para Cliente
export const clienteSchema = z.object({
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
  EmpresaULID: z.string().length(26, "ULID de empresa inválido"),
})

// Validaciones para Venta
export const ventaSchema = z.object({
  TurnoULID: z.number().int().positive(),
  CanalULID: z.number().int().positive(),
  EstadoVenta: z.enum(["Pedido", "En Proceso", "Aceptado"]),
  NumCuenta: z.string().max(20),
  TipoVenta: z.enum(["Comedor", "Mostrador", "Domicilio", "Fichas", "Eventos"]),
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
  EmpresaULID: z.string().length(26, "ULID de empresa inválido"),
})
