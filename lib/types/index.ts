// Interfaces principales del sistema
export interface Usuario {
  id: string
  nombre: string
  email: string
  rol: "Admin" | "Gerente" | "Mesero" | "Cajero" | "Cocinero"
  activo: boolean
  fechaCreacion: string
  ultimoAcceso?: string
}

export interface Empresa {
  id: string
  nombre: string
  rfc: string
  direccion: string
  telefono: string
  email: string
  logo?: string
  licencia: "Gratis" | "Lite" | "Pro" | "Franquicia"
  fechaCreacion: string
  activa: boolean
}

export interface Cliente {
  id: string
  nombre: string
  apellidos: string
  telefono: string
  email: string
  fechaNacimiento: string
  direccion: Direccion
  preferencias: Preferencias
  historialVisitas: HistorialVisita[]
  puntos: number
  nivelFidelidad: "Bronce" | "Plata" | "Oro" | "Platino"
  fechaRegistro: string
  activo: boolean
  notas: string
}

export interface Direccion {
  calle: string
  colonia: string
  ciudad: string
  codigoPostal: string
  estado: string
}

export interface Preferencias {
  tipoComida: string[]
  alergias: string[]
  ocasionesEspeciales: string[]
}

export interface HistorialVisita {
  fecha: string
  mesa: string
  consumo: number
  platillos: string[]
}

export interface Producto {
  id: string
  clave: string
  nombre: string
  descripcion: string
  precio: number
  categoria: string
  subcategoria?: string
  disponible: boolean
  favorito: boolean
  suspendido: boolean
  imagen?: string
  tipoProducto: "Platillo" | "Producto" | "Botilla"
  unidad: string
  stock?: number
  stockMinimo?: number
  ingredientes?: string[]
  tiempoPreparacion?: number
  calorias?: number
  tags?: string[]
}

export interface Mesa {
  id: string
  numero: string
  capacidad: number
  area: string
  estado: "Disponible" | "Ocupada" | "Reservada" | "Limpieza"
  ubicacion: string
  tipo: "Regular" | "VIP" | "Terraza" | "Barra"
}

export interface ProductoVenta {
  id: string
  producto: Producto
  cantidad: number
  precio: number
  total: number
  modificaciones?: string[]
  notas?: string
}

export interface Venta {
  id: string
  fecha: string
  mesa?: string
  cliente?: string
  productos: ProductoVenta[]
  subtotal: number
  impuestos: number
  total: number
  estado: "Pendiente" | "Pagada" | "Cancelada"
  metodoPago?: string
  notas?: string
}

export interface Reservacion {
  id: string
  cliente: string
  fecha: string
  hora: string
  personas: number
  mesa?: string
  estado: "Confirmada" | "Pendiente" | "Cancelada" | "Completada"
  notas?: string
  telefono: string
  ocasionEspecial?: string
}

// Tipos para autenticación
export interface AuthUser {
  id: string
  email: string
  nombre: string
  rol: Usuario["rol"]
  empresa: string
  licencia: Empresa["licencia"]
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  nombre: string
  email: string
  password: string
  confirmPassword: string
  empresa: string
  telefono: string
}

// Tipos para formularios
export interface FormErrors {
  [key: string]: string | undefined
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Tipos para estadísticas
export interface EstadisticasVentas {
  ventasHoy: number
  ventasSemana: number
  ventasMes: number
  clientesAtendidos: number
  mesasOcupadas: number
  productoMasVendido: string
}

export interface EstadisticasProductos {
  totalProductos: number
  productosActivos: number
  productosSuspendidos: number
  productosFavoritos: number
  categorias: string[]
  stockBajo: number
}

// Tipos para configuración
export interface ConfiguracionRestaurante {
  id: string
  nombre: string
  direccion: string
  telefono: string
  email: string
  horarios: {
    [dia: string]: {
      abierto: boolean
      apertura: string
      cierre: string
    }
  }
  configuracionPOS: {
    impuestos: number
    propina: number
    metodosPago: string[]
  }
  notificaciones: {
    email: boolean
    sms: boolean
    push: boolean
  }
}
