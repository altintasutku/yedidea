"use server";

import { debtSchema } from "@/components/dashboard/Forms/DebtForm";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { incomeTable } from "@/lib/schema/income";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createIncome = async (
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
    .insert(incomeTable)
    .values({ name, amount, createdBy: session.user.id })
    .returning();

  revalidatePath("/gelirler");

  return {
    message: "WPS başarıyla oluşturuldu",
    status: "success",
  };
};

export async function deleteIncome(items: (typeof incomeTable.$inferSelect)[]) {
  try {
    items.forEach(async (item) => {
      await db.delete(incomeTable).where(eq(incomeTable.id, item.id));
    });

    revalidatePath("/gelirler");
  } catch (e) {
    console.error(e);
  }
}
