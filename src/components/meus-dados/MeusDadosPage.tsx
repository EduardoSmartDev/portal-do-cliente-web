"use client";

import { useMemo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "./utils/Types";
import { FormValues, formSchema } from "./utils/EditUserValidator";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/app/api/apiFetch";

interface MeusDadosPageProps {
  dados: User;
}

export default function MeusDadosPage({ dados }: MeusDadosPageProps) {
  const defaultValues = useMemo<FormValues>(
    () => ({
      nome: dados?.nome ?? "",
      celular: dados?.celular ?? "",
      foto: undefined, // file upload não tem default

      senhaAtual: "",
      senhaNova: "",
      senhaNovaConfirmacao: "",
    }),
    [dados]
  );
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onBlur",
  });

  const [msg, setMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // preview do arquivo selecionado
  const fotoFiles = watch("foto") as FileList | undefined;
  const selectedFile = fotoFiles?.[0];
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  useEffect(() => {
    if (dados.admin) {
      reset({
        ...defaultValues,
        senhaAtual: "",
        senhaNova: "",
        senhaNovaConfirmacao: "",
      });
    }
  }, [dados.admin, defaultValues, reset]);

  function maskPhoneBR(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);

    const ddd = digits.slice(0, 2);
    const part1 = digits.slice(2, digits.length === 11 ? 7 : 6);
    const part2 = digits.slice(digits.length === 11 ? 7 : 6, 11);

    if (!digits) return "";
    if (digits.length < 3) return `(${digits}`;
    if (digits.length < 7) return `(${ddd}) ${digits.slice(2)}`;
    return `(${ddd}) ${part1}-${part2}`;
  }

  const onSubmit = async (values: FormValues) => {
    setMsg(null);

    try {
      const senhaVaiTrocar =
        !dados.admin &&
        (values.senhaAtual?.trim() ||
          values.senhaNova?.trim() ||
          values.senhaNovaConfirmacao?.trim());

      // multipart
      const formData = new FormData();
      formData.append("nome", values.nome.trim());
      formData.append("celular", values.celular.trim());

      if (senhaVaiTrocar) {
        formData.append("senhaAtual", values.senhaAtual ?? "");
        formData.append("senhaNova", values.senhaNova ?? "");
      }

      const file = (values.foto as FileList | undefined)?.[0];
      if (file) formData.append("foto", file);
      console.log("Form Data Entries:");
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
      
      const res = await fetchApi({
        endpoint: "user",
        options: {
            method: "PUT",
            body: formData,
        },
      }) as Response;

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(errText || "Falha ao salvar alterações.");
      }
      

      setMsg({ type: "success", text: "Dados atualizados com sucesso!" });

      // limpa senhas e limpa file input
      reset(
        {
          nome: values.nome,
          celular: values.celular,
          foto: undefined,
          senhaAtual: "",
          senhaNova: "",
          senhaNovaConfirmacao: "",
        },
        { keepDirty: false }
      );
      toast.success("Dados atualizados com sucesso!");
      router.push('/home');
    } catch (err: any) {
      setMsg({ type: "error", text: err?.message ?? "Erro inesperado." });
      toast.error(err?.message ?? "Erro inesperado.");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-orange-50">
      <header className="bg-linear-to-r from-gray-700 to-gray-600 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
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
                  Meus Dados
                </h1>
                <p className="mt-1 text-sm text-orange-300">
                  Atualize suas informações pessoais e de contato
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-white">
                  {dados?.nome ?? ""}
                </p>
                <p className="text-xs text-gray-200">{dados?.email ?? ""}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold shadow-lg">
                {(dados?.nome?.charAt(0) ?? "?").toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {msg && (
          <div
            className={`mb-4 rounded-lg border px-4 py-3 text-sm ${
              msg.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {msg.text}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-5 sm:p-6 space-y-6"
          >
            <section className="space-y-3">
              <h2 className="text-sm font-semibold text-gray-900">
                Identificação
              </h2>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs text-gray-600">ID</label>
                  <input
                    value={dados?.id ? String(dados.id) : ""}
                    readOnly
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-600">E-mail</label>
                  <input
                    value={dados?.email ?? ""}
                    readOnly
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 outline-none"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-sm font-semibold text-gray-900">Perfil</h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-600">Nome</label>
                  <input
                    {...register("nome")}
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  {errors.nome && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.nome.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-600">Celular</label>
                  <input
                    {...register("celular")}
                    placeholder="(00) 00000-0000"
                    onChange={(e) => {
                      const masked = maskPhoneBR(e.target.value);
                      setValue("celular", masked, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                    }}
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  {errors.celular && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.celular.message}
                    </p>
                  )}
                </div>

                {/* FOTO UPLOAD */}
                <div>
                  <label className="text-xs text-gray-600">Foto</label>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    {...register("foto")}
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 file:mr-3 file:rounded-md file:border-0 file:bg-orange-500 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-orange-600"
                  />

                  {errors.foto && (
                    <p className="mt-1 text-xs text-red-600">
                      {String(errors.foto.message)}
                    </p>
                  )}

                  {/* preview: se selecionou arquivo, mostra ele; senão, mostra foto atual (se existir) */}
                  <div className="mt-3 flex items-center gap-3">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Prévia da nova foto"
                        className="h-12 w-12 rounded-full object-cover ring-1 ring-gray-200"
                      />
                    ) : dados?.foto ? (
                      <img
                        src={dados.foto}
                        alt="Foto atual"
                        className="h-12 w-12 rounded-full object-cover ring-1 ring-gray-200"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display =
                            "none";
                        }}
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gray-100 ring-1 ring-gray-200" />
                    )}

                    <div>
                      <p className="text-xs text-gray-700 font-medium">
                        {selectedFile
                          ? selectedFile.name
                          : "Nenhum arquivo selecionado"}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        JPG/PNG/WEBP até 5MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-sm font-semibold text-gray-900">Segurança</h2>

              {dados.admin ? (
                <div className="rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-800">
                  <p className="font-semibold">Login via Google</p>
                  <p className="mt-1 text-xs text-orange-700">
                    Este usuário é <b>administrador</b> e faz login pelo Google.
                    Não há necessidade de senha neste portal.
                  </p>
                </div>
              ) : (
                <p className="text-xs text-gray-500">
                  Se não quiser trocar a senha, deixe em branco.
                </p>
              )}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    className={`text-xs ${
                      dados.admin ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Senha atual
                  </label>
                  <input
                    type="password"
                    {...register("senhaAtual")}
                    disabled={dados.admin}
                    className={[
                      "mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none",
                      dados.admin
                        ? "border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
                        : "border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent",
                    ].join(" ")}
                  />
                  {!dados.admin && errors.senhaAtual && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.senhaAtual.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className={`text-xs ${
                      dados.admin ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Nova senha
                  </label>
                  <input
                    type="password"
                    {...register("senhaNova")}
                    disabled={dados.admin}
                    className={[
                      "mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none",
                      dados.admin
                        ? "border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
                        : "border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent",
                    ].join(" ")}
                  />
                  {!dados.admin && errors.senhaNova && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.senhaNova.message}
                    </p>
                  )}
                  <div
                    className={`mt-1 text-[11px] ${
                      dados.admin ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Mínimo 8 caracteres.
                  </div>
                </div>

                <div>
                  <label
                    className={`text-xs ${
                      dados.admin ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Confirmar nova senha
                  </label>
                  <input
                    type="password"
                    {...register("senhaNovaConfirmacao")}
                    disabled={dados.admin}
                    className={[
                      "mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none",
                      dados.admin
                        ? "border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
                        : "border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent",
                    ].join(" ")}
                  />
                  {!dados.admin && errors.senhaNovaConfirmacao && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.senhaNovaConfirmacao.message}
                    </p>
                  )}
                </div>
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
                Desfazer
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !isDirty}
                className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
              >
                {isSubmitting ? "Salvando..." : "Salvar alterações"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
