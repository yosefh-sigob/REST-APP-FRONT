export interface IAreaProduccion {
  id: string
  clave: string
  descripcion: string
  impresora?: string
  activa: boolean
}

export interface ICreateAreaProduccion {
  clave: string
  descripcion: string
  impresora?: string
  activa: boolean
}

export interface IUpdateAreaProduccion {
  clave: string
  descripcion: string
  impresora?: string
  activa: boolean
}

export interface IGetAreaProduccion {
  AreaProduccionULID: string
  ClaveArea: string
  Descripcion: string
  Impresora?: string
  Activa: boolean
  Fecha_UltimoCambio: string
  Fecha_Sync: string
  UsuarioULID: string
  EmpresaULID: string
}
