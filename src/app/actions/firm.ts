"use server";

import { firmSchema } from "@/components/dashboard/Forms/FirmaForm";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { firmTable } from "@/lib/schema/firm";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createFirm = async (
  prevState: any,
  formData: FormData,
): Promise<FormResponse> => {
  const name = formData.get("name") as string;
  const sector = formData.get("sector") as string;

  const session = await getAuthSession();
  if (!session?.user.id) {
    return {
      message: "Yetkisiz erişim",
      status: "error",
    };
  }

  await db
    .insert(firmTable)
    .values({ name, sector, createdBy: session.user.id })
    .returning();

  revalidatePath("/firma");

  return {
    message: "Firma başarıyla oluşturuldu",
    status: "success",
  };
};

export async function deleteFirm(
  items : (typeof firmTable.$inferSelect)[]
): Promise<FormResponse> {
  const session = await getAuthSession();
  if (!session?.user.id) {
    return {
      message: "Yetkisiz erişim",
      status: "error",
    };
  }

  for (const item of items) {
    await db.delete(firmTable).where(eq(firmTable.id, item.id));
  }

  revalidatePath("/firma");

  return {
    message: "Firma başarıyla silindi",
    status: "success",
  };
}