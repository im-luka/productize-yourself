"use server";

import { User } from "@prisma/client";
import { ResponseData } from "../types/response-data";
import { prisma } from "../db/prisma-client";
import { StatusCode } from "../types/status-code";

export const getUsers = async (): Promise<ResponseData<User[]>> => {
  try {
    const users = await prisma.user.findMany();
    return {
      status: StatusCode.Success,
      data: users,
    };
  } catch (error) {
    return {
      status: StatusCode.Error,
    };
  }
};
