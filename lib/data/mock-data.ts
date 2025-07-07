// Interfaces para los datos mock
export interface Cliente {
  id: string
  nombre: string
  apellidos: string
  telefono: string
  email: string
  fechaNacimiento?: string
  direccion: Direccion
  preferencias: Preferencias
  historialVisitas: HistorialVisita[]
  puntosAcumulados: number
  nivelFidelidad: "Bronce" | "Plata" | "Oro" | "Platino"
  notasEspeciales?: string
  fechaRegistro: string
  ultimaVisita?: string
  activo: boolean
}

export interface Direccion {
  calle: string
  numero: string
  colonia: string
  ciudad: string
  estado: string
  codigoPostal: string
  referencias?: string
}

export interface Preferencias {
  tiposComidaFavorita: string[]
  alergias: string[]
  restriccionesDieteticas: string[]
  ocasionesEspeciales: string[]
  platillosFavoritos: string[]
}

export interface HistorialVisita {
  fecha: string
  mesa: string
  numeroPersonas: number
  consumoTotal: number
  platillosOrdenados: string[]
  tiempoEstancia: number
  satisfaccion: number
}

export interface ProductoMock {
  id: string
  clave: string
  nombre: string
  descripcion: string
  precio: number
  categoria: string
  subcategoria: string
  tipo: "Platillo" | "Bebida" | "Postre" | "Entrada"
  disponible: boolean
  stock: number
  stockMinimo: number
  unidad: string
  ingredientes: string[]
  calorias?: number
  tiempoPreparacion: number
  imagen: string
  etiquetas: string[]
  favorito: boolean
  suspendido: boolean
  fechaCreacion: string
}

export interface Mesa {
  id: string
  numero: string
  capacidad: number
  tipo: "Regular" | "VIP" | "Terraza" | "Barra"
  estado: "Disponible" | "Ocupada" | "Reservada" | "Limpieza"
  ubicacion: string
  area: string
  fechaUltimaLimpieza?: string
  clienteActual?: string
  horaOcupacion?: string
}

