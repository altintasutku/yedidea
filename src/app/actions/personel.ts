"use server";
import { personelFormSchema } from "@/components/Forms/PersonelForm";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { personelTable } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createPersonel = async (
  values: z.infer<typeof personelFormSchema>,
) => {
  const session = await getAuthSession();
  if (!session?.user.id) {
    return null;
  }

  await db
    .insert(personelTable)
    .values({ ...values, createdBy: session.user.id })
    .returning();

  revalidatePath("/personel");
};
