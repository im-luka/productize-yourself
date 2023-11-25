import { getServerSession } from "next-auth";
import { authOptions } from "@/domain/auth";
import { getProjects } from "@/domain/actions/projects";
import { Group } from "@mantine/core";
import { ProjectsSidebar } from "@/app/_components/projects/projects-sidebar";
import { getUsers } from "@/domain/actions/user";
import { ProjectActions } from "@/app/_components/projects/project-actions";
import { withPrivatePage } from "@/app/_hoc/with-private-page";

type Params = { locale: string; id: string };
type Props = { params: Params };

async function ProjectPage(props: Props) {
  const { projects, users } = await useProjectPage(props);

  return (
    <Group h="100%" align="flex-start">
      <ProjectsSidebar projects={projects} users={users} />
      <ProjectActions />
    </Group>
  );
}

async function useProjectPage({ params: { id } }: Props) {
  const session = await getServerSession(authOptions);
  const projects = await getProjects(session?.user?.id);
  const users = await getUsers();

  return { projects: projects.data ?? [], users: users.data ?? [] };
}

export default withPrivatePage(ProjectPage);
