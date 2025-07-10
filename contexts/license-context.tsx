"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type LicenseType = "gratis" | "lite" | "pro" | "franquicia"

interface LicenseContextType {
  currentLicense: LicenseType
  setLicense: (license: LicenseType) => void
  hasAccess: (requiredLicense: LicenseType) => boolean
}

const licenseHierarchy: Record<LicenseType, number> = {
  gratis: 0,
  lite: 1,
  pro: 2,
  franquicia: 3,
}

const LicenseContext = createContext<LicenseContextType | undefined>(undefined)

export function LicenseProvider({ children }: { children: React.ReactNode }) {
  const [currentLicense, setCurrentLicense] = useState<LicenseType>("pro")

  const setLicense = (license: LicenseType) => {
    setCurrentLicense(license)
  }

  const hasAccess = (requiredLicense: LicenseType): boolean => {
    return licenseHierarchy[currentLicense] >= licenseHierarchy[requiredLicense]
  }

  return (
    <LicenseContext.Provider
      value={{
        currentLicense,
        setLicense,
        hasAccess,
      }}
    >
      {children}
    </LicenseContext.Provider>
  )
}

export function useLicense() {
  const context = useContext(LicenseContext)
  if (context === undefined) {
    throw new Error("useLicense debe ser usado dentro de un LicenseProvider")
  }
  return context
}
