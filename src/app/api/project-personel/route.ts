"use server";

import { db } from "@/lib/db";
import { projectPersonelTable } from "@/lib/schema/project";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const personelId = request.nextUrl.searchParams.get("personelId");

  if (!personelId) {
    return NextResponse.error();
  }

  try {
    const projectHistory = await db.query.projectPersonelTable.findMany({
      where: eq(projectPersonelTable.personelId, personelId),
      with: {
        project: true,
      },
    });

const response = NextResponse.json(projectHistory);

    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');
    return response;
  } catch (e) {
    console.log("error", e);
    return NextResponse.error();
  }
};

export const DELETE = async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.error();
  }

  try {
    await db
      .delete(projectPersonelTable)
      .where(eq(projectPersonelTable.id, id));

    return NextResponse.json({ message: "Success" });
  } catch (e) {
    console.log("error", e);
    return NextResponse.error();
  }
};
