import { z } from "zod";

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
];

export const createSacSchema = z.object({
  assunto_id: z.coerce.number().int().positive("Selecione um tipo/assunto."),
  mensagem: z.string().min(10, "Escreva uma mensagem com pelo menos 10 caracteres.").max(2000),

  // arquivos: FileList (do input) ou undefined
  arquivos: z
    .any()
    .optional()
    .refine((files) => !files || files.length <= MAX_FILES, `Máximo de ${MAX_FILES} arquivos.`)
    .refine(
      (files) => !files || Array.from(files as FileList).every((f) => f.size <= MAX_FILE_SIZE),
      "Cada arquivo deve ter no máximo 10MB."
    )
    .refine(
      (files) => !files || Array.from(files as FileList).every((f) => ALLOWED.includes(f.type)),
      "Tipos permitidos: PDF, PNG, JPG, WEBP."
    ),
});

export type CreateSacValues = z.infer<typeof createSacSchema>;
