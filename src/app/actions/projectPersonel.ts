"use server";
import { ProjectPersonelInsert } from "./../../lib/schema";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { projectPersonelTable } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createProjectPersonel = async (
  prevState: any,
  values: Omit<ProjectPersonelInsert, "createdBy">,
): Promise<FormResponse> => {
  const session = await getAuthSession();
  if (!session?.user.id) {
    return {
      message: "Unauthorized",
      status: "error",
    };
  }

  await db
    .insert(projectPersonelTable)
    .values({ ...values, createdBy: session.user.id })
    .returning();

  revalidatePath("/project-personel");

  return {
    message: "Personel başarıyla eklendi",
    status: "success",
  };
};
