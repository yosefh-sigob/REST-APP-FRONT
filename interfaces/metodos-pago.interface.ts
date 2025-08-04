export interface IMetodoPago {
  id: string
  nombre: string
  descripcion: string
  requiere_referencia: boolean
  activo: boolean
}

export interface ICreateMetodoPago {
  nombre: string
  descripcion?: string
  requiere_referencia: boolean
  activo: boolean
}

export interface IUpdateMetodoPago {
  nombre: string
  descripcion?: string
  requiere_referencia: boolean
  activo: boolean
}
