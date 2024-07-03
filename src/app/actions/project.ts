"use server";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { projectTable } from "@/lib/schema";
import { z } from "zod";

const projectSchema = z.object({
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

export const createProject = async (
  prevState: any,
  values: z.infer<typeof projectSchema>,
) => {
  const session = await getAuthSession();
  if (!session?.user.id) {
    return null;
  }
  return await db
    .insert(projectTable)
    .values({
      ...values,
      createdBy: session.user.id,
      amount: values.amount.toString(),
    })
    .returning();
};
