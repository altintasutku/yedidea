import { getServerSession, type AuthOptions, type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { db } from "./db";
import { userTable } from "./schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { env } from "@/env";
import bcrypt from "bcryptjs"

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    password: string;
    role: "admin" | "user";
    createdAt: Date | null;
    updatedAt: Date | null;
  }

  interface Session {
    user: User;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@mail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { success } = await z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParseAsync(credentials);

        if (!success) return null;

        try {
          // Fetch user from database
          const user = await db
            .select()
            .from(userTable)
            .where(eq(userTable.email, credentials!.email));
          if (!user) return null;

          if(!(await bcrypt.compare(credentials!.password, user[0].password))){
            return null;
          }

          return user[0];
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    redirect() {
      return "/dashboard";
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
