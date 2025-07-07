import { generateULID } from "@/lib/utils/ulid"

export interface Producto {
  ProductoULID: string
  GrupoProductoULID?: string
  SubgrupoProductoULID?: string
  ClaveProducto: string
  TipoProducto: "Platillo" | "Producto" | "Botella"
  Nombredelproducto: string
  Favorito: boolean
  Descripcion: string
  ExentoImpuesto: boolean
  PrecioAbierto: boolean
  UnidadesULID?: string
  AreaProduccionULID?: string
  AlmacenULID?: string
  ControlStock: boolean
  PrecioxUtilidadad: boolean
  Facturable: boolean
  ClaveTributaria?: string
  Suspendido: boolean
  Comedor: boolean
  ADomicilio: boolean
  Mostrador: boolean
  Enlinea: boolean
  EnAPP: boolean
  EnMenuQR: boolean
  ClasificacionQRULID?: string
  DatosDinamicos?: Record<string, any>
  Fecha_UltimoCambio: string
  Fecha_Sync: string
  UsuarioULID: string
  EmpresaULID: string
}

export interface GrupoProducto {
  GrupoProductoULID: string
  ClaveGrupo: string
  Descripcion: string
  Orden: number
  Clasificacion: string
  MenuQR: boolean
  CatalogoOnline: boolean
  APPComensal: boolean
  Inactiva: boolean
  Paletacolor: string
  Imagen?: string
  Sucursales: boolean
  AplicarComentarios: boolean
  CamposDinamicos?: Record<string, any>
  Fecha_UltimoCambio: string
  Fecha_Sync: string
  UsuarioULID: string
  EmpresaULID: string
}

export interface SubgrupoProducto {
  SubgrupoProductoULID: string
  ClaveGrupo: string
  ClaveSubGrupo: string
  Descripcion: string
  AplicarComentarios: boolean
  Suspendido: boolean
  Fecha_UltimoCambio: string
  Fecha_Sync: string
  UsuarioULID: string
  EmpresaULID: string
}

export interface Unidad {
  UnidadULID: string
  ClaveUnidad: string
  Descripcion: string
  Abreviacion: string
  Fecha_UltimoCambio: string
  Fecha_Sync: string
  UsuarioULID: string
  EmpresaULID: string
}

