// Esquemas de base de datos usando Drizzle ORM
import { pgTable, varchar, char, boolean, timestamp, decimal, integer, text, json, pgEnum } from "drizzle-orm/pg-core"

// Enums
export const tipoEmpresaEnum = pgEnum("tipo_empresa", ["Unica", "Matriz", "Sucursal"])
export const tipoPersonaEnum = pgEnum("tipo_persona", ["Fisica", "Moral"])
export const tipoProductoEnum = pgEnum("tipo_producto", ["Platillo", "Producto"])
export const estadoVentaEnum = pgEnum("estado_venta", ["Pedido", "En Proceso", "Aceptado"])
export const tipoVentaEnum = pgEnum("tipo_venta", ["Comedor", "Mostrador", "Domicilio", "Fichas", "Eventos"])

// Tabla Empresa
export const empresa = pgTable("empresa", {
  EmpresaULID: char("empresa_ulid", { length: 26 }).primaryKey(),
  NombreRestaurante: varchar("nombre_restaurante", { length: 100 }),
  Esquema: varchar("esquema", { length: 100 }),
  Licencia: varchar("licencia", { length: 3 }),
  TipoEmpresa: tipoEmpresaEnum("tipo_empresa"),
  FechaRegistro: timestamp("fecha_registro").defaultNow(),
  Fecha_UltimoCambio: timestamp("fecha_ultimo_cambio").defaultNow(),
  Fecha_Sync: timestamp("fecha_sync"),
  UsuarioULID: integer("usuario_ulid"),
})

// Tabla Usuarios
export const usuarios = pgTable("usuarios", {
  UsuarioULID: char("usuario_ulid", { length: 26 }).primaryKey(),
  NombreCompleto: varchar("nombre_completo", { length: 255 }),
  Usuario: varchar("usuario", { length: 100 }),
  Correo: varchar("correo", { length: 100 }),
  Contraseña: varchar("contraseña", { length: 8 }),
  PIN: varchar("pin", { length: 4 }),
  Celular: varchar("celular", { length: 10 }),
  Puesto: varchar("puesto", { length: 100 }),
  EsAdministrador: boolean("es_administrador"),
  Suspendido: boolean("suspendido"),
  FechaSuspension: timestamp("fecha_suspension"),
  Fecha_UltimoCambio: timestamp("fecha_ultimo_cambio").defaultNow(),
  Fecha_Sync: timestamp("fecha_sync").defaultNow(),
  Usuario2ULID: integer("usuario2_ulid"),
  EmpresaULID: char("empresa_ulid", { length: 26 }),
})

// Tabla Productos
export const productos = pgTable("productos", {
  ProductoULID: char("producto_ulid", { length: 26 }).primaryKey(),
  GrupoProductoULID: integer("grupo_producto_ulid"),
  SubgrupoProductoULID: integer("subgrupo_producto_ulid"),
  ClaveProducto: varchar("clave_producto", { length: 10 }),
  TipoProducto: tipoProductoEnum("tipo_producto"),
  Nombredelproducto: varchar("nombre_del_producto", { length: 20 }),
  Favorito: boolean("favorito"),
  Descripcion: text("descripcion"),
  ExentoImpuesto: boolean("exento_impuesto"),
  PrecioAbierto: boolean("precio_abierto"),
  UnidadesULID: integer("unidades_ulid"),
  AreaProduccionULID: integer("area_produccion_ulid"),
  AlmacenULID: integer("almacen_ulid"),
  ControlStock: boolean("control_stock"),
  PrecioxUtilidad: boolean("precio_x_utilidad"),
  Facturable: boolean("facturable"),
  ClaveTributaria: varchar("clave_tributaria", { length: 20 }),
  Suspendido: boolean("suspendido"),
  Comedor: boolean("comedor"),
  ADomicilio: boolean("a_domicilio"),
  Mostrador: boolean("mostrador"),
  Enlinea: boolean("en_linea"),
  EnAPP: boolean("en_app"),
  CanalesVenta: boolean("canales_venta"),
  EnMenuQR: boolean("en_menu_qr"),
  ClasificacionQRULID: integer("clasificacion_qr_ulid"),
  DatosDinamicos: json("datos_dinamicos"),
  Fecha_UltimoCambio: timestamp("fecha_ultimo_cambio").defaultNow(),
  Fecha_Sync: timestamp("fecha_sync").defaultNow(),
  UsuarioULID: integer("usuario_ulid"),
  EmpresaULID: char("empresa_ulid", { length: 26 }),
})

