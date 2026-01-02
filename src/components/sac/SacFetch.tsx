import { fetchApi } from "@/app/api/apiFetch";
import SacPageContent from "./SacPage";
import { Sac, TipoSac } from "./utils/Types";

export default async function SacFetch() {
    let dados: Sac[] = []
    let tipos_sac:TipoSac[] = []
    async function fetchSacData() {
        return await fetchApi({
            endpoint: `sac`,
            options: { method: "GET" },
        });
    }
    async function fetchTipoSac(){
        return await fetchApi({
            endpoint: `sac/TiposSac`,
            options: { method: "GET" },
        });
    }
    dados = await fetchSacData();
    tipos_sac = await fetchTipoSac();

    return <SacPageContent meusSacs={dados} tipos={tipos_sac} />;
}