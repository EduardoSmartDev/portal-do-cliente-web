import { getSessionUser } from "@/lib/session";
import FinanceiroPage from "./FinanceiroPage";
import MockFinanceiroData from "./utils/MockFinanceiroData";
import { Documento } from "./utils/Types";

export default async function FinanceiroFetch() {

  const user = await getSessionUser() ;
  if (!user) {
    return null;
  }
  async function getFinanceiroData() {
    return MockFinanceiroData();
  }
  const dados: Documento[] = await getFinanceiroData();

  return <FinanceiroPage documentos={dados} user={user}/>;
}