// Tabla Mesas
export const mesas = pgTable("mesas", {
  MesaULID: char("mesa_ulid", { length: 26 }).primaryKey(),
  ClaveMesa: varchar("clave_mesa", { length: 3 }),
  NombreMesa: varchar("nombre_mesa", { length: 20 }),
  TipoMesaULID: integer("tipo_mesa_ulid"),
  AreaVentasULID: integer("area_ventas_ulid"),
  ComensalesMaximos: integer("comensales_maximos"),
  Fecha_UltimoCambio: timestamp("fecha_ultimo_cambio").defaultNow(),
  Fecha_Sync: timestamp("fecha_sync").defaultNow(),
  UsuarioULID: integer("usuario_ulid"),
  EmpresaULID: char("empresa_ulid", { length: 26 }),
})

// Tabla Ventas
export const ventas = pgTable("ventas", {
  VentaULID: char("venta_ulid", { length: 26 }).primaryKey(),
  TurnoULID: integer("turno_ulid"),
  CanalULID: integer("canal_ulid"),
  EstadoVenta: estadoVentaEnum("estado_venta"),
  NumCuenta: varchar("num_cuenta", { length: 20 }),
  TipoVenta: tipoVentaEnum("tipo_venta"),
  TipoDescuentoULID: integer("tipo_descuento_ulid"),
  AreaULID: integer("area_ulid"),
  Personas: decimal("personas", { precision: 10 }),
  FechaApertura: timestamp("fecha_apertura"),
  Cancelada: boolean("cancelada"),
  UsuarioULID: integer("usuario_ulid"),
  FechaCancelacion: timestamp("fecha_cancelacion"),
  Impresa: boolean("impresa"),
  FechaImpresion: timestamp("fecha_impresion"),
  FechaCierre: timestamp("fecha_cierre"),
  MesaULID: integer("mesa_ulid"),
  MeseroULID: integer("mesero_ulid"),
  Subtotal: decimal("subtotal", { precision: 10, scale: 2 }),
  CostoReparto: decimal("costo_reparto", { precision: 10, scale: 2 }),
  Comisiones: decimal("comisiones", { precision: 10, scale: 2 }),
  ImpuestoULID: integer("impuesto_ulid"),
  Descuentos: decimal("descuentos", { precision: 10, scale: 2 }),
  TotalPropina: decimal("total_propina", { precision: 10, scale: 2 }),
  Total: decimal("total", { precision: 10, scale: 2 }),
  Saldo: decimal("saldo", { precision: 10, scale: 2 }),
  EstadoCuenta: varchar("estado_cuenta", { length: 50 }),
  Fecha_UltimoCambio: timestamp("fecha_ultimo_cambio").defaultNow(),
  Fecha_Sync: timestamp("fecha_sync").defaultNow(),
  EmpresaULID: char("empresa_ulid", { length: 26 }),
})

// Tabla Clientes
export const clientes = pgTable("clientes", {
  ClienteULID: char("cliente_ulid", { length: 26 }).primaryKey(),
  Celular: varchar("celular", { length: 25 }),
  Nombres: varchar("nombres", { length: 30 }),
  Apellidos: varchar("apellidos", { length: 30 }),
  NombreCorto: varchar("nombre_corto", { length: 20 }),
  NotasEspeciales: varchar("notas_especiales", { length: 100 }),
  FechaNacimiento: timestamp("fecha_nacimiento"),
  Correo: varchar("correo", { length: 25 }),
  Comentarios: varchar("comentarios", { length: 255 }),
  LimitedeCredito: decimal("limite_de_credito", { precision: 10, scale: 2 }),
  DiasdeCredito: decimal("dias_de_credito", { precision: 5 }),
  SaldodeCredito: decimal("saldo_de_credito", { precision: 10, scale: 2 }),
  Suspendido: boolean("suspendido"),
  Fecha_UltimoCambio: timestamp("fecha_ultimo_cambio").defaultNow(),
  Fecha_Sync: timestamp("fecha_sync").defaultNow(),
  UsuarioULID: integer("usuario_ulid"),
  EmpresaULID: char("empresa_ulid", { length: 26 }),
})
