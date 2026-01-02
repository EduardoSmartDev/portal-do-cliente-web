"use client";

import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MessageSquarePlus,
  ListChecks,
  Send,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react"; // ajuste o path
import { Sac, TipoSac } from "./utils/Types";
import { createSacSchema, CreateSacValues } from "./utils/CreateFormValidator";

interface SacPageProps {
  tipos: TipoSac[];
  meusSacs: Sac[];
}

type TabKey = "novo" | "meus";

export default function SacPage({ tipos, meusSacs }: SacPageProps) {
  const [tab, setTab] = useState<TabKey>("novo");
  const [msg, setMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // lista local (pra você conseguir ver o novo SAC entrar sem recarregar)
  const [lista, setLista] = useState<Sac[]>(meusSacs ?? []);

  // filtros da listagem
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "todos" | "aberto" | "andamento" | "fechado"
  >("todos");

  const defaultValues: CreateSacValues = useMemo(
    () => ({
      assunto_id: tipos?.[0]?.id ?? 0,
      mensagem: "",
    }),
    [tipos]
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CreateSacValues>({
    resolver: zodResolver(createSacSchema) as any,
    defaultValues,
    mode: "onBlur",
  });
  const files = watch("arquivos");

  const onSubmit = async (values: CreateSacValues) => {
    setMsg(null);

    try {
      const payload = {
        assunto_id: values.assunto_id,
        mensagem: values.mensagem.trim(),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sac`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(t || "Falha ao abrir chamado.");
      }

      // se seu backend retornar o SAC criado, ótimo:
      const created: Sac | null = await res.json().catch(() => null);

      setMsg({ type: "success", text: "Chamado aberto com sucesso!" });

      reset({ ...defaultValues, mensagem: "" }, { keepDirty: false });

      // atualiza listagem local
      if (created) {
        setLista((prev) => [created, ...prev]);
      } else {
        // se não retorna, só troca para a aba "meus"
        // e o usuário vai ver a lista do SSR (ou você pode refetch depois)
      }

      setTab("meus");
    } catch (err: any) {
      setMsg({ type: "error", text: err?.message ?? "Erro inesperado." });
    }
  };

  const filteredLista = useMemo(() => {
    const s = q.trim().toLowerCase();

    const statusNorm = (sac: Sac) => {
      const d = (sac.status_sac?.descricao ?? "").toLowerCase();
      if (d.includes("abert")) return "aberto";
      if (d.includes("and") || d.includes("prog") || d.includes("atend"))
        return "andamento";
      if (d.includes("fech") || d.includes("resolv") || d.includes("concl"))
        return "fechado";
      return "aberto";
    };

    return (lista ?? []).filter((item) => {
      const okStatus =
        statusFilter === "todos" ? true : statusNorm(item) === statusFilter;

      const okSearch =
        !s ||
        String(item.id).includes(s) ||
        (item.tipo_sac?.descricao ?? "").toLowerCase().includes(s) ||
        (item.status_sac?.descricao ?? "").toLowerCase().includes(s) ||
        (item.mensagem ?? "").toLowerCase().includes(s);

      return okStatus && okSearch;
    });
  }, [lista, q, statusFilter]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-orange-50">
      {/* Header */}
      <header className="bg-linear-to-r from-gray-700 to-gray-600 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Logo + Title */}
            <div className="flex items-center space-x-4">
              <div className="bg-white p-2 rounded-lg">
                <div className="flex flex-col space-y-1">
                  <div className="h-2 w-16 bg-gray-500"></div>
                  <div className="h-2 w-16 bg-orange-500"></div>
                  <div className="h-2 w-16 bg-gray-600"></div>
                </div>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  SAC - Atendimento
                </h1>
                <p className="mt-1 text-sm text-orange-300">
                  Abra um chamado e acompanhe o andamento.
                </p>
              </div>
            </div>

            {/* Middle/Right: Tabs (fica no topo em telas pequenas) */}
            <div className="hidden md:flex rounded-lg bg-white/10 p-1">
              <button
                type="button"
                onClick={() => setTab("novo")}
                className={[
                  "px-3 py-2 text-sm font-semibold rounded-md transition flex items-center gap-2",
                  tab === "novo"
                    ? "bg-white text-gray-900"
                    : "text-white/80 hover:text-white",
                ].join(" ")}
              >
                <MessageSquarePlus className="h-4 w-4" />
                Abrir SAC
              </button>
              <button
                type="button"
                onClick={() => setTab("meus")}
                className={[
                  "px-3 py-2 text-sm font-semibold rounded-md transition flex items-center gap-2",
                  tab === "meus"
                    ? "bg-white text-gray-900"
                    : "text-white/80 hover:text-white",
                ].join(" ")}
              >
                <ListChecks className="h-4 w-4" />
                Meus chamados
              </button>
            </div>


          </div>

          {/* Tabs para mobile */}
          <div className="mt-4 md:hidden">
            <div className="flex rounded-lg bg-white/10 p-1 w-full">
              <button
                type="button"
                onClick={() => setTab("novo")}
                className={[
                  "flex-1 px-3 py-2 text-sm font-semibold rounded-md transition flex items-center justify-center gap-2",
                  tab === "novo"
                    ? "bg-white text-gray-900"
                    : "text-white/80 hover:text-white",
                ].join(" ")}
              >
                <MessageSquarePlus className="h-4 w-4" />
                Abrir SAC
              </button>
              <button
                type="button"
                onClick={() => setTab("meus")}
                className={[
                  "flex-1 px-3 py-2 text-sm font-semibold rounded-md transition flex items-center justify-center gap-2",
                  tab === "meus"
                    ? "bg-white text-gray-900"
                    : "text-white/80 hover:text-white",
                ].join(" ")}
              >
                <ListChecks className="h-4 w-4" />
                Meus chamados
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {msg && (
          <div
            className={[
              "mb-4 rounded-lg border px-4 py-3 text-sm",
              msg.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-800",
            ].join(" ")}
          >
            {msg.text}
          </div>
        )}

        {tab === "novo" ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-5 sm:p-6 space-y-6"
            >
              <section className="space-y-2">
                <h2 className="text-sm font-semibold text-gray-900">
                  Tipo / Assunto
                </h2>
                <p className="text-xs text-gray-500">
                  Selecione a categoria do seu chamado.
                </p>

                <div>
                  <label className="text-xs text-gray-600">Selecione</label>
                  <select
                    {...register("assunto_id")}
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value={0}>Selecione um tipo</option>
                    {tipos.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.descricao}
                      </option>
                    ))}
                  </select>
                  {errors.assunto_id && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.assunto_id.message}
                    </p>
                  )}
                </div>
              </section>

              <section className="space-y-2">
                <h2 className="text-sm font-semibold text-gray-900">
                  Mensagem
                </h2>
                <p className="text-xs text-gray-500">
                  Descreva sua solicitação com detalhes (prazos, endereço,
                  contexto, etc).
                </p>

                <div>
                  <label className="text-xs text-gray-600">Descrição</label>
                  <textarea
                    {...register("mensagem")}
                    rows={6}
                    className="mt-1 w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Ex.: Preciso de suporte para..."
                  />
                  {errors.mensagem && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.mensagem.message}
                    </p>
                  )}
                </div>
              </section>
              <section className="space-y-2">
                <h2 className="text-sm font-semibold text-gray-900">
                  Anexos (opcional)
                </h2>
                <p className="text-xs text-gray-500">
                  Você pode anexar até 5 arquivos (PDF, PNG, JPG, WEBP) com até
                  10MB cada.
                </p>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <label className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      {...register("arquivos")}
                    />
                    Selecionar arquivos
                  </label>

                  {errors.arquivos && (
                    <p className="mt-2 text-xs text-red-600">
                      {String(errors.arquivos.message)}
                    </p>
                  )}

                  {!!files?.length && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs font-semibold text-gray-700">
                        Arquivos selecionados:
                      </p>
                      <ul className="space-y-1">
                        {Array.from(files as FileList).map((f, idx) => (
                          <li
                            key={`${f.name}-${idx}`}
                            className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
                          >
                            <span className="truncate text-gray-800">
                              {f.name}
                            </span>
                            <span className="ml-3 text-xs text-gray-500">
                              {(f.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </li>
                        ))}
                      </ul>

                      <button
                        type="button"
                        onClick={() =>
                          reset(
                            { ...watch(), arquivos: undefined },
                            { keepDirty: true }
                          )
                        }
                        className="text-xs font-semibold text-gray-600 hover:text-gray-900"
                      >
                        Remover anexos
                      </button>
                    </div>
                  )}
                </div>
              </section>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    reset(defaultValues, { keepDirty: false });
                    setMsg(null);
                  }}
                  disabled={isSubmitting}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                >
                  Limpar
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || !isDirty}
                  className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Enviando..." : "Abrir chamado"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <MeusSacsList
            sacs={filteredLista}
            q={q}
            setQ={setQ}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        )}
      </main>
    </div>
  );
}

/* ===== Listagem ===== */

function Badge({ text }: { text: string }) {
  const d = text.toLowerCase();

  const variant = d.includes("abert")
    ? "aberto"
    : d.includes("fech") || d.includes("resolv")
    ? "fechado"
    : "andamento";

  const cls =
    variant === "aberto"
      ? "bg-orange-100 text-orange-800 border-orange-200"
      : variant === "fechado"
      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
      : "bg-gray-100 text-gray-800 border-gray-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${cls}`}
    >
      {text}
    </span>
  );
}

function MeusSacsList({
  sacs,
  q,
  setQ,
  statusFilter,
  setStatusFilter,
}: {
  sacs: Sac[];
  q: string;
  setQ: (v: string) => void;
  statusFilter: "todos" | "aberto" | "andamento" | "fechado";
  setStatusFilter: (v: "todos" | "aberto" | "andamento" | "fechado") => void;
}) {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">Meus chamados</h2>
          <p className="text-xs text-gray-500">
            Acompanhe o histórico e status.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por ID, tipo, status..."
              className="w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full sm:w-44 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="todos">Todos</option>
            <option value="aberto">Abertos</option>
            <option value="andamento">Em andamento</option>
            <option value="fechado">Fechados</option>
          </select>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-3">
        {sacs.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
            <p className="text-sm text-gray-600">Nenhum SAC encontrado.</p>
          </div>
        ) : (
          sacs.map((sac) => {
            const isOpen = openId === sac.id;

            return (
              <div
                key={sac.id}
                className="rounded-lg border border-gray-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : sac.id)}
                  className="w-full px-4 py-3 flex items-center justify-between gap-3 text-left hover:bg-gray-50 transition"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-gray-900">
                        #{sac.id}
                      </span>
                      <Badge text={sac.status_sac?.descricao ?? "—"} />
                      <span className="text-xs text-gray-500">
                        {sac.tipo_sac?.descricao ?? "Tipo não informado"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-600 line-clamp-1">
                      {sac.mensagem}
                    </p>
                  </div>

                  <div className="shrink-0">
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4">
                    <div className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">Mensagem</p>
                      <p className="mt-1 text-sm text-gray-800 whitespace-pre-wrap">
                        {sac.mensagem}
                      </p>
                    </div>

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-600">
                      <div>
                        <p className="text-gray-500">Tipo</p>
                        <p className="font-semibold text-gray-800">
                          {sac.tipo_sac?.descricao ?? "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Status</p>
                        <p className="font-semibold text-gray-800">
                          {sac.status_sac?.descricao ?? "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Aberto em</p>
                        <p className="font-semibold text-gray-800">
                          {sac.created_at
                            ? new Date(sac.created_at).toLocaleString("pt-BR")
                            : "—"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
