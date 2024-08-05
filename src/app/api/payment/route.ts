"use server";

import { db } from "@/lib/db";
import { paymentTable } from "@/lib/schema/payment";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const payments = await db.select().from(paymentTable);

    const response = NextResponse.json(payments);

    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');
    return response;
  } catch (e) {
    console.error("Error fetching payments:", e);

    return NextResponse.json(
      { error: "Failed to fetch payments" },
      { status: 500 },
    );
  }
};
