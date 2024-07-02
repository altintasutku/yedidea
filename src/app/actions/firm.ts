"use server";
import { firmSchema } from "@/components/FirmaForm";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { firmTable } from "@/lib/schema";
import { z } from "zod";
import { create } from "zustand";

export const createFirm = async (
  prevState: any,
  values: z.infer<typeof firmSchema>,
) => {
  const session = await getAuthSession();
  if (!session?.user.id) {
    return null;
  }

  return await db
    .insert(firmTable)
    .values({ ...values, createdBy: session.user.id })
    .returning();
};
