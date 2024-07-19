"use server";

import { db } from "@/lib/db";
import { projectTable } from "@/lib/schema";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const projects = await db.select().from(projectTable);

    return NextResponse.json(projects);
  } catch (e) {
    return NextResponse.error();
  }
};