// Mock data para clientes
export const mockClientes: Cliente[] = [
  {
    id: "01HKQM5X8P9R2T4V6W8Y0Z1A1C",
    nombre: "Juan Carlos",
    apellidos: "García Martínez",
    telefono: "+52 55 1234 5678",
    email: "juan.garcia@email.com",
    fechaNacimiento: "1985-03-15",
    direccion: {
      calle: "Av. Insurgentes Sur",
      numero: "1234",
      colonia: "Del Valle",
      ciudad: "Ciudad de México",
      estado: "CDMX",
      codigoPostal: "03100",
      referencias: "Entre Eje 7 y Eje 8, edificio azul",
    },
    preferencias: {
      tiposComidaFavorita: ["Mexicana", "Italiana"],
      alergias: [],
      restriccionesDieteticas: [],
      ocasionesEspeciales: ["Cumpleaños", "Aniversarios"],
      platillosFavoritos: ["Tacos al Pastor", "Pizza Margherita"],
    },
    historialVisitas: [
      {
        fecha: "2024-01-15",
        mesa: "5",
        numeroPersonas: 2,
        consumoTotal: 450.0,
        platillosOrdenados: ["Tacos al Pastor", "Quesadilla", "Coca Cola"],
        tiempoEstancia: 90,
        satisfaccion: 5,
      },
      {
        fecha: "2024-01-08",
        mesa: "3",
        numeroPersonas: 4,
        consumoTotal: 890.0,
        platillosOrdenados: ["Pizza Margherita", "Ensalada César", "Pasta Alfredo"],
        tiempoEstancia: 120,
        satisfaccion: 4,
      },
    ],
    puntosAcumulados: 1340,
    nivelFidelidad: "Oro",
    notasEspeciales: "Cliente frecuente, prefiere mesa cerca de la ventana",
    fechaRegistro: "2023-06-15",
    ultimaVisita: "2024-01-15",
    activo: true,
  },
  {
    id: "01HKQM5X8P9R2T4V6W8Y0Z1A2C",
    nombre: "María Elena",
    apellidos: "Rodríguez López",
    telefono: "+52 55 9876 5432",
    email: "maria.rodriguez@email.com",
    fechaNacimiento: "1990-07-22",
    direccion: {
      calle: "Calle Revolución",
      numero: "567",
      colonia: "San Ángel",
      ciudad: "Ciudad de México",
      estado: "CDMX",
      codigoPostal: "01000",
      referencias: "Casa blanca con portón negro",
    },
    preferencias: {
      tiposComidaFavorita: ["Vegetariana", "Mediterránea"],
      alergias: ["Mariscos", "Nueces"],
      restriccionesDieteticas: ["Vegetariana"],
      ocasionesEspeciales: ["Cenas románticas"],
      platillosFavoritos: ["Ensalada César", "Pasta Alfredo"],
    },
    historialVisitas: [
      {
        fecha: "2024-01-12",
        mesa: "VIP-1",
        numeroPersonas: 2,
        consumoTotal: 650.0,
        platillosOrdenados: ["Ensalada César", "Pasta Alfredo", "Agua Natural"],
        tiempoEstancia: 105,
        satisfaccion: 5,
      },
    ],
    puntosAcumulados: 650,
    nivelFidelidad: "Plata",
    notasEspeciales: "Alérgica a mariscos y nueces. Vegetariana estricta.",
    fechaRegistro: "2023-09-10",
    ultimaVisita: "2024-01-12",
    activo: true,
  },
  {
    id: "01HKQM5X8P9R2T4V6W8Y0Z1A3C",
    nombre: "Carlos Alberto",
    apellidos: "Hernández Silva",
    telefono: "+52 55 5555 1234",
    email: "carlos.hernandez@email.com",
    fechaNacimiento: "1978-11-30",
    direccion: {
      calle: "Paseo de la Reforma",
      numero: "890",
      colonia: "Juárez",
      ciudad: "Ciudad de México",
      estado: "CDMX",
      codigoPostal: "06600",
      referencias: "Torre corporativa, piso 15",
    },
    preferencias: {
      tiposComidaFavorita: ["Mexicana", "Internacional"],
      alergias: [],
      restriccionesDieteticas: [],
      ocasionesEspeciales: ["Comidas de negocios", "Celebraciones familiares"],
      platillosFavoritos: ["Hamburguesa Clásica", "Tacos al Pastor"],
    },
    historialVisitas: [
      {
        fecha: "2024-01-10",
        mesa: "VIP-2",
        numeroPersonas: 6,
        consumoTotal: 1200.0,
        platillosOrdenados: ["Hamburguesa Clásica", "Pizza Margherita", "Tacos al Pastor"],
        tiempoEstancia: 150,
        satisfaccion: 5,
      },
    ],
    puntosAcumulados: 2400,
    nivelFidelidad: "Platino",
    notasEspeciales: "Cliente VIP, ejecutivo, prefiere mesas privadas para reuniones",
    fechaRegistro: "2023-03-20",
    ultimaVisita: "2024-01-10",
    activo: true,
  },
  {
    id: "01HKQM5X8P9R2T4V6W8Y0Z1A4C",
    nombre: "Ana Patricia",
    apellidos: "López Morales",
    telefono: "+52 55 7777 8888",
    email: "ana.lopez@email.com",
    fechaNacimiento: "1995-05-18",
    direccion: {
      calle: "Av. Universidad",
      numero: "1500",
      colonia: "Copilco",
      ciudad: "Ciudad de México",
      estado: "CDMX",
      codigoPostal: "04360",
      referencias: "Conjunto habitacional Las Flores, edificio C",
    },
    preferencias: {
      tiposComidaFavorita: ["Saludable", "Asiática"],
      alergias: ["Gluten"],
      restriccionesDieteticas: ["Sin gluten", "Baja en sodio"],
      ocasionesEspeciales: ["Cumpleaños"],
      platillosFavoritos: ["Ensalada César"],
    },
    historialVisitas: [
      {
        fecha: "2024-01-05",
        mesa: "2",
        numeroPersonas: 1,
        consumoTotal: 180.0,
        platillosOrdenados: ["Ensalada César", "Agua Natural"],
        tiempoEstancia: 45,
        satisfaccion: 4,
      },
    ],
    puntosAcumulados: 180,
    nivelFidelidad: "Bronce",
    notasEspeciales: "Intolerante al gluten, prefiere opciones saludables",
    fechaRegistro: "2024-01-05",
    ultimaVisita: "2024-01-05",
    activo: true,
  },
  {
    id: "01HKQM5X8P9R2T4V6W8Y0Z1A5C",
    nombre: "Roberto",
    apellidos: "Sánchez Pérez",
    telefono: "+52 55 3333 4444",
    email: "roberto.sanchez@email.com",
    fechaNacimiento: "1982-09-12",
    direccion: {
      calle: "Calle Madero",
      numero: "234",
      colonia: "Centro Histórico",
      ciudad: "Ciudad de México",
      estado: "CDMX",
      codigoPostal: "06000",
      referencias: "Edificio colonial, segundo piso",
    },
    preferencias: {
      tiposComidaFavorita: ["Mexicana", "Comida rápida"],
      alergias: [],
      restriccionesDieteticas: [],
      ocasionesEspeciales: ["Ver fútbol", "Reuniones familiares"],
      platillosFavoritos: ["Hamburguesa Clásica", "Tacos al Pastor"],
    },
    historialVisitas: [
      {
        fecha: "2024-01-07",
        mesa: "B-1",
        numeroPersonas: 3,
        consumoTotal: 520.0,
        platillosOrdenados: ["Hamburguesa Clásica", "Tacos al Pastor", "Coca Cola"],
        tiempoEstancia: 80,
        satisfaccion: 4,
      },
    ],
    puntosAcumulados: 520,
    nivelFidelidad: "Bronce",
    notasEspeciales: "Le gusta ver los partidos de fútbol, prefiere la barra",
    fechaRegistro: "2023-11-15",
    ultimaVisita: "2024-01-07",
    activo: true,
  },
]

