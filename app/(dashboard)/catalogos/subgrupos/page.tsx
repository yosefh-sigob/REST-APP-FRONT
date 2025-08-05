import { getSubgrupos, getGrupos } from "@/actions/catalogos.actions"
import { SubgruposView } from "@/components/catalogos/subgrupos/subgrupos-view"

export default async function SubgruposPage() {
  const [subgruposResponse, gruposResponse] = await Promise.all([getSubgrupos(), getGrupos()])

  return <SubgruposView subgrupos={subgruposResponse.data} grupos={gruposResponse.data} />
}
