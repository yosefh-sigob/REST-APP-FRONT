// Generador simple de ULID para el frontend
export function generateULID(): string {
  const timestamp = Date.now().toString(36)
  const randomPart = Math.random().toString(36).substring(2, 15)
  return `${timestamp}${randomPart}`.toUpperCase()
}

export function isValidULID(ulid: string): boolean {
  return typeof ulid === "string" && ulid.length >= 10 && ulid.length <= 26
}

export function getULIDTimestamp(ulid: string): Date | null {
  try {
    const timestampPart = ulid.substring(0, 10)
    const timestamp = Number.parseInt(timestampPart, 36)
    return new Date(timestamp)
  } catch {
    return null
  }
}
