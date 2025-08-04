"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Wrench } from "lucide-react"
import Link from "next/link"

interface PlaceholderViewProps {
  title: string
}

export function PlaceholderView({ title }: PlaceholderViewProps) {
  return (
    <div className="p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center h-[60vh]">
      <Wrench className="h-16 w-16 text-gray-400 mb-4" />
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground mb-6">Esta sección está en construcción. ¡Vuelve pronto!</p>
      <Link href="/catalogos">
        <Button>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Catálogos
        </Button>
      </Link>
    </div>
  )
}