export interface AreaProduccion {
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

export interface Almacen {
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

// Mock data inicial
const mockProductos: Producto[] = [
  {
    ProductoULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3B",
    GrupoProductoULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3C",
    SubgrupoProductoULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3D",
    ClaveProducto: "TACO001",
    TipoProducto: "Platillo",
    Nombredelproducto: "Taco de Pastor",
    Favorito: true,
    Descripcion: "Delicioso taco de pastor con piña y cebolla",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3E",
    AreaProduccionULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3F",
    AlmacenULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3G",
    ControlStock: true,
    PrecioxUtilidadad: false,
    Facturable: true,
    ClaveTributaria: "50211503",
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: true,
    EnAPP: true,
    EnMenuQR: true,
    ClasificacionQRULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3H",
    DatosDinamicos: { precio: 25.0, costo: 15.0 },
    Fecha_UltimoCambio: new Date().toISOString(),
    Fecha_Sync: new Date().toISOString(),
    UsuarioULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3I",
    EmpresaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3J",
  },
  {
    ProductoULID: "01HKQM5X8P9R2T4V6W8Y0Z1A4B",
    GrupoProductoULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3C",
    SubgrupoProductoULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3D",
    ClaveProducto: "TACO002",
    TipoProducto: "Platillo",
    Nombredelproducto: "Taco de Carnitas",
    Favorito: false,
    Descripcion: "Taco de carnitas estilo Michoacán",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3E",
    AreaProduccionULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3F",
    AlmacenULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3G",
    ControlStock: true,
    PrecioxUtilidadad: false,
    Facturable: true,
    ClaveTributaria: "50211503",
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: false,
    EnAPP: false,
    EnMenuQR: true,
    ClasificacionQRULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3H",
    DatosDinamicos: { precio: 23.0, costo: 13.5 },
    Fecha_UltimoCambio: new Date().toISOString(),
    Fecha_Sync: new Date().toISOString(),
    UsuarioULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3I",
    EmpresaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3J",
  },
  {
    ProductoULID: "01HKQM5X8P9R2T4V6W8Y0Z1A5B",
    GrupoProductoULID: "01HKQM5X8P9R2T4V6W8Y0Z1A5C",
    SubgrupoProductoULID: "01HKQM5X8P9R2T4V6W8Y0Z1A5D",
    ClaveProducto: "BEB001",
    TipoProducto: "Botella",
    Nombredelproducto: "Coca Cola 600ml",
    Favorito: true,
    Descripcion: "Refresco Coca Cola 600ml",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: "01HKQM5X8P9R2T4V6W8Y0Z1A5E",
    AreaProduccionULID: "01HKQM5X8P9R2T4V6W8Y0Z1A5F",
    AlmacenULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3G",
    ControlStock: true,
    PrecioxUtilidadad: true,
    Facturable: true,
    ClaveTributaria: "50202306",
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: true,
    EnAPP: true,
    EnMenuQR: false,
    ClasificacionQRULID: "01HKQM5X8P9R2T4V6W8Y0Z1A5H",
    DatosDinamicos: { precio: 18.0, costo: 12.0 },
    Fecha_UltimoCambio: new Date().toISOString(),
    Fecha_Sync: new Date().toISOString(),
    UsuarioULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3I",
    EmpresaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3J",
  },
  {
    ProductoULID: "01HKQM5X8P9R2T4V6W8Y0Z1A6B",
    GrupoProductoULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3C",
    SubgrupoProductoULID: "01HKQM5X8P9R2T4V6W8Y0Z1A6D",
    ClaveProducto: "QUES001",
    TipoProducto: "Platillo",
    Nombredelproducto: "Quesadilla Mixta",
    Favorito: false,
    Descripcion: "Quesadilla con queso y carne mixta",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3E",
    AreaProduccionULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3F",
    AlmacenULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3G",
    ControlStock: false,
    PrecioxUtilidadad: false,
    Facturable: true,
    ClaveTributaria: "50211503",
    Suspendido: true,
    Comedor: true,
    ADomicilio: false,
    Mostrador: true,
    Enlinea: false,
    EnAPP: false,
    EnMenuQR: false,
    ClasificacionQRULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3H",
    DatosDinamicos: { precio: 35.0, costo: 20.0 },
    Fecha_UltimoCambio: new Date().toISOString(),
    Fecha_Sync: new Date().toISOString(),
    UsuarioULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3I",
    EmpresaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3J",
  },
]

const mockGruposProductos: GrupoProducto[] = [
  {
    GrupoProductoULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3C",
    ClaveGrupo: "TACOS",
    Descripcion: "Tacos y Antojitos",
    Orden: 1,
    Clasificacion: "Comida Mexicana",
    MenuQR: true,
    CatalogoOnline: true,
    APPComensal: true,
    Inactiva: false,
    Paletacolor: "#FF6B35",
    Imagen: "/images/grupos/tacos.jpg",
    Sucursales: true,
    AplicarComentarios: true,
    CamposDinamicos: {},
    Fecha_UltimoCambio: new Date().toISOString(),
    Fecha_Sync: new Date().toISOString(),
    UsuarioULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3I",
    EmpresaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3J",
  },
  {
    GrupoProductoULID: "01HKQM5X8P9R2T4V6W8Y0Z1A5C",
    ClaveGrupo: "BEBIDAS",
    Descripcion: "Bebidas y Refrescos",
    Orden: 2,
    Clasificacion: "Bebidas",
    MenuQR: false,
    CatalogoOnline: true,
    APPComensal: true,
    Inactiva: false,
    Paletacolor: "#4ECDC4",
    Imagen: "/images/grupos/bebidas.jpg",
    Sucursales: true,
    AplicarComentarios: false,
    CamposDinamicos: {},
    Fecha_UltimoCambio: new Date().toISOString(),
    Fecha_Sync: new Date().toISOString(),
    UsuarioULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3I",
    EmpresaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3J",
  },
]

const mockSubgruposProductos: SubgrupoProducto[] = [
  {
    SubgrupoProductoULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3D",
    ClaveGrupo: "01HKQM5X8P9R2T4V6W8Y0Z1A3C",
    ClaveSubGrupo: "TACOS-CARNE",
    Descripcion: "Tacos de Carne",
    AplicarComentarios: true,
    Suspendido: false,
    Fecha_UltimoCambio: new Date().toISOString(),
    Fecha_Sync: new Date().toISOString(),
    UsuarioULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3I",
    EmpresaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3J",
  },
  {
    SubgrupoProductoULID: "01HKQM5X8P9R2T4V6W8Y0Z1A6D",
    ClaveGrupo: "01HKQM5X8P9R2T4V6W8Y0Z1A3C",
    ClaveSubGrupo: "QUESADILLAS",
    Descripcion: "Quesadillas",
    AplicarComentarios: true,
    Suspendido: false,
    Fecha_UltimoCambio: new Date().toISOString(),
    Fecha_Sync: new Date().toISOString(),
    UsuarioULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3I",
    EmpresaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3J",
  },
  {
    SubgrupoProductoULID: "01HKQM5X8P9R2T4V6W8Y0Z1A5D",
    ClaveGrupo: "01HKQM5X8P9R2T4V6W8Y0Z1A5C",
    ClaveSubGrupo: "REFRESCOS",
    Descripcion: "Refrescos y Bebidas Gaseosas",
    AplicarComentarios: false,
    Suspendido: false,
    Fecha_UltimoCambio: new Date().toISOString(),
    Fecha_Sync: new Date().toISOString(),
    UsuarioULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3I",
    EmpresaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3J",
  },
]

const mockUnidades: Unidad[] = [
  {
    UnidadULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3E",
    ClaveUnidad: "PZA",
    Descripcion: "Pieza",
    Abreviacion: "pza",
    Fecha_UltimoCambio: new Date().toISOString(),
    Fecha_Sync: new Date().toISOString(),
    UsuarioULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3I",
    EmpresaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3J",
  },
  {
    UnidadULID: "01HKQM5X8P9R2T4V6W8Y0Z1A5E",
    ClaveUnidad: "BOT",
    Descripcion: "Botella",
    Abreviacion: "bot",
    Fecha_UltimoCambio: new Date().toISOString(),
    Fecha_Sync: new Date().toISOString(),
    UsuarioULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3I",
    EmpresaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3J",
  },
  {
    UnidadULID: "01HKQM5X8P9R2T4V6W8Y0Z1A7E",
    ClaveUnidad: "KG",
    Descripcion: "Kilogramo",
    Abreviacion: "kg",
    Fecha_UltimoCambio: new Date().toISOString(),
    Fecha_Sync: new Date().toISOString(),
    UsuarioULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3I",
    EmpresaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3J",
  },
  {
    UnidadULID: "01HKQM5X8P9R2T4V6W8Y0Z1A8E",
    ClaveUnidad: "LT",
    Descripcion: "Litro",
    Abreviacion: "lt",
    Fecha_UltimoCambio: new Date().toISOString(),
    Fecha_Sync: new Date().toISOString(),
    UsuarioULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3I",
    EmpresaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3J",
  },
]

const mockAreasProduccion: AreaProduccion[] = [
  {
    AreaProduccionULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3F",
    ClaveArea: "COCINA",
    Descripcion: "Cocina Principal",
    Impresora: "EPSON-TM-T20",
    Activa: true,
    Fecha_UltimoCambio: new Date().toISOString(),
    Fecha_Sync: new Date().toISOString(),
    UsuarioULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3I",
    EmpresaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3J",
  },
  {
    AreaProduccionULID: "01HKQM5X8P9R2T4V6W8Y0Z1A5F",
    ClaveArea: "BARRA",
    Descripcion: "Barra de Bebidas",
    Impresora: "EPSON-TM-T88",
    Activa: true,
    Fecha_UltimoCambio: new Date().toISOString(),
    Fecha_Sync: new Date().toISOString(),
    UsuarioULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3I",
    EmpresaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3J",
  },
  {
    AreaProduccionULID: "01HKQM5X8P9R2T4V6W8Y0Z1A6F",
    ClaveArea: "PARRILLA",
    Descripcion: "Parrilla y Asados",
    Impresora: "EPSON-TM-T82",
    Activa: true,
    Fecha_UltimoCambio: new Date().toISOString(),
    Fecha_Sync: new Date().toISOString(),
    UsuarioULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3I",
    EmpresaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3J",
  },
]

const mockAlmacenes: Almacen[] = [
  {
    AlmacenULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3G",
    ClaveAlmacen: "ALM001",
    Nombre: "Almacén General",
    Descripcion: "Almacén principal de ingredientes",
    Direccion: "Bodega Principal - Planta Baja",
    Activo: true,
    Fecha_UltimoCambio: new Date().toISOString(),
    Fecha_Sync: new Date().toISOString(),
    UsuarioULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3I",
    EmpresaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3J",
  },
  {
    AlmacenULID: "01HKQM5X8P9R2T4V6W8Y0Z1A4G",
    ClaveAlmacen: "ALM002",
    Nombre: "Refrigerador",
    Descripcion: "Almacén refrigerado para productos perecederos",
    Direccion: "Cámara de Refrigeración",
    Activo: true,
    Fecha_UltimoCambio: new Date().toISOString(),
    Fecha_Sync: new Date().toISOString(),
    UsuarioULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3I",
    EmpresaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3J",
  },
  {
    AlmacenULID: "01HKQM5X8P9R2T4V6W8Y0Z1A5G",
    ClaveAlmacen: "ALM003",
    Nombre: "Congelador",
    Descripcion: "Almacén congelado para carnes y productos congelados",
    Direccion: "Cámara de Congelación",
    Activo: true,
    Fecha_UltimoCambio: new Date().toISOString(),
    Fecha_Sync: new Date().toISOString(),
    UsuarioULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3I",
    EmpresaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3J",
  },
  {
    AlmacenULID: "01HKQM5X8P9R2T4V6W8Y0Z1A6G",
    ClaveAlmacen: "ALM004",
    Nombre: "Barra",
    Descripcion: "Almacén de bebidas y licores",
    Direccion: "Área de Barra",
    Activo: true,
    Fecha_UltimoCambio: new Date().toISOString(),
    Fecha_Sync: new Date().toISOString(),
    UsuarioULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3I",
    EmpresaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3J",
  },
]

// Funciones CRUD para Productos
export const getProductos = async (): Promise<Producto[]> => {
  // Simular delay de API
  await new Promise((resolve) => setTimeout(resolve, 100))
  return [...mockProductos]
}

export const getProductoById = async (id: string): Promise<Producto | null> => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return mockProductos.find((p) => p.ProductoULID === id) || null
}

export const createProducto = async (
  producto: Omit<Producto, "ProductoULID" | "Fecha_UltimoCambio" | "Fecha_Sync">,
): Promise<Producto> => {
  await new Promise((resolve) => setTimeout(resolve, 200))

  // Verificar que la clave no exista
  const existeClave = mockProductos.some((p) => p.ClaveProducto === producto.ClaveProducto)
  if (existeClave) {
    throw new Error(`Ya existe un producto con la clave: ${producto.ClaveProducto}`)
  }

  const nuevoProducto: Producto = {
    ...producto,
    ProductoULID: generateULID(),
    Fecha_UltimoCambio: new Date().toISOString(),
    Fecha_Sync: new Date().toISOString(),
  }

  mockProductos.push(nuevoProducto)
  return nuevoProducto
}

export const updateProducto = async (
  id: string,
  producto: Partial<Omit<Producto, "ProductoULID">>,
): Promise<Producto> => {
  await new Promise((resolve) => setTimeout(resolve, 200))

  const index = mockProductos.findIndex((p) => p.ProductoULID === id)
  if (index === -1) {
    throw new Error("Producto no encontrado")
  }

  // Verificar que la clave no exista en otro producto
  if (producto.ClaveProducto) {
    const existeClave = mockProductos.some((p) => p.ClaveProducto === producto.ClaveProducto && p.ProductoULID !== id)
    if (existeClave) {
      throw new Error(`Ya existe un producto con la clave: ${producto.ClaveProducto}`)
    }
  }

  const productoActualizado: Producto = {
    ...mockProductos[index],
    ...producto,
    Fecha_UltimoCambio: new Date().toISOString(),
  }

  mockProductos[index] = productoActualizado
  return productoActualizado
}

export const deleteProducto = async (id: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 150))

  const index = mockProductos.findIndex((p) => p.ProductoULID === id)
  if (index === -1) {
    throw new Error("Producto no encontrado")
  }

  mockProductos.splice(index, 1)
  return true
}

