export interface ISubgrupo {
  id: string
  clave: string
  nombre: string
  descripcion: string
  grupo_id: string
  activo: boolean
}

export interface ICreateSubgrupo {
  clave: string
  nombre: string
  descripcion: string
  grupo_id: string
  activo: boolean
}

export interface IUpdateSubgrupo {
  clave: string
  nombre: string
  descripcion: string
  grupo_id: string
  activo: boolean
}

// Alias para compatibilidad
export type Subgrupo = ISubgrupo
