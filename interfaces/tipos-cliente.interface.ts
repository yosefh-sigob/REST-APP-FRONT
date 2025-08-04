export interface ITipoCliente {
  id: string
  nombre: string
  descripcion?: string
  descuento_porcentaje: number
  activo: boolean
  fecha_creacion: string
  fecha_actualizacion: string
}

export interface ICreateTipoCliente {
  nombre: string
  descripcion?: string
  descuento_porcentaje: number
  activo: boolean
}

export interface IUpdateTipoCliente extends Partial<ICreateTipoCliente> {}
