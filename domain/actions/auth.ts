"use server";

import { hash, compare } from "bcrypt";
import { LoginData, RegisterData } from "../types/auth-data";
import { PASSWORD_HASH_SALT } from "@/util/constants";
import { prisma } from "../db/prisma-client";
import { StatusCode } from "../types/status-code";
import { ResponseData } from "../types/response-data";
import { User } from "@prisma/client";

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterData): Promise<ResponseData> => {
  const hashedPassword = await hash(password, PASSWORD_HASH_SALT);

  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    return {
      status: StatusCode.Error,
      message: "emailTaken",
    };
  }

  try {
    await prisma.user.create({
      data: { firstName, lastName, email, hashedPassword },
    });
    return { status: StatusCode.Success, message: "registration" };
  } catch (error) {
    return { status: StatusCode.Error };
  }
};

export const login = async ({ email, password }: LoginData): Promise<User> => {
  if (!email || !password) {
    throw new Error("invalidCredentials");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error("noEmail");
  }

  const isPasswordCorrect = await compare(password, user.hashedPassword);
  if (!isPasswordCorrect) {
    throw new Error("wrongPassword");
  }

  return user;
};
