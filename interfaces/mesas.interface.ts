export interface Mesa {
  id: string
  numero: number
  capacidad: number
  estado: "libre" | "ocupada" | "reservada" | "limpieza"
  clientes?: number
  tiempo?: string
  mesero?: string
  ubicacion?: string
  observaciones?: string
  fechaOcupacion?: string
  horaReserva?: string
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