// Mock data para productos
export const mockProductos: ProductoMock[] = [
  {
    id: "01HKQM5X8P9R2T4V6W8Y0Z1A1P",
    clave: "TACO001",
    nombre: "Tacos al Pastor",
    descripcion: "Deliciosos tacos al pastor con piña, cebolla y cilantro, servidos en tortilla de maíz",
    precio: 85.0,
    categoria: "Platillos Principales",
    subcategoria: "Tacos",
    tipo: "Platillo",
    disponible: true,
    stock: 50,
    stockMinimo: 10,
    unidad: "orden",
    ingredientes: ["Carne de cerdo", "Piña", "Cebolla", "Cilantro", "Tortilla de maíz", "Salsa verde", "Salsa roja"],
    calorias: 320,
    tiempoPreparacion: 8,
    imagen: "/placeholder.svg?height=200&width=200&text=Tacos+al+Pastor",
    etiquetas: ["Mexicano", "Picante", "Popular"],
    favorito: true,
    suspendido: false,
    fechaCreacion: "2023-01-15",
  },
  {
    id: "01HKQM5X8P9R2T4V6W8Y0Z1A2P",
    clave: "QUES001",
    nombre: "Quesadilla",
    descripcion: "Quesadilla de queso Oaxaca con opción de agregar pollo, champiñones o flor de calabaza",
    precio: 65.0,
    categoria: "Antojitos",
    subcategoria: "Quesadillas",
    tipo: "Platillo",
    disponible: true,
    stock: 30,
    stockMinimo: 8,
    unidad: "pieza",
    ingredientes: ["Tortilla de harina", "Queso Oaxaca", "Cebolla", "Epazote"],
    calorias: 280,
    tiempoPreparacion: 6,
    imagen: "/placeholder.svg?height=200&width=200&text=Quesadilla",
    etiquetas: ["Mexicano", "Vegetariano", "Queso"],
    favorito: false,
    suspendido: false,
    fechaCreacion: "2023-01-15",
  },
  {
    id: "01HKQM5X8P9R2T4V6W8Y0Z1A3P",
    clave: "HAMB001",
    nombre: "Hamburguesa Clásica",
    descripcion: "Hamburguesa de carne de res con lechuga, tomate, cebolla, pepinillos y papas fritas",
    precio: 120.0,
    categoria: "Platillos Principales",
    subcategoria: "Hamburguesas",
    tipo: "Platillo",
    disponible: true,
    stock: 25,
    stockMinimo: 5,
    unidad: "pieza",
    ingredientes: ["Carne de res", "Pan para hamburguesa", "Lechuga", "Tomate", "Cebolla", "Pepinillos", "Papas"],
    calorias: 650,
    tiempoPreparacion: 12,
    imagen: "/placeholder.svg?height=200&width=200&text=Hamburguesa",
    etiquetas: ["Internacional", "Carne", "Papas"],
    favorito: true,
    suspendido: false,
    fechaCreacion: "2023-02-01",
  },
  {
    id: "01HKQM5X8P9R2T4V6W8Y0Z1A4P",
    clave: "PIZZ001",
    nombre: "Pizza Margherita",
    descripcion: "Pizza italiana tradicional con salsa de tomate, mozzarella fresca y albahaca",
    precio: 180.0,
    categoria: "Platillos Principales",
    subcategoria: "Pizzas",
    tipo: "Platillo",
    disponible: true,
    stock: 15,
    stockMinimo: 3,
    unidad: "pieza",
    ingredientes: ["Masa de pizza", "Salsa de tomate", "Mozzarella", "Albahaca", "Aceite de oliva"],
    calorias: 890,
    tiempoPreparacion: 15,
    imagen: "/placeholder.svg?height=200&width=200&text=Pizza+Margherita",
    etiquetas: ["Italiano", "Vegetariano", "Queso"],
    favorito: true,
    suspendido: false,
    fechaCreacion: "2023-02-15",
  },
  {
    id: "01HKQM5X8P9R2T4V6W8Y0Z1A5P",
    clave: "PAST001",
    nombre: "Pasta Alfredo",
    descripcion: "Fettuccine en salsa cremosa de mantequilla, parmesano y crema, con pollo opcional",
    precio: 145.0,
    categoria: "Platillos Principales",
    subcategoria: "Pastas",
    tipo: "Platillo",
    disponible: true,
    stock: 20,
    stockMinimo: 5,
    unidad: "plato",
    ingredientes: ["Fettuccine", "Mantequilla", "Crema", "Queso parmesano", "Ajo", "Perejil"],
    calorias: 720,
    tiempoPreparacion: 10,
    imagen: "/placeholder.svg?height=200&width=200&text=Pasta+Alfredo",
    etiquetas: ["Italiano", "Cremoso", "Pasta"],
    favorito: false,
    suspendido: false,
    fechaCreacion: "2023-03-01",
  },
  {
    id: "01HKQM5X8P9R2T4V6W8Y0Z1A6P",
    clave: "ENSA001",
    nombre: "Ensalada César",
    descripcion: "Ensalada fresca con lechuga romana, crutones, parmesano y aderezo césar",
    precio: 95.0,
    categoria: "Ensaladas",
    subcategoria: "Ensaladas Verdes",
    tipo: "Entrada",
    disponible: true,
    stock: 35,
    stockMinimo: 10,
    unidad: "plato",
    ingredientes: ["Lechuga romana", "Crutones", "Queso parmesano", "Aderezo césar", "Limón"],
    calorias: 180,
    tiempoPreparacion: 5,
    imagen: "/placeholder.svg?height=200&width=200&text=Ensalada+César",
    etiquetas: ["Saludable", "Vegetariano", "Fresco"],
    favorito: false,
    suspendido: false,
    fechaCreacion: "2023-01-20",
  },
  {
    id: "01HKQM5X8P9R2T4V6W8Y0Z1A7P",
    clave: "COCA001",
    nombre: "Coca Cola",
    descripcion: "Refresco de cola 355ml, servido bien frío",
    precio: 25.0,
    categoria: "Bebidas",
    subcategoria: "Refrescos",
    tipo: "Bebida",
    disponible: true,
    stock: 100,
    stockMinimo: 20,
    unidad: "lata",
    ingredientes: ["Agua carbonatada", "Jarabe de maíz", "Cafeína", "Ácido fosfórico"],
    calorias: 140,
    tiempoPreparacion: 1,
    imagen: "/placeholder.svg?height=200&width=200&text=Coca+Cola",
    etiquetas: ["Bebida", "Refrescante", "Gaseosa"],
    favorito: true,
    suspendido: false,
    fechaCreacion: "2023-01-10",
  },
  {
    id: "01HKQM5X8P9R2T4V6W8Y0Z1A8P",
    clave: "AGUA001",
    nombre: "Agua Natural",
    descripcion: "Agua purificada 500ml, ideal para acompañar cualquier platillo",
    precio: 15.0,
    categoria: "Bebidas",
    subcategoria: "Aguas",
    tipo: "Bebida",
    disponible: true,
    stock: 150,
    stockMinimo: 30,
    unidad: "botella",
    ingredientes: ["Agua purificada"],
    calorias: 0,
    tiempoPreparacion: 1,
    imagen: "/placeholder.svg?height=200&width=200&text=Agua+Natural",
    etiquetas: ["Saludable", "Natural", "Sin calorías"],
    favorito: false,
    suspendido: false,
    fechaCreacion: "2023-01-10",
  },
]

