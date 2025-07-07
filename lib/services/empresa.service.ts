import type { Empresa } from "@/interfaces/database"

export class EmpresaService {
  static async getById(id: string): Promise<Empresa | null> {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock data
    return {
      EmpresaULID: id,
      NombreComercial: "Restaurante El Buen Sabor",
      RazonSocial: "El Buen Sabor S.A. de C.V.",
      RFC: "EBS123456789",
      Direccion: "Av. Principal 123, Col. Centro",
      Telefono: "555-0100",
      Email: "contacto@elbuensabor.com",
      SitioWeb: "www.elbuensabor.com",
      Logo: "/placeholder-logo.png",
      FechaCreacion: new Date("2023-01-01"),
      FechaActualizacion: new Date("2024-01-01"),
    }
  }

  static async getAll(): Promise<Empresa[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    return [
      {
        EmpresaULID: "01HKQR8X9M2N3P4Q5R6S7T8U9A",
        NombreComercial: "Restaurante El Buen Sabor",
        RazonSocial: "El Buen Sabor S.A. de C.V.",
        RFC: "EBS123456789",
        Direccion: "Av. Principal 123, Col. Centro",
        Telefono: "555-0100",
        Email: "contacto@elbuensabor.com",
        SitioWeb: "www.elbuensabor.com",
        Logo: "/placeholder-logo.png",
        FechaCreacion: new Date("2023-01-01"),
        FechaActualizacion: new Date("2024-01-01"),
      },
    ]
  }

  static async create(data: Partial<Empresa>): Promise<Empresa> {
    await new Promise((resolve) => setTimeout(resolve, 800))

    return {
      EmpresaULID: `01HKQR8X9M2N3P4Q5R6S7T8U9${Date.now()}`,
      NombreComercial: data.NombreComercial || "",
      RazonSocial: data.RazonSocial || "",
      RFC: data.RFC || "",
      Direccion: data.Direccion || "",
      Telefono: data.Telefono || "",
      Email: data.Email || "",
      SitioWeb: data.SitioWeb || "",
      Logo: data.Logo || "",
      FechaCreacion: new Date(),
      FechaActualizacion: new Date(),
    }
  }

  static async update(id: string, data: Partial<Empresa>): Promise<Empresa> {
    await new Promise((resolve) => setTimeout(resolve, 600))

    const existing = await this.getById(id)
    if (!existing) {
      throw new Error("Empresa no encontrada")
    }

    return {
      ...existing,
      ...data,
      FechaActualizacion: new Date(),
    }
  }

  static async delete(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return true
  }
}
