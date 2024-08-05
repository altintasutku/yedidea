"use server";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { projectTable } from "@/lib/schema/project";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {

  const cooki = cookies();
  console.log(cooki)

  try {
    const projects = await db.select().from(projectTable);

    return NextResponse.json(projects);
  } catch (e) {
    return NextResponse.error();
  }
};
