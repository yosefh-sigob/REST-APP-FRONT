"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { LicenseType } from "@/utils/license"

interface LicenseContextType {
  currentLicense: LicenseType
  setLicense: (license: LicenseType) => void
}

const LicenseContext = createContext<LicenseContextType | undefined>(undefined)

interface LicenseProviderProps {
  children: ReactNode
}

export function LicenseProvider({ children }: LicenseProviderProps) {
  const [currentLicense, setCurrentLicense] = useState<LicenseType>("Gratis")

  useEffect(() => {
    // Cargar licencia desde localStorage al montar el componente
    const savedLicense = localStorage.getItem("restaurant-license")
    if (savedLicense && ["Gratis", "Lite", "Pro", "Franquicia"].includes(savedLicense)) {
      setCurrentLicense(savedLicense as LicenseType)
    }
  }, [])

  const setLicense = (license: LicenseType) => {
    setCurrentLicense(license)
    localStorage.setItem("restaurant-license", license)
  }

  return <LicenseContext.Provider value={{ currentLicense, setLicense }}>{children}</LicenseContext.Provider>
}

export function useLicense() {
  const context = useContext(LicenseContext)
  if (context === undefined) {
    throw new Error("useLicense must be used within a LicenseProvider")
  }
  return context
}
