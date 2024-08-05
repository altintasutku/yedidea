"use server";

import { db } from "@/lib/db";
import { paymentTable } from "@/lib/schema/payment";
import { NextResponse } from "next/server";

export const GET = async () => {
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
