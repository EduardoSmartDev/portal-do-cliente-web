import { z } from "zod";

const celularRegex = /^[0-9\s()+-]{10,20}$/;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const onlyDigits = (v: string) => v.replace(/\D/g, "");

export const formSchema = z
  .object({
    nome: z.string().min(2, "Informe seu nome (mín. 2 caracteres)."),
    celular: z
    .string()
    .min(1, "Informe um celular.")
    .transform((v) => v.trim())
    .refine((v) => {
      const digits = onlyDigits(v);
      // 10 (fixo) ou 11 (celular com 9)
      return digits.length === 10 || digits.length === 11;
    }, "Informe um celular válido (DDD + número)."),

    // agora é upload
    foto: z
      .any()
      .optional()
      .refine(
        (files) => !files || files.length === 0 || files[0] instanceof File,
        "Arquivo inválido."
      )
      .refine(
        (files) =>
          !files ||
          files.length === 0 ||
          ACCEPTED_IMAGE_TYPES.includes(files[0].type),
        "Formato inválido. Use JPG, PNG ou WEBP."
      )
      .refine(
        (files) => !files || files.length === 0 || files[0].size <= MAX_FILE_SIZE,
        "A imagem deve ter no máximo 5MB."
      ),

    senhaAtual: z.string().optional().or(z.literal("")),
    senhaNova: z.string().optional().or(z.literal("")),
    senhaNovaConfirmacao: z.string().optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    const senhaVaiTrocar =
      (data.senhaAtual ?? "").trim() ||
      (data.senhaNova ?? "").trim() ||
      (data.senhaNovaConfirmacao ?? "").trim();

    if (!senhaVaiTrocar) return;

    if (!(data.senhaAtual ?? "").trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["senhaAtual"],
        message: "Informe a senha atual para trocar a senha.",
      });
    }

    if ((data.senhaNova ?? "").trim().length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["senhaNova"],
        message: "A nova senha deve ter no mínimo 8 caracteres.",
      });
    }

    if ((data.senhaNovaConfirmacao ?? "").trim() !== (data.senhaNova ?? "").trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["senhaNovaConfirmacao"],
        message: "Confirmação diferente da nova senha.",
      });
    }
  });

export type FormValues = z.infer<typeof formSchema>;
