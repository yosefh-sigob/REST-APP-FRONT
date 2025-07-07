export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result)
      } else {
        reject(new Error("Failed to convert file to base64"))
      }
    }
    reader.onerror = (error) => reject(error)
  })
}

export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "Formato no válido. Solo se permiten archivos JPG, PNG y WebP.",
    }
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: "El archivo es muy grande. Máximo 5MB.",
    }
  }

  return { isValid: true }
}

export const getImageSrc = (base64String?: string): string => {
  if (!base64String) {
    return "/placeholder.svg?height=200&width=200&text=Sin+Imagen"
  }

  // Si ya es una URL completa de base64, la devolvemos tal como está
  if (base64String.startsWith("data:image/")) {
    return base64String
  }

  // Si es solo el string base64 sin el prefijo, lo agregamos
  return `data:image/jpeg;base64,${base64String}`
}

export const compressImage = (file: File, maxWidth = 800, quality = 0.8): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      // Calcular nuevas dimensiones manteniendo la proporción
      let { width, height } = img

      if (width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }

      canvas.width = width
      canvas.height = height

      // Dibujar la imagen redimensionada
      ctx?.drawImage(img, 0, 0, width, height)

      // Convertir a base64 con compresión
      const compressedBase64 = canvas.toDataURL("image/jpeg", quality)
      resolve(compressedBase64)
    }

    img.onerror = () => reject(new Error("Error al procesar la imagen"))
    img.src = URL.createObjectURL(file)
  })
}
