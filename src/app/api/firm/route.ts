"use server";

import { db } from "@/lib/db";
import { firmTable } from "@/lib/schema/firm";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const firms = await db.select().from(firmTable);

    const response = NextResponse.json(firms);

    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');
    return response;
  } catch (e) {
    return NextResponse.error();
  }
};
