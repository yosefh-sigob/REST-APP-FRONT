"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ProductoFormSchema, type ProductoFormData, TIPOS_PRODUCTO, CANALES_VENTA } from "@/schemas/productos.schemas"
import { crearProductoAction, actualizarProductoAction, validarClaveProductoAction } from "@/actions/productos.actions"
import type { Producto } from "@/lib/services/productos.service"
import { toast } from "sonner"
import { Loader2, Save, X, AlertCircle, Check } from "lucide-react"

interface ProductoFormProps {
  producto?: Producto | null
  datosRelacionados: {
    grupos: any[]
    subgrupos: any[]
    unidades: any[]
    areasProduccion: any[]
  }
  onSuccess: () => void
  onCancel: () => void
}

export function ProductoForm({ producto, datosRelacionados, onSuccess, onCancel }: ProductoFormProps) {
  const [loading, setLoading] = useState(false)
  const [validandoClave, setValidandoClave] = useState(false)
  const [claveValida, setClaveValida] = useState<boolean | null>(null)
  const [tabActiva, setTabActiva] = useState("basicos")

  const esEdicion = !!producto

  const form = useForm<ProductoFormData>({
    resolver: zodResolver(ProductoFormSchema),
    defaultValues: {
      ClaveProducto: producto?.ClaveProducto || "",
      TipoProducto: producto?.TipoProducto || "Platillo",
      Nombredelproducto: producto?.Nombredelproducto || "",
      Descripcion: producto?.Descripcion || "",
      Favorito: producto?.Favorito || false,
      ExentoImpuesto: producto?.ExentoImpuesto || false,
      PrecioAbierto: producto?.PrecioAbierto || false,
      ControlStock: producto?.ControlStock || false,
      PrecioxUtilidadad: producto?.PrecioxUtilidadad || false,
      Facturable: producto?.Facturable || true,
      Suspendido: producto?.Suspendido || false,
      Comedor: producto?.Comedor || false,
      ADomicilio: producto?.ADomicilio || false,
      Mostrador: producto?.Mostrador || false,
      Enlinea: producto?.Enlinea || false,
      EnAPP: producto?.EnAPP || false,
      EnMenuQR: producto?.EnMenuQR || false,
      GrupoProductoULID: producto?.GrupoProductoULID || "defaultGroup",
      SubgrupoProductoULID: producto?.SubgrupoProductoULID || "defaultSubgroup",
      UnidadesULID: producto?.UnidadesULID || "defaultUnit",
      AreaProduccionULID: producto?.AreaProduccionULID || "defaultArea",
      AlmacenULID: producto?.AlmacenULID || "defaultAlmacen",
      ClasificacionQRULID: producto?.ClasificacionQRULID || "defaultQR",
      ClaveTributaria: producto?.ClaveTributaria || "defaultTributaria",
      DatosDinamicos: producto?.DatosDinamicos || {},
    },
  })

  // Validar clave de producto en tiempo real
  const validarClave = async (clave: string) => {
    if (!clave || clave.length < 1) {
      setClaveValida(null)
      return
    }

    setValidandoClave(true)
    try {
      const result = await validarClaveProductoAction(clave, producto?.ProductoULID)
      if (result.success) {
        setClaveValida(!result.data) // Si no existe, es válida
      } else {
        setClaveValida(null)
      }
    } catch (error) {
      setClaveValida(null)
    } finally {
      setValidandoClave(false)
    }
  }

  // Efecto para validar clave cuando cambia
  useEffect(() => {
    const clave = form.watch("ClaveProducto")
    if (clave && clave !== producto?.ClaveProducto) {
      const timeoutId = setTimeout(() => validarClave(clave), 500)
      return () => clearTimeout(timeoutId)
    } else {
      setClaveValida(null)
    }
  }, [form.watch("ClaveProducto"), producto?.ClaveProducto])

  const onSubmit = async (data: ProductoFormData) => {
    // Validar que al menos un canal esté activo
    const canalesActivos = [
      data.Comedor,
      data.ADomicilio,
      data.Mostrador,
      data.Enlinea,
      data.EnAPP,
      data.EnMenuQR,
    ].some((canal) => canal === true)

    if (!canalesActivos) {
      toast.error("Debe seleccionar al menos un canal de venta")
      setTabActiva("canales")
      return
    }

    // Validar clave única para nuevos productos
    if (!esEdicion && claveValida === false) {
      toast.error("La clave del producto ya existe")
      setTabActiva("basicos")
      return
    }

    setLoading(true)
    try {
      const result = esEdicion
        ? await actualizarProductoAction(producto!.ProductoULID, data)
        : await crearProductoAction(data)

      if (result.success) {
        toast.success(result.message || `Producto ${esEdicion ? "actualizado" : "creado"} exitosamente`)
        onSuccess()
      } else {
        toast.error(result.error || `Error al ${esEdicion ? "actualizar" : "crear"} producto`)
      }
    } catch (error) {
      toast.error(`Error al ${esEdicion ? "actualizar" : "crear"} producto`)
    } finally {
      setLoading(false)
    }
  }

  const obtenerSubgruposFiltrados = () => {
    const grupoSeleccionado = form.watch("GrupoProductoULID")
    if (!grupoSeleccionado) return []

    return datosRelacionados.subgrupos.filter((subgrupo) => subgrupo.ClaveGrupo === grupoSeleccionado)
  }

  const contarCanalesActivos = () => {
    const valores = form.watch()
    return [
      valores.Comedor,
      valores.ADomicilio,
      valores.Mostrador,
      valores.Enlinea,
      valores.EnAPP,
      valores.EnMenuQR,
    ].filter(Boolean).length
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs value={tabActiva} onValueChange={setTabActiva} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basicos">Datos Básicos</TabsTrigger>
            <TabsTrigger value="canales">Canales ({contarCanalesActivos()})</TabsTrigger>
            <TabsTrigger value="configuracion">Configuración</TabsTrigger>
            <TabsTrigger value="relaciones">Relaciones</TabsTrigger>
          </TabsList>

          {/* Tab: Datos Básicos */}
          <TabsContent value="basicos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
                <CardDescription>Datos principales del producto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ClaveProducto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Clave del Producto *</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Ej: TACO001"
                              className="uppercase"
                              onChange={(e) => {
                                field.onChange(e.target.value.toUpperCase())
                              }}
                            />
                          </FormControl>
                          {validandoClave && (
                            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
                          )}
                          {!validandoClave && claveValida === true && (
                            <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                          )}
                          {!validandoClave && claveValida === false && (
                            <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
                          )}
                        </div>
                        <FormDescription>Solo letras mayúsculas y números (máx. 10 caracteres)</FormDescription>
                        {claveValida === false && <p className="text-sm text-red-600">Esta clave ya existe</p>}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="TipoProducto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Producto *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {TIPOS_PRODUCTO.map((tipo) => (
                              <SelectItem key={tipo.value} value={tipo.value}>
                                {tipo.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="Nombredelproducto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del Producto *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Ej: Taco de Pastor" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Descripcion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Descripción detallada del producto..." rows={3} />
                      </FormControl>
                      <FormDescription>Descripción que aparecerá en el menú (máx. 500 caracteres)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="Favorito"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Producto Favorito</FormLabel>
                          <FormDescription>Marcar como producto destacado</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Suspendido"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Producto Suspendido</FormLabel>
                          <FormDescription>Suspender del menú temporalmente</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Canales de Venta */}
          <TabsContent value="canales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Canales de Venta</CardTitle>
                <CardDescription>
                  Selecciona en qué canales estará disponible este producto
                  {contarCanalesActivos() === 0 && (
                    <Badge variant="destructive" className="ml-2">
                      Debe seleccionar al menos uno
                    </Badge>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CANALES_VENTA.map((canal) => (
                    <FormField
                      key={canal.key}
                      control={form.control}
                      name={canal.key as keyof ProductoFormData}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">{canal.label}</FormLabel>
                            <FormDescription className="text-sm">{canal.description}</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value as boolean} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Configuración */}
          <TabsContent value="configuracion" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configuración del Producto</CardTitle>
                <CardDescription>Opciones avanzadas de configuración</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ExentoImpuesto"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Exento de Impuesto</FormLabel>
                          <FormDescription>No aplicar impuestos a este producto</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="PrecioAbierto"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Precio Abierto</FormLabel>
                          <FormDescription>Permitir capturar precio al mesero</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ControlStock"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Control de Stock</FormLabel>
                          <FormDescription>Llevar control de inventario</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="PrecioxUtilidadad"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Precio por Utilidad</FormLabel>
                          <FormDescription>Calcular precio basado en % de utilidad</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Facturable"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Facturable</FormLabel>
                          <FormDescription>Se puede incluir en facturas</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <FormField
                  control={form.control}
                  name="ClaveTributaria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Clave Tributaria (SAT)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Ej: 50211503" />
                      </FormControl>
                      <FormDescription>Clave del catálogo SAT para emisión de CFDi</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Relaciones */}
          <TabsContent value="relaciones" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Relaciones del Producto</CardTitle>
                <CardDescription>Asociar con grupos, unidades y áreas de producción</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="GrupoProductoULID"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grupo de Producto</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar grupo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="defaultGroup">Sin grupo</SelectItem>
                            {datosRelacionados.grupos.map((grupo) => (
                              <SelectItem key={grupo.GrupoProductoULID} value={grupo.GrupoProductoULID}>
                                {grupo.Descripcion}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="SubgrupoProductoULID"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subgrupo de Producto</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar subgrupo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="defaultSubgroup">Sin subgrupo</SelectItem>
                            {obtenerSubgruposFiltrados().map((subgrupo) => (
                              <SelectItem key={subgrupo.SubgrupoProductoULID} value={subgrupo.SubgrupoProductoULID}>
                                {subgrupo.Descripcion}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          {!form.watch("GrupoProductoULID") && "Selecciona primero un grupo"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="UnidadesULID"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unidad de Medida</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar unidad" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="defaultUnit">Sin unidad</SelectItem>
                            {datosRelacionados.unidades.map((unidad) => (
                              <SelectItem key={unidad.UnidadULID} value={unidad.UnidadULID}>
                                {unidad.Descripcion} ({unidad.Abreviacion})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="AreaProduccionULID"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Área de Producción</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar área" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="defaultArea">Sin área</SelectItem>
                            {datosRelacionados.areasProduccion.map((area) => (
                              <SelectItem key={area.AreaProduccionULID} value={area.AreaProduccionULID}>
                                {area.Descripcion}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Botones de acción */}
        <div className="flex items-center justify-end space-x-2 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button type="submit" disabled={loading || (claveValida === false && !esEdicion)}>
            {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            {loading ? "Guardando..." : esEdicion ? "Actualizar" : "Crear Producto"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