// Mock data para mesas
export const mockMesas: Mesa[] = [
  {
    id: "01HKQM5X8P9R2T4V6W8Y0Z1A1M",
    numero: "1",
    capacidad: 4,
    tipo: "Regular",
    estado: "Disponible",
    ubicacion: "Ventana izquierda",
    area: "Comedor Principal",
    fechaUltimaLimpieza: "2024-01-15T10:30:00Z",
  },
  {
    id: "01HKQM5X8P9R2T4V6W8Y0Z1A2M",
    numero: "2",
    capacidad: 2,
    tipo: "Regular",
    estado: "Ocupada",
    ubicacion: "Centro del comedor",
    area: "Comedor Principal",
    fechaUltimaLimpieza: "2024-01-15T09:15:00Z",
    clienteActual: "Ana Patricia López",
    horaOcupacion: "2024-01-15T12:00:00Z",
  },
  {
    id: "01HKQM5X8P9R2T4V6W8Y0Z1A3M",
    numero: "3",
    capacidad: 6,
    tipo: "Regular",
    estado: "Reservada",
    ubicacion: "Esquina derecha",
    area: "Comedor Principal",
    fechaUltimaLimpieza: "2024-01-15T11:00:00Z",
    clienteActual: "Carlos Alberto Hernández",
    horaOcupacion: "2024-01-15T14:00:00Z",
  },
  {
    id: "01HKQM5X8P9R2T4V6W8Y0Z1A4M",
    numero: "4",
    capacidad: 4,
    tipo: "Terraza",
    estado: "Disponible",
    ubicacion: "Terraza exterior",
    area: "Terraza",
    fechaUltimaLimpieza: "2024-01-15T10:45:00Z",
  },
  {
    id: "01HKQM5X8P9R2T4V6W8Y0Z1A5M",
    numero: "5",
    capacidad: 8,
    tipo: "Regular",
    estado: "Limpieza",
    ubicacion: "Fondo del comedor",
    area: "Comedor Principal",
    fechaUltimaLimpieza: "2024-01-15T13:00:00Z",
  },
  {
    id: "01HKQM5X8P9R2T4V6W8Y0Z1AVP1",
    numero: "VIP-1",
    capacidad: 4,
    tipo: "VIP",
    estado: "Disponible",
    ubicacion: "Área privada",
    area: "Salón VIP",
    fechaUltimaLimpieza: "2024-01-15T11:30:00Z",
  },
  {
    id: "01HKQM5X8P9R2T4V6W8Y0Z1AVP2",
    numero: "VIP-2",
    capacidad: 6,
    tipo: "VIP",
    estado: "Ocupada",
    ubicacion: "Área privada con vista",
    area: "Salón VIP",
    fechaUltimaLimpieza: "2024-01-15T10:00:00Z",
    clienteActual: "Juan Carlos García",
    horaOcupacion: "2024-01-15T13:30:00Z",
  },
  {
    id: "01HKQM5X8P9R2T4V6W8Y0Z1AB1",
    numero: "B-1",
    capacidad: 2,
    tipo: "Barra",
    estado: "Ocupada",
    ubicacion: "Barra principal",
    area: "Barra",
    fechaUltimaLimpieza: "2024-01-15T09:00:00Z",
    clienteActual: "Roberto Sánchez",
    horaOcupacion: "2024-01-15T12:30:00Z",
  },
]

