import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    password: string;
    role: "admin" | "user";
    createdAt: Date | null;
    updatedAt: Date | null;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    password: string;
    role: "admin" | "user";
    createdAt: Date | null;
    updatedAt: Date | null;
  }
}