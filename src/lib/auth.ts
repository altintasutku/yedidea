import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { db } from "./db";
import { userTable } from "./schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { env } from "@/env";
import bcrypt from "bcryptjs";
import { AuthOptions, getServerSession } from "next-auth";

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

          if (
            !(await bcrypt.compare(credentials!.password, user[0].password))
          ) {
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email
        token.password = user.password
        token.role = user.role
        token.createdAt = user.createdAt
        token.updatedAt = user.updatedAt
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          password: token.password,
          role: token.role,
          createdAt: token.createdAt,
          updatedAt: token.updatedAt
        },
      };
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