// Funciones auxiliares para obtener datos
export const obtenerClientePorId = (id: string): Cliente | undefined => {
  return mockClientes.find((cliente) => cliente.id === id)
}

export const obtenerProductoPorId = (id: string): ProductoMock | undefined => {
  return mockProductos.find((producto) => producto.id === id)
}

export const obtenerMesaPorId = (id: string): Mesa | undefined => {
  return mockMesas.find((mesa) => mesa.id === id)
}

export const obtenerProductosPorCategoria = (categoria: string): ProductoMock[] => {
  return mockProductos.filter((producto) => producto.categoria === categoria)
}

export const obtenerMesasDisponibles = (): Mesa[] => {
  return mockMesas.filter((mesa) => mesa.estado === "Disponible")
}

export const obtenerClientesActivos = (): Cliente[] => {
  return mockClientes.filter((cliente) => cliente.activo)
}

// Estadísticas
export const obtenerEstadisticasClientes = () => {
  const total = mockClientes.length
  const activos = mockClientes.filter((c) => c.activo).length
  const porNivel = mockClientes.reduce(
    (acc, cliente) => {
      acc[cliente.nivelFidelidad] = (acc[cliente.nivelFidelidad] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return {
    total,
    activos,
    porNivel,
  }
}

export const obtenerEstadisticasProductos = () => {
  const total = mockProductos.length
  const disponibles = mockProductos.filter((p) => p.disponible).length
  const favoritos = mockProductos.filter((p) => p.favorito).length
  const porCategoria = mockProductos.reduce(
    (acc, producto) => {
      acc[producto.categoria] = (acc[producto.categoria] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return {
    total,
    disponibles,
    favoritos,
    porCategoria,
  }
}

export const obtenerEstadisticasMesas = () => {
  const total = mockMesas.length
  const disponibles = mockMesas.filter((m) => m.estado === "Disponible").length
  const ocupadas = mockMesas.filter((m) => m.estado === "Ocupada").length
  const reservadas = mockMesas.filter((m) => m.estado === "Reservada").length
  const porTipo = mockMesas.reduce(
    (acc, mesa) => {
      acc[mesa.tipo] = (acc[mesa.tipo] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return {
    total,
    disponibles,
    ocupadas,
    reservadas,
    porTipo,
  }
}
