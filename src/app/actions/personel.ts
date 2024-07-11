"use server";
import { personelFormSchema } from "@/components/Forms/PersonelForm";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { personelTable } from "@/lib/schema";
import { z } from "zod";

export const createPersonel = async (prevState: any, values: z.infer<typeof personelFormSchema>) => {
  const session = await getAuthSession();
  if (!session?.user.id) {
    return null;
  }

  return await db
    .insert(personelTable)
    .values({ ...values, createdBy: session.user.id })
    .returning();
};
