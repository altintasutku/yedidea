"use server";

import { db } from "@/lib/db";
import { firmTable } from "@/lib/schema/firm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const cooki = cookies();
  console.log(cooki)

  try {
    const firms = await db.select().from(firmTable);

    return NextResponse.json(firms);
  } catch (e) {
    return NextResponse.error();
  }
};