export const toggleFavorito = async (id: string): Promise<Producto> => {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const index = mockProductos.findIndex((p) => p.ProductoULID === id)
  if (index === -1) {
    throw new Error("Producto no encontrado")
  }

  mockProductos[index].Favorito = !mockProductos[index].Favorito
  mockProductos[index].Fecha_UltimoCambio = new Date().toISOString()

  return mockProductos[index]
}

export const toggleSuspendido = async (id: string): Promise<Producto> => {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const index = mockProductos.findIndex((p) => p.ProductoULID === id)
  if (index === -1) {
    throw new Error("Producto no encontrado")
  }

  mockProductos[index].Suspendido = !mockProductos[index].Suspendido
  mockProductos[index].Fecha_UltimoCambio = new Date().toISOString()

  return mockProductos[index]
}

// Funciones para datos relacionados
export const getGruposProductos = async (): Promise<GrupoProducto[]> => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return [...mockGruposProductos]
}

export const getSubgruposProductos = async (): Promise<SubgrupoProducto[]> => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return [...mockSubgruposProductos]
}

export const getUnidades = async (): Promise<Unidad[]> => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return [...mockUnidades]
}

export const getAreasProduccion = async (): Promise<AreaProduccion[]> => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return [...mockAreasProduccion]
}

