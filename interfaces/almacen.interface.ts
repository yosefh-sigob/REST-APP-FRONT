export interface IAlmacen {
  id: string
  clave: string
  nombre: string
  descripcion: string
  direccion: string
  activo: boolean
}

export interface ICreateAlmacen {
  clave: string
  nombre: string
  descripcion: string
  direccion: string
  activo: boolean
}

export interface IUpdateAlmacen {
  clave?: string
  nombre?: string
  descripcion?: string
  direccion?: string
  activo?: boolean
}

export interface IGetAlmacen {
  AlmacenULID: string
  ClaveAlmacen: string
  Nombre: string
  Descripcion: string
  Direccion?: string
  Activo: boolean
  Fecha_UltimoCambio: string
  Fecha_Sync: string
  UsuarioULID: string
  EmpresaULID: string
}
