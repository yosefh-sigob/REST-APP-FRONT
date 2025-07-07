import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <div className="text-center space-y-4 max-w-md">
        <div className="flex justify-center">
          <FileQuestion className="h-16 w-16 text-orange-500" />
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-900">
          Página no encontrada
        </h2>
        
        <p className="text-gray-600">
          La página que buscas no existe o ha sido movida.
        </p>
        
        <div className="flex gap-3 justify-center">
          <Button asChild className="bg-orange-600 hover:bg-orange-700">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
