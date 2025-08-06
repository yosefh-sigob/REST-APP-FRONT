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
  clave?: string
  nombre?: string
  descripcion?: string
  grupo_id?: string
  activo?: boolean
}

// Mantener interfaces existentes para compatibilidad con otros módulos
export interface ISubgrupoOriginal {
  SubgrupoProductoULID: string
  ClaveGrupo: string
  ClaveSubGrupo: string
  Descripcion: string
  AplicarComentarios: boolean
  Suspendido: boolean
  Fecha_UltimoCambio: string
  Fecha_Sync: string
  UsuarioULID: string
  EmpresaULID: string
}

// Alias para compatibilidad
export type Subgrupo = ISubgrupo
