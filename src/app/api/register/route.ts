import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { env } from "@/env";
import { userTable } from "@/lib/schema/user";

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

  let user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, body.email));

  if (user.length > 0) {
    return NextResponse.json(
      {
        error: "User already exists",
      },
      {
        status: 400,
      },
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);

  user = await db
    .insert(userTable)
    .values({
      email: body.email,
      password: hashedPassword,
    })
    .returning();

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
