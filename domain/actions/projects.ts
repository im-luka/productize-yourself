"use server";

import { Project } from "@prisma/client";
import { prisma } from "../db/prisma-client";
import { ResponseData } from "../types/response-data";
import { StatusCode } from "../types/status-code";

export const getProjects = async (
  userId?: string
): Promise<ResponseData<Project[]>> => {
  if (!userId) {
    throw new Error("noUserId");
  }

  const projects = await prisma.project.findMany({
    where: { users: { some: { id: userId } } },
  });

  return {
    status: StatusCode.Success,
    data: projects,
  };
};
