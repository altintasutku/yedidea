"use server";

import { debtSchema } from "@/components/Forms/DebtForm";
import { incomeSchema } from "@/components/Forms/IncomeForm";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { incomeTable } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createIncome = async (values: z.infer<typeof incomeSchema>) => {
  const session = await getAuthSession();
  if (!session?.user.id) {
    return null;
  }
  await db
    .insert(incomeTable)
    .values({
      ...values,
      createdBy: session.user.id,
      amount: values.amount.toString(),
    })
    .returning();

  revalidatePath("/gelirler");
};
