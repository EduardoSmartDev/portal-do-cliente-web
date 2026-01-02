import { getSessionUser } from "@/lib/session";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminPage";
import { fetchApi } from "@/app/api/apiFetch";
import { Users } from "@/lib/Types";

// Exemplo: aqui você buscaria na sua API Nest (admin endpoints)
async function fetchAdminData() {
  const usuarios: Users[] = await fetchApi({
    endpoint: `admin/users`,
    options: { method: "GET" },
  });
  const obras:any[] = []
    const sacAbertos:any[] = []
    const projetos:any[] = []
    const documentos:any[] = []

  return { usuarios, obras, sacAbertos, projetos, documentos };
}

export default async function AdminFetch() {
  const user = await getSessionUser();
  if (!user?.admin) redirect("/home");

  const data = await fetchAdminData();
  return (
    <AdminDashboard
      user={user}
      usuarios={data.usuarios}
      obras={data.obras}
      sacAbertos={data.sacAbertos}
      projetos={data.projetos}
      documentos={data.documentos}
      initialView="usuarios"
    />
  );
}
