export interface ISubgrupo {
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


export interface ICreateSubgrupo {
  ClaveGrupo: string
  ClaveSubGrupo: string
  Descripcion: string
  AplicarComentarios: boolean
  Suspendido: boolean
}


export interface IUpdateSubgrupo {
  ClaveGrupo?: string
  ClaveSubGrupo?: string
  Descripcion?: string
  AplicarComentarios?: boolean
  Suspendido?: boolean
}

// Alias para compatibilidad
export type Subgrupo = ISubgrupo
