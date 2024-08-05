"use server";

import { db } from "@/lib/db";
import { personelTable } from "@/lib/schema/personel";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const cooki = cookies();
  console.log(cooki);

  try {
    const personels = await db.select().from(personelTable);

    return NextResponse.json(personels);
  } catch (e) {
    return NextResponse.error();
  }
};
