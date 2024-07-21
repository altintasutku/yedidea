"use server";

import { firmSchema } from "@/components/dashboard/Forms/FirmaForm";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { debtTable, firmTable } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createExpense = async (
  prevState: any,
  formData: FormData,
): Promise<FormResponse> => {
  const name = formData.get("name") as string;
  const amount = formData.get("amount") as string;

  const session = await getAuthSession();
  if (!session?.user.id) {
    return {
      message: "Yetkisiz erişim",
      status: "error",
    };
  }

  await db
    .insert(debtTable)
    .values({ name, amount, createdBy: session.user.id })
    .returning();

  revalidatePath("/giderler");

  return {
    message: "WPS başarıyla oluşturuldu",
    status: "success",
  };
};

export async function deleteExpense(items: (typeof debtTable.$inferSelect)[]) {
  try {
    items.forEach(async (item) => {
      await db.delete(debtTable).where(eq(debtTable.id, item.id));
    });

    revalidatePath("/giderler");
  } catch (e) {
    console.error(e);
  }
}
