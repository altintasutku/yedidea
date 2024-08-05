"use server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { debtTable } from "@/lib/schema/debt";
import { paymentTable } from "@/lib/schema/payment";
import { personelTable } from "@/lib/schema/personel";
import { eq, InferInsertModel } from "drizzle-orm";
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

  const personel = await db
    .select()
    .from(personelTable)
    .where(eq(personelTable.id, data.personelId));

  await db.insert(debtTable).values({
    name: `Personel ücreti : ${personel[0].name}`,
    amount: data.paidAmount,
    personelId: data.personelId,
    category: "Personel",
    createdBy: session.user.id,
  });

  const newDebt = await db
    .select()
    .from(debtTable)
    .where(eq(debtTable.name, `Personel ücreti : ${personel[0].name}`));

  await db.insert(paymentTable).values({
    ...data,
    debtId: newDebt[0].id,
    createdBy: session.user.id,
  });

  revalidatePath("/giderler");
  revalidatePath("personel");

  return {
    message: "Personel eklendi",
    status: "success",
  };
};
