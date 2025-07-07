"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, GripVertical, Star, MessageSquare, CheckSquare, ToggleLeft } from "lucide-react"
import type { PreguntaEncuesta } from "@/lib/types"

type TipoPregunta = "calificacion" | "multiple" | "texto" | "si_no"

export default function CrearEncuestaPage() {
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [preguntas, setPreguntas] = useState<PreguntaEncuesta[]>([])
  const [preguntaEditando, setPreguntaEditando] = useState<PreguntaEncuesta | null>(null)

  const agregarPregunta = () => {
    const nuevaPregunta: PreguntaEncuesta = {
      id: Date.now().toString(),
      pregunta: "",
      tipo: "calificacion",
      requerida: true,
      orden: preguntas.length + 1,
    }
    setPreguntas([...preguntas, nuevaPregunta])
    setPreguntaEditando(nuevaPregunta)
  }

  const actualizarPregunta = (id: string, cambios: Partial<PreguntaEncuesta>) => {
    setPreguntas(preguntas.map((p) => (p.id === id ? { ...p, ...cambios } : p)))
  }

  const eliminarPregunta = (id: string) => {
    setPreguntas(preguntas.filter((p) => p.id !== id))
    if (preguntaEditando?.id === id) {
      setPreguntaEditando(null)
    }
  }

  const getTipoIcon = (tipo: TipoPregunta) => {
    switch (tipo) {
      case "calificacion":
        return <Star className="h-4 w-4" />
      case "multiple":
        return <CheckSquare className="h-4 w-4" />
      case "texto":
        return <MessageSquare className="h-4 w-4" />
      case "si_no":
        return <ToggleLeft className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const guardarEncuesta = () => {
    const encuesta = {
      titulo,
      descripcion,
      preguntas,
      activa: true,
      fechaCreacion: new Date(),
    }
    console.log("Guardando encuesta:", encuesta)
    // Aquí se guardaría la encuesta
    alert("Encuesta creada exitosamente")
  }

  return (
    <MainLayout title="Crear Encuesta">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Nueva Encuesta</h2>
            <p className="text-muted-foreground">Crea una encuesta para medir la satisfacción de tus clientes</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Vista Previa</Button>
            <Button onClick={guardarEncuesta} disabled={!titulo || preguntas.length === 0}>
              Guardar Encuesta
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Panel de configuración */}
          <div className="lg:col-span-1 space-y-6">
            {/* Información básica */}
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
                <CardDescription>Configura los datos principales de la encuesta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="titulo">Título de la Encuesta</Label>
                  <Input
                    id="titulo"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Ej: Encuesta de Satisfacción"
                  />
                </div>
                <div>
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea
                    id="descripcion"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Describe el propósito de la encuesta..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Editor de pregunta */}
            {preguntaEditando && (
              <Card>
                <CardHeader>
                  <CardTitle>Editar Pregunta</CardTitle>
                  <CardDescription>Configura los detalles de la pregunta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Pregunta</Label>
                    <Textarea
                      value={preguntaEditando.pregunta}
                      onChange={(e) => actualizarPregunta(preguntaEditando.id, { pregunta: e.target.value })}
                      placeholder="Escribe tu pregunta aquí..."
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label>Tipo de Pregunta</Label>
                    <Select
                      value={preguntaEditando.tipo}
                      onValueChange={(value: TipoPregunta) => actualizarPregunta(preguntaEditando.id, { tipo: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="calificacion">Calificación (1-5)</SelectItem>
                        <SelectItem value="multiple">Opción Múltiple</SelectItem>
                        <SelectItem value="texto">Texto Libre</SelectItem>
                        <SelectItem value="si_no">Sí/No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {preguntaEditando.tipo === "multiple" && (
                    <div>
                      <Label>Opciones</Label>
                      <Textarea
                        value={preguntaEditando.opciones?.join("\n") || ""}
                        onChange={(e) =>
                          actualizarPregunta(preguntaEditando.id, {
                            opciones: e.target.value.split("\n").filter((o) => o.trim()),
                          })
                        }
                        placeholder="Opción 1&#10;Opción 2&#10;Opción 3"
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground mt-1">Escribe cada opción en una línea separada</p>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={preguntaEditando.requerida}
                      onCheckedChange={(checked) => actualizarPregunta(preguntaEditando.id, { requerida: checked })}
                    />
                    <Label>Pregunta requerida</Label>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setPreguntaEditando(null)}
                    >
                      Cerrar
                    </Button>
                    <Button variant="destructive" onClick={() => eliminarPregunta(preguntaEditando.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Constructor de encuesta */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Constructor de Encuesta</CardTitle>
                    <CardDescription>Arrastra y organiza las preguntas de tu encuesta</CardDescription>
                  </div>
                  <Button onClick={agregarPregunta}>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Pregunta
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {preguntas.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No hay preguntas</h3>
                    <p className="text-muted-foreground mb-4">Comienza agregando tu primera pregunta a la encuesta</p>
                    <Button onClick={agregarPregunta}>
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar Primera Pregunta
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {preguntas.map((pregunta, index) => (
                      <Card
                        key={pregunta.id}
                        className={`cursor-pointer transition-all ${
                          preguntaEditando?.id === pregunta.id ? "ring-2 ring-primary" : "hover:shadow-md"
                        }`}
                        onClick={() => setPreguntaEditando(pregunta)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <GripVertical className="h-4 w-4" />
                              <span className="text-sm font-medium">{index + 1}</span>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                {getTipoIcon(pregunta.tipo)}
                                <Badge variant="outline" className="text-xs">
                                  {pregunta.tipo === "calificacion" && "Calificación"}
                                  {pregunta.tipo === "multiple" && "Opción Múltiple"}
                                  {pregunta.tipo === "texto" && "Texto Libre"}
                                  {pregunta.tipo === "si_no" && "Sí/No"}
                                </Badge>
                                {pregunta.requerida && (
                                  <Badge variant="secondary" className="text-xs">
                                    Requerida
                                  </Badge>
                                )}
                              </div>

                              <p className="text-sm font-medium mb-1">{pregunta.pregunta || "Pregunta sin título"}</p>

                              {pregunta.tipo === "multiple" && pregunta.opciones && (
                                <div className="text-xs text-muted-foreground">
                                  Opciones: {pregunta.opciones.join(", ")}
                                </div>
                              )}
                            </div>

                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation()
                                eliminarPregunta(pregunta.id)
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
