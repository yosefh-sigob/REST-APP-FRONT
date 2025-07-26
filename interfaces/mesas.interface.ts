export type EstadoMesa = "libre" | "ocupada" | "reservada" | "limpieza"

export interface Mesa {
  id: string
  numero: number
  capacidad: number
  estado: EstadoMesa
  ubicacion?: string
  clientes?: number
  mesero?: string
  fechaOcupacion?: string
  horaReserva?: string
  tiempo?: string
  observaciones?: string
  activa: boolean
  fechaCreacion: string
  fechaActualizacion: string
}

export interface EstadisticasMesas {
  totalMesas: number
  mesasOcupadas: number
  mesasLibres: number
  mesasReservadas: number
  mesasLimpieza: number
  capacidadTotal: number
  ocupacionPorcentaje: number
}

export interface ActualizarMesaData {
  estado?: EstadoMesa
  clientes?: number
  mesero?: string
  observaciones?: string
}
