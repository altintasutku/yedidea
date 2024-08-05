"use server";

import { db } from "@/lib/db";
import { paymentTable } from "@/lib/schema/payment";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const cooki = cookies();
  console.log(cooki);

  try {
    const payments = await db.select().from(paymentTable);

    return NextResponse.json(payments);
  } catch (e) {
    console.error("Error fetching payments:", e);

    return NextResponse.json(
      { error: "Failed to fetch payments" },
      { status: 500 },
    );
  }
};
