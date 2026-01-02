import { fetchApi } from "@/app/api/apiFetch";
import { User } from "./utils/Types";
import MeusDadosPage from "./MeusDadosPage";

interface HomeFetchProps {
  loading?: boolean;
}

export async function MeusDadosFetch({ loading = false }: HomeFetchProps) {
  let dados: User = {} as User;

  if (!loading) {
    async function getUserData() {
      return await fetchApi({
        endpoint: `user/getUserData`,
        options: { method: "GET" },
      });
    }
    dados = await getUserData() as User;
  }

  return <MeusDadosPage dados={dados} />;
}
