export interface IMetodoPago {
  id: string
  nombre: string
  descripcion: string
  requiere_referencia: boolean
  activo: boolean
  fecha_creacion: string
  fecha_actualizacion: string
}

export interface ICreateMetodoPago {
  nombre: string
  descripcion: string
  requiere_referencia: boolean
  activo: boolean
}

export interface IUpdateMetodoPago extends Partial<ICreateMetodoPago> {}
