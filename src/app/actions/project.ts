"use server";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { projectPersonelTable, projectTable } from "@/lib/schema/project";
import { projectSchema } from "@/lib/zodSchemas";

import { eq, InferInsertModel } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createProject = async (
  prevState: any,
  values: z.infer<typeof projectSchema>,
): Promise<FormResponse> => {
  const session = await getAuthSession();
  if (!session?.user.id) {
    return {
      message: "Yetkisiz erişim",
      status: "error",
    };
  }

  await db
    .insert(projectTable)
    .values({
      ...values,
      amount: values.amount.toString(),
      createdBy: session.user.id,
    })
    .returning();

  revalidatePath("/projeler");

  return {
    message: "WPS başarıyla oluşturuldu",
    status: "success",
  };
};

export async function deleteProject(
  items: (typeof projectTable.$inferSelect)[],
) {
  try {
    items.forEach(async (item) => {
      await db.delete(projectTable).where(eq(projectTable.id, item.id));
    });

    revalidatePath("/projeler");
  } catch (e) {
    console.error(e);
  }
}

export const addPersonelToProject = async (
  prevState: any,
  data: Omit<InferInsertModel<typeof projectPersonelTable>, "createdBy">,
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
