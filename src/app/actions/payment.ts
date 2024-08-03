"use server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { paymentTable } from "@/lib/schema/payment";
import { InferInsertModel } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const addPayment = async (
  prevState: any,
  data: Omit<InferInsertModel<typeof paymentTable>, "createdBy">,
): Promise<FormResponse> => {
  const session = await getAuthSession();
  if (!session?.user.id) {
    return {
      message: "Unauthorized",
      status: "error",
    };
  }
  await db.insert(paymentTable).values({
    ...data,
    createdBy: session.user.id,
  });

  revalidatePath("/giderler");

  return {
    message: "Personel eklendi",
    status: "success",
  };
};
