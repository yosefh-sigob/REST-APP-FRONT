"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Check, Crown, Star, Zap, Building2, Info } from "lucide-react"
import type { LicenseType } from "@/utils/license"

interface LicenseSelectorProps {
  currentLicense: LicenseType
  onLicenseChange: (license: LicenseType) => void
}

const LICENSE_CONFIG = {
  Gratis: {
    name: "Gratis",
    price: "$0",
    color: "bg-gray-500",
    icon: <Info className="h-4 w-4" />,
    features: ["Dashboard básico", "Hasta 5 productos", "1 usuario", "Soporte básico"],
    limitations: ["Sin edición avanzada", "Sin reportes", "Sin integración POS"],
  },
  Lite: {
    name: "Lite",
    price: "$29",
    color: "bg-blue-500",
    icon: <Zap className="h-4 w-4" />,
    features: ["Todo lo de Gratis", "Gestión de productos", "Hasta 100 productos", "3 usuarios", "Reportes básicos"],
    limitations: ["Sin integración avanzada", "Sin multi-sucursal"],
  },
  Pro: {
    name: "Pro",
    price: "$79",
    color: "bg-purple-500",
    icon: <Star className="h-4 w-4" />,
    features: [
      "Todo lo de Lite",
      "Productos ilimitados",
      "10 usuarios",
      "Reportes avanzados",
      "Integración POS",
      "Multi-usuario",
    ],
    limitations: ["Sin multi-sucursal"],
  },
  Franquicia: {
    name: "Franquicia",
    price: "$199",
    color: "bg-orange-500",
    icon: <Building2 className="h-4 w-4" />,
    features: [
      "Todo lo de Pro",
      "Multi-sucursal",
      "Usuarios ilimitados",
      "Dashboard corporativo",
      "API completa",
      "Soporte 24/7",
    ],
    limitations: [],
  },
}

export function LicenseSelector({ currentLicense, onLicenseChange }: LicenseSelectorProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Card className="border-2 border-dashed border-orange-200 bg-orange-50/50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Crown className="h-5 w-5 text-orange-600" />
          Plan Actual: {LICENSE_CONFIG[currentLicense].name}
          <Badge className={`${LICENSE_CONFIG[currentLicense].color} text-white`}>
            {LICENSE_CONFIG[currentLicense].icon}
            {LICENSE_CONFIG[currentLicense].price}/mes
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(LICENSE_CONFIG).map(([key, config]) => (
            <Button
              key={key}
              variant={currentLicense === key ? "default" : "outline"}
              size="sm"
              onClick={() => onLicenseChange(key as LicenseType)}
              className={currentLicense === key ? `${config.color} text-white` : ""}
            >
              {config.icon}
              {config.name}
              {currentLicense === key && <Check className="h-3 w-3 ml-1" />}
            </Button>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">Cambia de plan para probar diferentes funcionalidades</p>
          <Dialog open={showDetails} onOpenChange={setShowDetails}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                Ver comparación
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Comparación de Planes</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(LICENSE_CONFIG).map(([key, config]) => (
                  <Card key={key} className={currentLicense === key ? "ring-2 ring-orange-500" : ""}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {config.icon}
                        {config.name}
                      </CardTitle>
                      <div className="text-2xl font-bold">{config.price}</div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <h4 className="font-semibold text-green-600 mb-1">Incluye:</h4>
                          {config.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <Check className="h-3 w-3 text-green-500" />
                              {feature}
                            </div>
                          ))}
                        </div>
                        {config.limitations.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-red-600 mb-1">Limitaciones:</h4>
                            {config.limitations.map((limitation, index) => (
                              <div key={index} className="text-sm text-red-600">
                                • {limitation}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <Button
                        className="w-full mt-4"
                        variant={currentLicense === key ? "secondary" : "default"}
                        onClick={() => {
                          onLicenseChange(key as LicenseType)
                          setShowDetails(false)
                        }}
                      >
                        {currentLicense === key ? "Plan Actual" : "Seleccionar"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}
