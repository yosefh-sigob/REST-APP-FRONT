export interface IEstadoMesa {
  id: string
  nombre: string
  descripcion?: string
  color: string
  activo: boolean
}

export interface ICreateEstadoMesa {
  nombre: string
  descripcion?: string
  color: string
  activo: boolean
}

export interface IUpdateEstadoMesa {
  nombre: string
  descripcion?: string
  color: string
  activo: boolean
}