export const getAlmacenes = async (): Promise<Almacen[]> => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return [...mockAlmacenes]
}

// Funciones auxiliares para obtener por ID
export const getGrupoById = (id: string): GrupoProducto | null => {
  return mockGruposProductos.find((g) => g.GrupoProductoULID === id) || null
}

export const getSubgrupoById = (id: string): SubgrupoProducto | null => {
  return mockSubgruposProductos.find((s) => s.SubgrupoProductoULID === id) || null
}

export const getUnidadById = (id: string): Unidad | null => {
  return mockUnidades.find((u) => u.UnidadULID === id) || null
}

export const getAreaProduccionById = (id: string): AreaProduccion | null => {
  return mockAreasProduccion.find((a) => a.AreaProduccionULID === id) || null
}

export const getAlmacenById = (id: string): Almacen | null => {
  return mockAlmacenes.find((a) => a.AlmacenULID === id) || null
}

// Función para verificar si una clave existe
export const existeClaveProducto = async (clave: string, excludeId?: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return !mockProductos.some((p) => p.ClaveProducto === clave && p.ProductoULID !== excludeId)
}

// Función para obtener estadísticas
export const getEstadisticasProductos = async () => {
  await new Promise((resolve) => setTimeout(resolve, 50))

  const total = mockProductos.length
  const activos = mockProductos.filter((p) => !p.Suspendido).length
  const favoritos = mockProductos.filter((p) => p.Favorito).length
  const suspendidos = mockProductos.filter((p) => p.Suspendido).length

  const porTipo = mockProductos.reduce(
    (acc, producto) => {
      acc[producto.TipoProducto] = (acc[producto.TipoProducto] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return {
    total,
    activos,
    favoritos,
    suspendidos,
    porTipo,
  }
}

// Funciones de búsqueda y filtrado
export const buscarProductos = async (termino: string): Promise<Producto[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100))

  if (!termino.trim()) {
    return [...mockProductos]
  }

  const terminoLower = termino.toLowerCase()
  return mockProductos.filter(
    (producto) =>
      producto.Nombredelproducto.toLowerCase().includes(terminoLower) ||
      producto.ClaveProducto.toLowerCase().includes(terminoLower) ||
      producto.Descripcion.toLowerCase().includes(terminoLower),
  )
}

export const filtrarProductosPorTipo = async (tipo: string): Promise<Producto[]> => {
  await new Promise((resolve) => setTimeout(resolve, 50))

  if (tipo === "todos" || !tipo) {
    return [...mockProductos]
  }

  return mockProductos.filter((producto) => producto.TipoProducto === tipo)
}

export const filtrarProductosPorGrupo = async (grupoId: string): Promise<Producto[]> => {
  await new Promise((resolve) => setTimeout(resolve, 50))

  if (grupoId === "todos" || !grupoId) {
    return [...mockProductos]
  }

  return mockProductos.filter((producto) => producto.GrupoProductoULID === grupoId)
}

export const obtenerProductosFavoritos = async (): Promise<Producto[]> => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return mockProductos.filter((producto) => producto.Favorito)
}

