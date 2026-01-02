"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchApi } from "@/app/api/apiFetch";

type Mode = "cliente" | "admin";

export default function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const apiBaseUrl = useMemo(() => {
    const v = process.env.NEXT_PUBLIC_BACKEND_URL;
    return (v ?? "").replace(/\/$/, "");
  }, []);

  const nextUrl = searchParams.get("next") || "/app";

  const [mode, setMode] = useState<Mode>("cliente");
  const [identifier, setIdentifier] = useState(""); // email/cpf/cnpj (flexível)
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function ensureApi() {
    if (!apiBaseUrl) {
      setError("NEXT_PUBLIC_BACKEND_URL não configurado no .env");
      return false;
    }
    return true;
  }

  function handleGoogleLogin() {
    setError(null);
    if (!ensureApi()) return;

    // Dica: backend pode aceitar `?redirect=` pra voltar pro app após callback
    const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    // ex: https://api.espacosmart.com.br (configure no .env do Next)
    console.log("Redirecting to:", `${apiBaseUrl}/auth/google`);
    window.location.href = `${apiBaseUrl}/auth/google`;
  }

  async function handleClientLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!ensureApi()) return;

    if (!identifier.trim() || !password) {
      setError("Informe seu e-mail/CPF/CNPJ e senha.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetchApi({
        endpoint: "auth/login",
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: identifier.trim(),
            password,
            remember, // se quiser, backend ajusta expiração
          }),
        },
      });

      if (!res.ok) {
        let msg = "Falha no login. Verifique suas credenciais.";
        try {
          const data = await res.json();
          msg = data?.message || data?.error || msg;
        } catch {}
        throw new Error(msg);
      }

      // Se o backend usar cookie, nem precisa ler JSON.
      // Se retornar algo, dá pra usar para roteamento por perfil:
      const data = await res.json().catch(() => ({}));

      // Exemplo: role vindo do backend: "admin" | "client"
      const role = data?.role;

      if (role === "admin") router.push("/admin");
      else router.push(nextUrl);
    } catch (err: any) {
      setError(err?.message || "Erro inesperado ao autenticar.");
    } finally {
      setLoading(false);
    }
  }

  function handleForgotPassword() {
    // Stub: você pode abrir modal ou redirecionar
    // (ideal: /auth/forgot com integração no Bitrix/ERP para validação)
    setError("Fluxo de recuperação ainda não configurado.");
  }

  function handleFirstAccess() {
    // Stub: primeiro acesso (definir senha / validar CNPJ/CPF / obra)
    setError("Fluxo de primeiro acesso ainda não configurado.");
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* fundo */}
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute -top-40 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-105 w-105 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10">
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {/* lado conteúdo */}
          <div className="hidden md:flex flex-col justify-center">
            <div className="mb-6 flex items-center gap-4">
              <div className="rounded-2xl bg-white p-3 shadow-lg shadow-black/40">
                <Image
                  src="/espacosmart-logo.png"
                  alt="Espaço Smart"
                  width={80}
                  height={80}
                  className="h-25 w-25 object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">
                  Portal do Cliente
                </h1>
                <p className="text-sm text-white/70">
                  Obras, orçamentos, SAC, documentos e financeiro — tudo em um
                  só lugar.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-white/70">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="font-semibold text-white/85">
                    Obra & Projeto
                  </div>
                  <div className="mt-1">
                    Timeline do SPA (Vendido → Projeto → Produção → Expedição…),
                    SAC e interações.
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="font-semibold text-white/85">Orçamentos</div>
                  <div className="mt-1">
                    Visualização e aprovação online + assinatura (Clicksign) +
                    contato com vendedor.
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="font-semibold text-white/85">
                    Financeiro & Documentos
                  </div>
                  <div className="mt-1">
                    Duplicatas/boletos, histórico, pix copia-e-cola e central de
                    documentos (estilo drive).
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* card login */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur">
              {/* header mobile */}
              <div className="mb-6 flex items-center gap-3 md:hidden">
                <div className="rounded-2xl bg-white p-2">
                  <Image
                    src="/espacosmart-logo.png"
                    alt="Espaço Smart"
                    width={48}
                    height={48}
                    className="h-10 w-10 object-contain"
                    priority
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold">Portal do Cliente</p>
                  <p className="text-xs text-white/70">Espaço Smart</p>
                </div>
              </div>

              {/* selector */}
              <div className="mb-6 grid grid-cols-2 rounded-2xl bg-black/30 p-1">
                <button
                  type="button"
                  onClick={() => {
                    setMode("cliente");
                    setError(null);
                  }}
                  className={[
                    "rounded-xl px-3 py-2 text-sm transition",
                    mode === "cliente"
                      ? "bg-orange-500 text-black font-semibold"
                      : "text-white/80 hover:text-white",
                  ].join(" ")}
                >
                  Sou cliente
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("admin");
                    setError(null);
                  }}
                  className={[
                    "rounded-xl px-3 py-2 text-sm transition",
                    mode === "admin"
                      ? "bg-orange-500 text-black font-semibold"
                      : "text-white/80 hover:text-white",
                  ].join(" ")}
                >
                  Administrador
                </button>
              </div>

              {error && (
                <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              {mode === "admin" ? (
                <div>
                  <h2 className="text-xl font-semibold pb-2">
                    Acesso do administrador
                  </h2>
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 rounded-lg bg-white text-slate-900 hover:bg-slate-100 transition px-4 py-3 text-sm font-semibold shadow-lg"
                  >
                      <Image
                        src="/google.png"
                        alt="Google"
                        width={30}
                        height={30}
                        className="h-7 w-10 object-contain"
                      />              
                    <span>Entrar com Google</span>
                  </button>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-xs text-white/65">
                    <div className="mt-1">
                      Admin deve usar domínio corporativo.
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleClientLogin}>
                  <h2 className="text-xl font-semibold">Acesso do cliente</h2>
                  <p className="mt-1 text-sm text-white/70">
                    Use seu e-mail/CPF/CNPJ e senha cadastrados.
                  </p>

                  <div className="mt-5 space-y-3">
                    <div>
                      <label className="mb-1 block text-xs text-white/70">
                        E-mail / CPF / CNPJ
                      </label>
                      <input
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-orange-500/50"
                        placeholder="ex.: email@empresa.com ou 00.000.000/0000-00"
                        autoComplete="username"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs text-white/70">
                        Senha
                      </label>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-orange-500/50"
                        placeholder="••••••••"
                        autoComplete="current-password"
                      />
                    </div>

                    <label className="flex items-center gap-2 text-xs text-white/70">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="h-4 w-4 accent-orange-500"
                      />
                      Manter conectado
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-5 w-full rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-black transition hover:brightness-110 disabled:opacity-60"
                  >
                    {loading ? "Entrando..." : "Entrar"}
                  </button>

                  <div className="mt-4 flex items-center justify-between text-xs text-white/60">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="hover:text-white"
                    >
                      Esqueci minha senha
                    </button>
                    <button
                      type="button"
                      onClick={handleFirstAccess}
                      className="hover:text-white"
                    >
                      Primeiro acesso
                    </button>
                  </div>
                </form>
              )}

              <div className="mt-6 border-t border-white/10 pt-4 text-xs text-white/50">
                © {new Date().getFullYear()} Espaço Smart — Tudo para Construção
                a Seco
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
