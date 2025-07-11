
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