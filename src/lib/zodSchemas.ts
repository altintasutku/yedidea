import { z } from "zod";

export const projectSchema = z.object({
  projectName: z
    .string({
      required_error: "Proje adı zorunludur.",
    })
    .describe("Proje Adı"),
  sector: z
    .string({
      required_error: "Sektör zorunludur.",
    })
    .describe("Sektör"),
  firmName: z.string().describe("Firma Adı"),
  startDate: z.coerce.date().describe("Başlangıç Tarihi"),
  endDate: z.coerce.date().describe("Bitiş Tarihi"),
  amount: z.coerce.number().describe("Fiyat"),
});
