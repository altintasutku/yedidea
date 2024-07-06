"use server";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { projectTable } from "@/lib/schema";
import { projectSchema } from "@/lib/zodSchemas";
import { z } from "zod";

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
