import { getSessionUser } from "@/lib/session";
import ProjetoPage from "./ProjetoPage";
import MockProjetoData from "./utils/MockProjetoData";
import { Projeto } from "./utils/Types";

interface ProjetoPageFetchProps {
  loading?: boolean;
}


export default async function ProjetoPageFetch({loading = false }: ProjetoPageFetchProps) {
let dados: Projeto = {} as Projeto;
const user = await getSessionUser() ;
 if (!user) {
    return null;
 }
if (!loading) {
    async function getProjetoData() {
        return MockProjetoData();
    }
    dados = await getProjetoData() as Projeto;
}

    return <ProjetoPage projeto={dados} user={user}/>;
}