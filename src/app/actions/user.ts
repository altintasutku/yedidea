"use server";

import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/auth";
import { userTable } from "@/lib/schema/user";

export async function createUser(
  prevState: any,
  formData: FormData,
): Promise<FormResponse> {
  const session = await getAuthSession();
  if (!session) {
    return {
      message: "Yetkisiz erişim",
      status: "error",
    };
  }

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as "admin" | "user";

  // Save to database
  await db.insert(userTable).values({
    email,
    password,
    role,
  });

  revalidatePath("/user");
  return {
    message: "Başarıyla eklendi",
    status: "success",
  };
}

export async function deleteUser(item: typeof userTable.$inferSelect) {
  try {
    await db.delete(userTable).where(eq(userTable.id, item.id));

    revalidatePath("/user");
  } catch (e) {
    console.error(e);
  }
}
