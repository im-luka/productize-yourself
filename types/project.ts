import { Prisma } from "@prisma/client";

export type Project = Prisma.ProjectGetPayload<{ include: { users: true } }>;