export const obtenerProductosSuspendidos = async (): Promise<Producto[]> => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return mockProductos.filter((producto) => producto.Suspendido)
}

export const obtenerProductosActivos = async (): Promise<Producto[]> => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return mockProductos.filter((producto) => !producto.Suspendido)
}

// Funciones para validaciones
export const validarClaveUnica = async (clave: string, excludeId?: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return !mockProductos.some((p) => p.ClaveProducto === clave && p.ProductoULID !== excludeId)
}

// Función para resetear datos (útil para testing)
export const resetearDatos = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 100))
  // En una implementación real, esto recargaría los datos desde la fuente original
  console.log("Datos reseteados")
}

// Exportar constantes útiles
export const TIPOS_PRODUCTO_OPCIONES = [
  { value: "Platillo", label: "Platillo", description: "Producto que requiere preparación" },
  { value: "Producto", label: "Producto", description: "Producto que se vende tal como se compra" },
  { value: "Botella", label: "Botella", description: "Bebidas alcohólicas y no alcohólicas" },
]

export const CANALES_VENTA_OPCIONES = [
  { key: "Comedor", label: "Comedor", description: "Disponible para servicio en mesas" },
  { key: "ADomicilio", label: "A Domicilio", description: "Disponible para entrega a domicilio" },
  { key: "Mostrador", label: "Mostrador", description: "Disponible para venta en mostrador" },
  { key: "Enlinea", label: "En Línea", description: "Disponible en plataforma web" },
  { key: "EnAPP", label: "En APP", description: "Disponible en aplicación móvil" },
  { key: "EnMenuQR", label: "Menú QR", description: "Disponible en menú con código QR" },
]
