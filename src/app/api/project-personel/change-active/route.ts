"use server";

import { db } from "@/lib/db";
import { projectPersonelTable } from "@/lib/schema/project";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.error();
  }

  try {
    const old = await db.query.projectPersonelTable.findFirst({
      where: eq(projectPersonelTable.id, id),
    });

    if (!old) {
      return NextResponse.error();
    }

    await db
      .update(projectPersonelTable)
      .set({
        active: !old.active,
      })
      .where(eq(projectPersonelTable.id, id));

    return NextResponse.json({
      message: "Success",
    });
  } catch (e) {
    console.log("error", e);
    return NextResponse.error();
  }
};
