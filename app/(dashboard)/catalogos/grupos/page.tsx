import { getGrupos } from "@/actions/catalogos.actions"
import { GruposView } from "@/components/catalogos/grupos/grupos-view"

export default async function GruposPage() {
  try {
    const response = await getGrupos()
    return <GruposView grupos={response.data} />
  } catch (error) {
    console.error("Error loading grupos:", error)
    return <GruposView grupos={[]} />
  }
}
