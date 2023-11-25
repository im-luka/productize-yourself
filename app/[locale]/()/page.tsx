import { Center } from "@mantine/core";
import { withPrivatePage } from "@/app/_hoc/with-private-page";
import { ProjectsWrapper } from "@/app/_components/projects/projects-wrapper";
import { getProjects } from "@/domain/actions/projects";
import { getServerSession } from "next-auth";
import { authOptions } from "@/domain/auth";
import { ProjectAdd } from "@/app/_components/projects/project-add";
import { getUsers } from "@/domain/actions/user";

async function HomePage() {
  const { projects, users } = await useHomePage();

  return (
    <Center h="100%">
      <ProjectsWrapper projects={projects} />
      <ProjectAdd users={users} />
    </Center>
  );
}

async function useHomePage() {
  const session = await getServerSession(authOptions);
  const projects = await getProjects(session?.user?.id);
  const users = await getUsers();

  return { projects: projects.data ?? [], users: users.data ?? [] };
}

export default withPrivatePage(HomePage);
