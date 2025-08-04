export interface IUnidad {
  id: string
  clave: string
  nombre: string
  abreviacion: string
  activo: boolean
}

export interface ICreateUnidad {
  clave: string
  nombre: string
  abreviacion: string
  activo: boolean
}

export interface IUpdateUnidad {
  clave: string
  nombre: string
  abreviacion: string
  activo: boolean
}

export interface IGetUnidad {
  UnidadULID: string
  ClaveUnidad: string
  Descripcion: string
  Abreviacion: string
  Fecha_UltimoCambio: string
  Fecha_Sync: string
  UsuarioULID: string
  EmpresaULID: string
}
