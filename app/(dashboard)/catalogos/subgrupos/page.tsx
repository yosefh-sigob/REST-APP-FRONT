import { getSubgrupos, getGrupos } from "@/actions/catalogos.actions"
import { SubgruposView } from "@/components/catalogos/subgrupos/subgrupos-view"

export default async function SubgruposPage() {
  const [subgrupos, grupos] = await Promise.all([getSubgrupos(), getGrupos()])

  return <SubgruposView subgrupos={subgrupos} grupos={grupos} />
}
