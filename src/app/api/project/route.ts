"use server";

import { db } from "@/lib/db";
import { projectTable } from "@/lib/schema/project";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const projects = await db.select().from(projectTable);

    const response = NextResponse.json(projects);

    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');
    return response;
  } catch (e) {
    return NextResponse.error();
  }
};
