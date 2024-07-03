"use server";

import { debtSchema } from "@/components/DebtForm";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { debtTable } from "@/lib/schema";
import { z } from "zod";

export const createDebt = async (
  prevState: any,
  values: z.infer<typeof debtSchema>,
) => {
  const session = await getAuthSession();
  if (!session?.user.id) {
    return null;
  }
  return await db
    .insert(debtTable)
    .values({
      ...values,
      createdBy: session.user.id,
      amount: values.amount.toString(),
    })
    .returning();
};
