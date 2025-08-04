export interface IEstadoMesa {
  id: string
  clave: string
  nombre: string
  descripcion: string
  color: string
  activo: boolean
}

export interface ICreateEstadoMesa {
  clave: string
  nombre: string
  descripcion: string
  color: string
  activo: boolean
}

export interface IUpdateEstadoMesa {
  clave?: string
  nombre?: string
  descripcion?: string
  color?: string
  activo?: boolean
}

export interface IGetEstadoMesa {
  EstadoMesaULID: string
  ClaveEstado: string
  Nombre: string
  Descripcion: string
  Color: string
  EsActivo: boolean
  FechaCreacion: string
  FechaActualizacion: string
}
