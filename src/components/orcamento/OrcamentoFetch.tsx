import { getSessionUser } from "@/lib/session";
import OrcamentoPage from "./OrcamentoPage";
import MockOrcamentoData from "./utils/MockOrcamentoData";
import { Orcamento } from "./utils/Types";

interface OrcamentoFetchProps {
  loading?: boolean;
}

export default async function OrcamentoFetch({ loading = false }: OrcamentoFetchProps) {
 let dados:Orcamento[] = [];
 const user = await getSessionUser() ;
 if (!user) {
    return null;
 }
 if (!loading) {
     async function getOrcamentoData() {    
        return MockOrcamentoData();
     }
        dados = await getOrcamentoData();
    }
    return <OrcamentoPage orcamentos={dados} user={user}/>;
}