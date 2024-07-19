"use server";

import { db } from "@/lib/db";
import { personelTable } from "@/lib/schema";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const personels = await db.select().from(personelTable);

    return NextResponse.json(personels);
  } catch (e) {
    return NextResponse.error();
  }
};
