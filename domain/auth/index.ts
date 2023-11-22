import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../db/prisma-client";
import { login } from "../actions/auth";
import { SessionUser } from "@/types/next-auth";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        return await login(credentials!);
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token = {
          ...token,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email!,
          },
        };
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token && token.user) {
        session.user = token.user as SessionUser;
        session.token = token.jti as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days session storage
  },
  secret: process.env.NEXTAUTH_SECRET,
};
