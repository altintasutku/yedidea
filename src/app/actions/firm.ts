"use server";
import { firmSchema } from "@/components/dashboard/Forms/FirmaForm";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { firmTable } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createFirm = async (
  values: z.infer<typeof firmSchema>,
) => {
  const session = await getAuthSession();
  if (!session?.user.id) {
    return null;
  }

  await db
    .insert(firmTable)
    .values({ ...values, createdBy: session.user.id })
    .returning();

  revalidatePath("/firma");
};
