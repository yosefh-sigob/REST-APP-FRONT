export interface Ingrediente {
  id: string
  nombre: string
  cantidad: number
  unidad: string
  costo: number
}

export interface Instruccion {
  paso: number
  descripcion: string
}

export interface Receta {
  id: string
  nombre: string
  descripcion: string
  categoria: string
  tiempoPreparacion: number // en minutos
  dificultad: "Fácil" | "Intermedio" | "Difícil"
  porciones: number
  costo: number // costo total en centavos
  precio: number // precio de venta en centavos
  imagen: string
  ingredientes: Ingrediente[]
  instrucciones: Instruccion[]
  notas?: string
  activa: boolean
  fechaCreacion: string
  fechaActualizacion: string
}

export interface RecetaFiltros {
  categoria?: string
  dificultad?: string
  tiempoMaximo?: number
  busqueda?: string
  activa?: boolean
}

export interface RecetaEstadisticas {
  totalRecetas: number
  recetasActivas: number
  categorias: { [key: string]: number }
  costoPromedio: number
  tiempoPromedio: number
}
