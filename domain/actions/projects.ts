"use server";

import { prisma } from "../db/prisma-client";
import { ResponseData } from "../types/response-data";
import { StatusCode } from "../types/status-code";
import { CreateProjectData } from "../types/project-data";
import { Project } from "@/types/project";
import { revalidatePath } from "next/cache";
import { paths } from "@/navigation/paths";

export const getProjects = async (
  userId?: string
): Promise<ResponseData<Project[]>> => {
  if (!userId) {
    throw new Error("noUserId");
  }

  const projects = await prisma.project.findMany({
    where: { users: { some: { user: { id: userId } } } },
    include: { users: true },
  });

  return {
    status: StatusCode.Success,
    data: projects,
  };
};

export const createProject = async ({
  name,
  emoji,
  excerpt,
  description,
  users,
}: CreateProjectData): Promise<ResponseData> => {
  try {
    const project = await prisma.project.create({
      data: { name, emoji, excerpt, description },
    });

    const userProjects = users.map((userId) => ({
      userId,
      projectId: project.id,
    }));
    await prisma.userProjects.createMany({
      data: userProjects,
    });

    revalidatePath(paths.home());
    return {
      status: StatusCode.Success,
      message: "projectAdded",
    };
  } catch (error) {
    return { status: StatusCode.Error };
  }
};
