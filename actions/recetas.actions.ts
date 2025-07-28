"use server"

import type { Receta, RecetaFiltros, RecetaEstadisticas } from "@/interfaces/recetas.interface"
import recetasData from "@/data/recetas.json"

// Simular delay de red
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function obtenerRecetas(filtros?: RecetaFiltros): Promise<Receta[]> {
  await delay(500)

  let recetas = recetasData as Receta[]

  if (filtros) {
    if (filtros.categoria) {
      recetas = recetas.filter((receta) => receta.categoria === filtros.categoria)
    }

    if (filtros.dificultad) {
      recetas = recetas.filter((receta) => receta.dificultad === filtros.dificultad)
    }

    if (filtros.tiempoMaximo) {
      recetas = recetas.filter((receta) => receta.tiempoPreparacion <= filtros.tiempoMaximo)
    }

    if (filtros.busqueda) {
      const busqueda = filtros.busqueda.toLowerCase()
      recetas = recetas.filter(
        (receta) =>
          receta.nombre.toLowerCase().includes(busqueda) ||
          receta.descripcion.toLowerCase().includes(busqueda) ||
          receta.ingredientes.some((ing) => ing.nombre.toLowerCase().includes(busqueda)),
      )
    }

    if (filtros.activa !== undefined) {
      recetas = recetas.filter((receta) => receta.activa === filtros.activa)
    }
  }

  return recetas
}

export async function obtenerRecetaPorId(id: string): Promise<Receta | null> {
  await delay(300)

  const receta = recetasData.find((r) => r.id === id)
  return receta || null
}

export async function obtenerEstadisticasRecetas(): Promise<RecetaEstadisticas> {
  await delay(200)

  const recetas = recetasData as Receta[]
  const recetasActivas = recetas.filter((r) => r.activa)

  const categorias: { [key: string]: number } = {}
  recetas.forEach((receta) => {
    categorias[receta.categoria] = (categorias[receta.categoria] || 0) + 1
  })

  const costoPromedio = recetas.reduce((sum, r) => sum + r.costo, 0) / recetas.length
  const tiempoPromedio = recetas.reduce((sum, r) => sum + r.tiempoPreparacion, 0) / recetas.length

  return {
    totalRecetas: recetas.length,
    recetasActivas: recetasActivas.length,
    categorias,
    costoPromedio: Math.round(costoPromedio),
    tiempoPromedio: Math.round(tiempoPromedio),
  }
}

export async function obtenerCategorias(): Promise<string[]> {
  await delay(100)

  const recetas = recetasData as Receta[]
  const categorias = [...new Set(recetas.map((r) => r.categoria))]
  return categorias.sort()
}

export async function toggleRecetaActiva(id: string): Promise<boolean> {
  await delay(300)

  // Simular actualización en base de datos
  const receta = recetasData.find((r) => r.id === id)
  if (receta) {
    receta.activa = !receta.activa
    receta.fechaActualizacion = new Date().toISOString()
    return true
  }

  return false
}

export async function buscarRecetasPorIngrediente(ingrediente: string): Promise<Receta[]> {
  await delay(400)

  const recetas = recetasData as Receta[]
  const ingredienteLower = ingrediente.toLowerCase()

  return recetas.filter((receta) =>
    receta.ingredientes.some((ing) => ing.nombre.toLowerCase().includes(ingredienteLower)),
  )
}

export async function obtenerRecetasPorCategoria(categoria: string): Promise<Receta[]> {
  await delay(300)

  const recetas = recetasData as Receta[]
  return recetas.filter((receta) => receta.categoria === categoria && receta.activa)
}

export async function calcularCostoReceta(id: string): Promise<{ costoTotal: number; costoPorPorcion: number } | null> {
  await delay(200)

  const receta = recetasData.find((r) => r.id === id)
  if (!receta) return null

  const costoTotal = receta.ingredientes.reduce((sum, ing) => sum + ing.costo, 0)
  const costoPorPorcion = costoTotal / receta.porciones

  return {
    costoTotal,
    costoPorPorcion: Math.round(costoPorPorcion),
  }
}
