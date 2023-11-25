import { Project } from "@/types/project";

export type CreateProjectData = Pick<
  Project,
  "name" | "emoji" | "excerpt" | "description"
> & { users: string[] };
