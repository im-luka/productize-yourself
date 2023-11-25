import { Center } from "@mantine/core";
import { withPrivatePage } from "@/app/_hoc/with-private-page";
import { ProjectsWrapper } from "@/app/_components/projects/projects-wrapper";
import { getProjects } from "@/domain/actions/projects";
import { getServerSession } from "next-auth";
import { authOptions } from "@/domain/auth";
import { ProjectAdd } from "@/app/_components/projects/project-add";

async function HomePage() {
  const { projects } = await useHomePage();

  return (
    <Center h="100%">
      <ProjectsWrapper projects={projects} />
      <ProjectAdd />
    </Center>
  );
}

async function useHomePage() {
  const session = await getServerSession(authOptions);
  const projects = await getProjects(session?.user?.id);

  return { projects };
}

export default withPrivatePage(HomePage);
