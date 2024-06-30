import { db } from "@/lib/db";
import { userTable } from "@/lib/schema";
import { NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (req: Request) => {
  const body = await req.json();

  const { success } = await z
    .object({
      email: z.string().email(),
      password: z.string().min(6),
    })
    .safeParseAsync(body);

  if (!success) {
    return NextResponse.json(
      {
        error: "Invalid body",
      },
      {
        status: 400,
      },
    );
  }

  const user = await db.insert(userTable).values({
    email: body.email,
    password: body.password,
  }).returning();

  if (!user) {
    return NextResponse.json(
      {
        error: "User couldn't be registered",
      },
      {
        status: 400,
      },
    );
  }

  return NextResponse.json({
    message: "User registered",
    data: user,
  });
};
