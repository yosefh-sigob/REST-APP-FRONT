"use server"

import type { Receta, RecetaFiltros, EstadisticasRecetas } from "@/interfaces/recetas.interface"
import recetasData from "@/data/recetas.json"

// Simular delay de API
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function obtenerRecetas(filtros?: RecetaFiltros): Promise<Receta[]> {
  await delay(500)

  let recetas = recetasData as Receta[]

  if (filtros) {
    if (filtros.categoria) {
      recetas = recetas.filter((receta) => receta.categoria.toLowerCase().includes(filtros.categoria!.toLowerCase()))
    }

    if (filtros.dificultad) {
      recetas = recetas.filter((receta) => receta.dificultad === filtros.dificultad)
    }

    if (filtros.estado) {
      recetas = recetas.filter((receta) => receta.estado === filtros.estado)
    }

    if (filtros.busqueda) {
      const busqueda = filtros.busqueda.toLowerCase()
      recetas = recetas.filter(
        (receta) =>
          receta.nombre.toLowerCase().includes(busqueda) ||
          receta.descripcion.toLowerCase().includes(busqueda) ||
          receta.categoria.toLowerCase().includes(busqueda),
      )
    }
  }

  return recetas
}

export async function obtenerRecetaPorId(id: string): Promise<Receta | null> {
  await delay(300)

  const receta = recetasData.find((r) => r.id === id)
  return receta || null
}

export async function obtenerEstadisticasRecetas(): Promise<EstadisticasRecetas> {
  await delay(200)

  const recetas = recetasData as Receta[]

  const estadisticas: EstadisticasRecetas = {
    total: recetas.length,
    activas: recetas.filter((r) => r.estado === "Activa").length,
    inactivas: recetas.filter((r) => r.estado === "Inactiva").length,
    porCategoria: {},
    costoPromedio: 0,
    tiempoPromedioPreparacion: 0,
  }

  // Estadísticas por categoría
  recetas.forEach((receta) => {
    estadisticas.porCategoria[receta.categoria] = (estadisticas.porCategoria[receta.categoria] || 0) + 1
  })

  // Promedios
  if (recetas.length > 0) {
    estadisticas.costoPromedio = recetas.reduce((sum, r) => sum + r.costo, 0) / recetas.length
    estadisticas.tiempoPromedioPreparacion = recetas.reduce((sum, r) => sum + r.tiempoPreparacion, 0) / recetas.length
  }

  return estadisticas
}

export async function actualizarEstadoReceta(id: string, estado: "Activa" | "Inactiva"): Promise<boolean> {
  await delay(400)

  // Simular actualización exitosa
  console.log(`Actualizando receta ${id} a estado ${estado}`)
  return true
}

export async function obtenerCategoriasRecetas(): Promise<string[]> {
  await delay(200)

  const recetas = recetasData as Receta[]
  const categorias = [...new Set(recetas.map((r) => r.categoria))]
  return categorias.sort()
}
