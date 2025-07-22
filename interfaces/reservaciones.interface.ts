export interface Reservacion {
  id: string
  clienteNombre: string
  clienteEmail: string
  clienteTelefono: string
  fechaReservacion: string
  horaReservacion: string
  numeroPersonas: number
  mesaAsignada?: number
  estado: "pendiente" | "confirmada" | "cancelada" | "completada"
  observaciones?: string
  fechaCreacion: string
  tipoEvento?: "cumpleanos" | "aniversario" | "negocio" | "familiar" | "otro"
  solicitudesEspeciales?: string
}

export interface ReservacionesViewProps {
  reservaciones: Reservacion[]
}
