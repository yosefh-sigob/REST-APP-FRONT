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
  categoria: string
  descripcion: string
  tiempoPreparacion: number
  porciones: number
  dificultad: "Fácil" | "Intermedio" | "Difícil"
  costo: number
  precio: number
  estado: "Activa" | "Inactiva"
  imagen: string
  ingredientes: Ingrediente[]
  instrucciones: Instruccion[]
  notas?: string
  fechaCreacion: string
  fechaActualizacion: string
  creadoPor: string
}

export interface RecetaFiltros {
  categoria?: string
  dificultad?: string
  estado?: string
  busqueda?: string
}

export interface EstadisticasRecetas {
  total: number
  activas: number
  inactivas: number
  porCategoria: { [key: string]: number }
  costoPromedio: number
  tiempoPromedioPreparacion: number
}
