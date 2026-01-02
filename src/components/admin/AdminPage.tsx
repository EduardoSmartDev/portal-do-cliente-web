"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
  Users,
  Building2,
  Wrench,
  TrendingUp,
  FileSpreadsheet,
  Shield,
  Search,
} from "lucide-react";
import { AdminDashboardProps, AdminView } from "./utils/Types";


export default function AdminDashboard(props: AdminDashboardProps) {
    console.log(props);
  const [active, setActive] = useState<AdminView>(props.initialView ?? "usuarios");
  const [q, setQ] = useState("");

  const sidebarItems = useMemo(
    () => [
      { key: "usuarios" as const, label: "Usuários", icon: Users },
      { key: "obras" as const, label: "Obras", icon: Building2 },
      { key: "sac" as const, label: "SAC abertos", icon: Wrench },
      { key: "projetos" as const, label: "Projetos", icon: TrendingUp },
      { key: "documentos" as const, label: "Documentos", icon: FileSpreadsheet },
    ],
    []
  );

  // Helpers de filtro
  const s = q.trim().toLowerCase();
  const includes = (text?: string | number | null) =>
    String(text ?? "").toLowerCase().includes(s);

  const filtered = useMemo(() => {
    if (!s) {
      return {
        usuarios: props.usuarios,
        obras: props.obras,
        sac: props.sacAbertos,
        projetos: props.projetos,
        documentos: props.documentos,
      };
    }

    return {
      usuarios: props.usuarios.filter(
        (u) => includes(u.nome) || includes(u.email) || includes(u.id) || includes(u.celular)
      ),
      obras: props.obras.filter(
        (o) => includes(o.nome) || includes(o.clienteNome) || includes(o.status) || includes(o.id)
      ),
      sac: props.sacAbertos.filter(
        (t) => includes(t.assunto) || includes(t.clienteNome) || includes(t.status) || includes(t.id)
      ),
      projetos: props.projetos.filter(
        (p) => includes(p.nome) || includes(p.clienteNome) || includes(p.etapa) || includes(p.id)
      ),
      documentos: props.documentos.filter(
        (d) => includes(d.nome) || includes(d.tipo) || includes(d.userNome) || includes(d.userId)
      ),
    };
  }, [s, props]);

  const titleMap: Record<AdminView, string> = {
    usuarios: "Usuários",
    obras: "Obras",
    sac: "SAC abertos",
    projetos: "Projetos",
    documentos: "Documentos",
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-orange-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* SIDEBAR */}
          <aside className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="bg-linear-to-r from-gray-700 to-gray-600 px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-orange-200" />
                </div>
                <div>
                  <p className="text-white font-semibold leading-tight">Admin</p>
                  <p className="text-xs text-orange-200">Portal do Cliente</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-orange-500 text-white flex items-center justify-center overflow-hidden font-semibold">
                  {props.user.foto ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/clientes/${props.user.foto}`}
                      width={40}
                      height={40}
                      alt="Foto do admin"
                      className="h-10 w-10 object-cover"
                    />
                  ) : (
                    props.user.nome?.charAt(0)?.toUpperCase()
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-white font-medium truncate">{props.user.nome}</p>
                  <p className="text-xs text-gray-200 truncate">{props.user.email}</p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Navegação
              </p>

              <div className="mt-3 space-y-2">
                {sidebarItems.map((it) => {
                  const Icon = it.icon;
                  const isActive = active === it.key;

                  return (
                    <button
                      key={it.key}
                      type="button"
                      onClick={() => setActive(it.key)}
                      className={[
                        "w-full flex items-center gap-3 rounded-lg border px-3 py-2 text-sm transition text-left",
                        isActive
                          ? "border-orange-300 bg-orange-50 text-orange-700"
                          : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700",
                      ].join(" ")}
                    >
                      <div className="rounded-md bg-gray-700 p-2">
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-semibold">{it.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* CONTENT */}
          <main className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 px-5 py-4 flex items-center justify-between gap-3">
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{titleMap[active]}</h1>
                <p className="text-sm text-gray-500">
                  Visualização administrativa (dados globais).
                </p>
              </div>

              <div className="relative w-full max-w-sm">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Buscar nesta listagem..."
                  className="w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <Search className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div className="p-5">
              {active === "usuarios" && <UsuariosTable rows={filtered.usuarios} />}
              {active === "obras" && <ObrasTable rows={filtered.obras} />}
              {active === "sac" && <SacTable rows={filtered.sac} />}
              {active === "projetos" && <ProjetosTable rows={filtered.projetos} />}
              {active === "documentos" && <DocumentosTable rows={filtered.documentos} />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ===== Tabelas (simples) ===== */

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}

function TableShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full text-sm">{children}</table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 bg-gray-50 border-b border-gray-200">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-3 py-2 border-b border-gray-100 text-gray-800">{children}</td>;
}

function UsuariosTable({ rows }: { rows: any[] }) {
  if (!rows.length) return <EmptyState text="Nenhum usuário encontrado." />;

  return (
    <TableShell>
      <thead>
        <tr>
          <Th>ID</Th>
          <Th>Nome</Th>
          <Th>E-mail</Th>
          <Th>Celular</Th>
          <Th>Ultimo Login</Th>
          <Th>Admin</Th>
        </tr>
      </thead>
      <tbody>
        {rows.map((u) => (
          <tr key={u.id} className="hover:bg-orange-50/40">
            <Td>{u.id}</Td>
            <Td>{u.nome}</Td>
            <Td>{u.email}</Td>
            <Td>{u.celular}</Td>
            <Td>{u.last_login ? new Date(u.last_login).toLocaleString() : "-"}</Td>
            <Td>
              <span
                className={[
                  "inline-flex rounded-full px-2 py-0.5 text-xs font-semibold",
                  u.admin ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-700",
                ].join(" ")}
              >
                {u.admin ? "Sim" : "Não"}
              </span>
            </Td>
          </tr>
        ))}
      </tbody>
    </TableShell>
  );
}

function ObrasTable({ rows }: { rows: any[] }) {
  if (!rows.length) return <EmptyState text="Nenhuma obra encontrada." />;

  return (
    <TableShell>
      <thead>
        <tr>
          <Th>ID</Th>
          <Th>Obra</Th>
          <Th>Cliente</Th>
          <Th>Status</Th>
        </tr>
      </thead>
      <tbody>
        {rows.map((o) => (
          <tr key={o.id} className="hover:bg-orange-50/40">
            <Td>{o.id}</Td>
            <Td>{o.nome}</Td>
            <Td>{o.clienteNome}</Td>
            <Td>{o.status}</Td>
          </tr>
        ))}
      </tbody>
    </TableShell>
  );
}

function SacTable({ rows }: { rows: any[] }) {
  if (!rows.length) return <EmptyState text="Nenhum chamado aberto encontrado." />;

  return (
    <TableShell>
      <thead>
        <tr>
          <Th>ID</Th>
          <Th>Assunto</Th>
          <Th>Cliente</Th>
          <Th>Status</Th>
        </tr>
      </thead>
      <tbody>
        {rows.map((t) => (
          <tr key={t.id} className="hover:bg-orange-50/40">
            <Td>{t.id}</Td>
            <Td>{t.assunto}</Td>
            <Td>{t.clienteNome}</Td>
            <Td>{t.status}</Td>
          </tr>
        ))}
      </tbody>
    </TableShell>
  );
}

function ProjetosTable({ rows }: { rows: any[] }) {
  if (!rows.length) return <EmptyState text="Nenhum projeto encontrado." />;

  return (
    <TableShell>
      <thead>
        <tr>
          <Th>ID</Th>
          <Th>Projeto</Th>
          <Th>Cliente</Th>
          <Th>Etapa</Th>
        </tr>
      </thead>
      <tbody>
        {rows.map((p) => (
          <tr key={p.id} className="hover:bg-orange-50/40">
            <Td>{p.id}</Td>
            <Td>{p.nome}</Td>
            <Td>{p.clienteNome}</Td>
            <Td>{p.etapa}</Td>
          </tr>
        ))}
      </tbody>
    </TableShell>
  );
}

function DocumentosTable({ rows }: { rows: any[] }) {
  if (!rows.length) return <EmptyState text="Nenhum documento encontrado." />;

  return (
    <TableShell>
      <thead>
        <tr>
          <Th>ID</Th>
          <Th>Documento</Th>
          <Th>Tipo</Th>
          <Th>Usuário</Th>
        </tr>
      </thead>
      <tbody>
        {rows.map((d) => (
          <tr key={d.id} className="hover:bg-orange-50/40">
            <Td>{d.id}</Td>
            <Td>{d.nome}</Td>
            <Td>{d.tipo}</Td>
            <Td>
              {d.userNome} <span className="text-xs text-gray-500">(#{d.userId})</span>
            </Td>
          </tr>
        ))}
      </tbody>
    </TableShell>
  );
}
