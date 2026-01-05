import ProjetoPage from "./ProjetoPage";
import MockProjetoData from "./utils/MockProjetoData";
import { Projeto } from "./utils/Types";

interface ProjetoPageFetchProps {
  loading?: boolean;
}


export default async function ProjetoPageFetch({loading = false }: ProjetoPageFetchProps) {
let dados: Projeto = {} as Projeto;
if (!loading) {
    async function getProjetoData() {
        return MockProjetoData();
    }
    dados = await getProjetoData() as Projeto;
}

    return <ProjetoPage projeto={dados} />;
}