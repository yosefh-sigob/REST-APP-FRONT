# Sistema de Manejo de Rutas - REST-APP

## Descripción General

Este sistema proporciona un manejo robusto y centralizado de rutas para la aplicación REST-APP, garantizando que los usuarios sean dirigidos apropiadamente cuando acceden a rutas que no existen.

## Componentes Principales

### 1. Configuración de Rutas (`/lib/config/routes.ts`)
Archivo centralizado que define todas las rutas válidas de la aplicación organizadas por categorías:
- Rutas públicas
- Rutas del dashboard
- Rutas de gestión
- Rutas de administración

### 2. Páginas de Error
- **`/app/not-found.tsx`**: Página global para rutas no encontradas
- **`/app/(dashboard)/not-found.tsx`**: Página específica para rutas no encontradas dentro del dashboard
- **`/app/global-error.tsx`**: Manejo de errores globales del servidor

### 3. Hooks Personalizados
- **`useOptimizedNavigation`**: Navegación optimizada con validación de rutas
- **`useRouteValidation`**: Validación y manejo de rutas inválidas

### 4. Componentes Reutilizables
- **`RouteNotFound`**: Componente reutilizable para mostrar mensajes de página no encontrada
- **`RouteProtector`**: Componente de protección de rutas (opcional)

### 5. Middleware
El middleware intercepta todas las requests y:
- Valida rutas protegidas
- Redirige usuarios no autenticados
- Verifica tokens de autenticación

## Funcionalidades Implementadas

### ✅ Detección de Rutas Inválidas
- Cualquier ruta que no exista en el sistema muestra una página 404
- Validación centralizada de rutas válidas

### ✅ Redirección Inteligente
- Usuarios autenticados son dirigidos a `/main`
- Usuarios no autenticados son dirigidos a `/`
- Botón "Volver atrás" funcional

### ✅ Mensajes Amigables
- Interfaz consistente con el diseño de la aplicación
- Mensajes claros y útiles para el usuario
- Iconos descriptivos y colores temáticos

### ✅ Navegación Segura
- Validación de rutas antes de la navegación
- Prevención de navegación a rutas inválidas
- Fallback automático a rutas seguras

### ✅ Manejo de Errores
- Páginas específicas para diferentes tipos de errores
- Manejo de errores del servidor
- Logging de errores para debugging

## Uso

### Para Desarrolladores

#### 1. Agregar una Nueva Ruta
```typescript
// En /lib/config/routes.ts
export const APP_ROUTES = {
  // ...rutas existentes
  NEW_SECTION: {
    NEW_ROUTE: "/nueva-ruta",
  }
}

// Actualizar VALID_ROUTES
export const VALID_ROUTES: string[] = [
  // ...rutas existentes
  ...Object.values(APP_ROUTES.NEW_SECTION),
]
```

#### 2. Usar Navegación Segura
```typescript
import { useOptimizedNavigation } from "@/hooks/use-navigation"

function MyComponent() {
  const { navigateTo, navigateToHome, navigateBack } = useOptimizedNavigation()
  
  const handleNavigation = () => {
    navigateTo("/productos") // Validación automática
  }
  
  return (
    // Tu componente
  )
}
```

#### 3. Mostrar Página No Encontrada
```typescript
import { RouteNotFound } from "@/components/ui/route-not-found"

function CustomNotFound() {
  return (
    <RouteNotFound
      title="Sección no disponible"
      message="Esta funcionalidad estará disponible próximamente."
      showBackButton={true}
      showHomeButton={true}
    />
  )
}
```

### Para Usuarios Finales

#### Cuando Accedas a una Ruta Inválida:
1. **Verás una página amigable** con el mensaje "Página no encontrada"
2. **Tendrás opciones para**:
   - Volver atrás usando el botón "Volver atrás"
   - Ir al inicio usando el botón "Ir al inicio"
3. **El sistema te dirigirá**:
   - Al dashboard principal si estás autenticado
   - A la página de login si no estás autenticado

## Flujo de Manejo de Rutas

```
Usuario accede a ruta inválida
         ↓
¿Ruta existe en VALID_ROUTES?
         ↓ No
Middleware intercepta
         ↓
¿Ruta protegida sin auth?
         ↓ Sí
Redirige a /acceso-denegado
         ↓ No
Muestra página not-found.tsx
         ↓
Usuario tiene opciones:
- Volver atrás
- Ir al inicio
```

## Configuración del Middleware

El middleware está configurado para interceptar todas las rutas excepto:
- Rutas de API (`/api/*`)
- Archivos estáticos (`/_next/static/*`)
- Optimización de imágenes (`/_next/image/*`)
- Favicon
- Carpeta pública

## Próximas Mejoras

- [ ] Analytics de rutas no encontradas
- [ ] Sugerencias de rutas similares
- [ ] Historial de navegación mejorado
- [ ] Modo offline con cache de rutas

## Notas Técnicas

- **Next.js 14**: Utiliza las últimas características de App Router
- **TypeScript**: Tipado estricto para prevención de errores
- **Tailwind CSS**: Estilos consistentes con el resto de la aplicación
- **Server-side**: Validación tanto en cliente como servidor

---

**Autor**: Sistema de Gestión REST-APP  
**Fecha**: Julio 2025  
**Versión**: 1.0.0
