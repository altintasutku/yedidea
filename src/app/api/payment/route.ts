"use server";

import { db } from "@/lib/db";
import { paymentTable } from "@/lib/schema/payment";

import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const payments = await db.select().from(paymentTable);

    return NextResponse.json(payments);
  } catch (e) {
    return NextResponse.error();
  }
};
