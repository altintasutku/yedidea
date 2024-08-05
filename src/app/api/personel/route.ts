"use server";

import { db } from "@/lib/db";
import { personelTable } from "@/lib/schema/personel";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const personels = await db.select().from(personelTable);

    const response = NextResponse.json(personels);

    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');
    return response;
  } catch (e) {
    return NextResponse.error();
  }
};
