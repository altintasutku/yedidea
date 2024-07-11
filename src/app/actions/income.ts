"use server";

import { debtSchema } from "@/components/Forms/DebtForm";
import { incomeSchema } from "@/components/Forms/IncomeForm";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { incomeTable } from "@/lib/schema";
import { z } from "zod";

export const createIncome = async (
  prevState: any,
  values: z.infer<typeof incomeSchema>,
) => {
  const session = await getAuthSession();
  if (!session?.user.id) {
    return null;
  }
  return await db
    .insert(incomeTable)
    .values({
      ...values,
      createdBy: session.user.id,
      amount: values.amount.toString(),
    })
    .returning();
};
