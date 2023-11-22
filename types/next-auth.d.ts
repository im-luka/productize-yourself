import "next-auth";
import { User as PrismaUser } from "@prisma/client";

export type SessionUser = Pick<
  PrismaUser,
  "id" | "firstName" | "lastName" | "email"
>;

declare module "next-auth" {
  export interface Session {
    user?: SessionUser;
    token?: string;
  }

  interface User extends PrismaUser {}
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: SessionUser;
  }
}
