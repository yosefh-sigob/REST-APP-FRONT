export interface Cliente {
  id: number
  nombre: string
  email: string
  telefono: string
  fechaRegistro: string
  ultimaVisita: string
  totalVisitas: number
  gastoTotal: number
  preferencias: string[]
  calificacion: number
}

export interface HistorialVisita {
  id: number
  clienteId: number
  fecha: string
  mesa: number
  productos: ProductoOrden[]
  total: number
  metodoPago: "efectivo" | "tarjeta" | "transferencia"
  mesero: string
  calificacion?: number
  comentarios?: string
  duracion: number // en minutos
}

export interface ProductoOrden {
  id: number
  nombre: string
  cantidad: number
  precio: number
  categoria: string
}

export interface ClienteDetalle extends Cliente {
  historial: HistorialVisita[]
  estadisticas: {
    visitasPorMes: { mes: string; visitas: number }[]
    gastoPorMes: { mes: string; gasto: number }[]
    productosPreferidos: { producto: string; veces: number }[]
    promedioGastoPorVisita: number
    tiempoPromedioVisita: number
  }
}
