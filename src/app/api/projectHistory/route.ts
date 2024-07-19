"use server";

import { db } from "@/lib/db";
import { projectPersonelTable, projectTable } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const projectHistory = await db.select().from(projectPersonelTable);

    return NextResponse.json(projectHistory);
  } catch (e) {
    return NextResponse.error();
  }
};
