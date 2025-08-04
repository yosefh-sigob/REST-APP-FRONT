export interface IGrupo {
  id: string
  clave: string
  nombre: string
  descripcion?: string
  activo: boolean
}

export interface ICreateGrupo {
  clave: string
  nombre: string
  descripcion?: string
  activo: boolean
}

export interface IUpdateGrupo {
  clave: string
  nombre: string
  descripcion?: string
  activo: boolean
}

// Mantener la interfaz existente para compatibilidad
export interface IGetGrupoProducto {
  GrupoProductoULID: string
  ClaveGrupo: string
  Descripcion: string
  Orden: number
  Clasificacion: string
  MenuQR: boolean
  CatalogoOnline: boolean
  APPComensal: boolean
  Inactiva: boolean
  Paletacolor: string
  Imagen?: string
  Sucursales: boolean
  AplicarComentarios: boolean
  CamposDinamicos?: Record<string, any>
  Fecha_UltimoCambio: string
  Fecha_Sync: string
  UsuarioULID: string
  EmpresaULID: string
}

// Alias para compatibilidad
export type Grupo = IGrupo
