"use server";

import { db } from "@/lib/db";
import { firmTable } from "@/lib/schema";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const firms = await db.select().from(firmTable);

    return NextResponse.json(firms);
  } catch (e) {
    return NextResponse.error();
  }
};
