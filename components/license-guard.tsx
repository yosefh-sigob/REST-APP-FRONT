"use client"

import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Crown, ArrowUp } from "lucide-react"
import { useLicense } from "@/contexts/license-context"
import { hasAccess, FEATURES, getUpgradeMessage } from "@/utils/license"

interface LicenseGuardProps {
  feature: string
  children: ReactNode
  fallback?: ReactNode | null
  showUpgrade?: boolean
}

export function LicenseGuard({ feature, children, fallback, showUpgrade = true }: LicenseGuardProps) {
  const { currentLicense } = useLicense()

  const featureConfig = FEATURES[feature]
  if (!featureConfig) {
    // Si no existe la configuración de la feature, permitir acceso
    return <>{children}</>
  }

  const hasFeatureAccess = hasAccess(currentLicense, featureConfig.requiredLicense)

  if (hasFeatureAccess) {
    return <>{children}</>
  }

  // Si se especifica fallback como null, no mostrar nada
  if (fallback === null) {
    return null
  }

  // Si hay un fallback personalizado, usarlo
  if (fallback !== undefined) {
    return <>{fallback}</>
  }

  // Mostrar mensaje de upgrade por defecto
  if (!showUpgrade) {
    return null
  }

  return (
    <Card className="border-2 border-dashed border-amber-200 bg-amber-50/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2 text-amber-800">
          <Lock className="h-5 w-5" />
          Funcionalidad Bloqueada
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-amber-300 text-amber-700">
              <Crown className="h-3 w-3 mr-1" />
              Requiere: {featureConfig.requiredLicense}
            </Badge>
            <Badge variant="outline" className="border-gray-300 text-gray-600">
              Actual: {currentLicense}
            </Badge>
          </div>

          <p className="text-sm text-amber-700">
            {getUpgradeMessage(featureConfig.name, featureConfig.requiredLicense)}
          </p>

          <Button
            size="sm"
            className="bg-amber-600 hover:bg-amber-700 text-white"
            onClick={() => {
              // En una app real, esto abriría el modal de upgrade o redirigiría a billing
              console.log(`Upgrade to ${featureConfig.requiredLicense} requested`)
            }}
          >
            <ArrowUp className="h-4 w-4 mr-2" />
            Actualizar a {featureConfig.requiredLicense}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
