"use server";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { projectPersonelTable, projectTable } from "@/lib/schema/project";
import { projectSchema } from "@/lib/zodSchemas";
import { InferInsertModel } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createProject = async (values: z.infer<typeof projectSchema>) => {
  const session = await getAuthSession();
  if (!session?.user.id) {
    return null;
  }
  await db
    .insert(projectTable)
    .values({
      ...values,
      createdBy: session.user.id,
      amount: values.amount.toString(),
    })
    .returning();

  revalidatePath("/projeler");
};

export const addPersonelToProject = async (
  prevState: any,
  data: Omit<InferInsertModel<typeof projectPersonelTable>,"createdBy">,
): Promise<FormResponse> => {
  const session = await getAuthSession();
  if (!session?.user.id) {
    return {
      message: "Unauthorized",
      status: "error",
    };
  }
  await db
    .insert(projectPersonelTable)
    .values({
      ...data,
      createdBy: session.user.id,
    })
    .returning();

  revalidatePath("/personel");
  revalidatePath("/projeler");

  return {
    message: "Personel eklendi",
    status: "success",
  };
};
