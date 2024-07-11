"use server";

import { debtSchema } from "@/components/Forms/DebtForm";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { debtTable, incomeTable } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createDebt = async (
  values: z.infer<typeof debtSchema>,
) => {
  const session = await getAuthSession();
  if (!session?.user.id) {
    return null;
  }
  await db
    .insert(debtTable)
    .values({
      ...values,
      createdBy: session.user.id,
      amount: values.amount.toString(),
    })
    .returning();

  revalidatePath("/giderler");
};
