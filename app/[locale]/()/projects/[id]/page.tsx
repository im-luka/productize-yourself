import { getServerSession } from "next-auth";
import { authOptions } from "@/domain/auth";
import { getProjects } from "@/domain/actions/projects";
import { Group } from "@mantine/core";
import { ProjectsSidebar } from "@/app/_components/projects/projects-sidebar";
import { getTranslations } from "next-intl/server";

type Params = { locale: string; id: string };
type Props = { params: Params };

export default async function ProjectPage(props: Props) {
  const { t, projects } = await useProjectPage(props);

  return (
    <Group h="100%" align="flex-start">
      <ProjectsSidebar title={t("sidebarTitle")} projects={projects} />
    </Group>
  );
}

async function useProjectPage({ params: { id } }: Props) {
  const t = await getTranslations("project");
  const session = await getServerSession(authOptions);
  const projects = await getProjects(session?.user?.id);

  return { t, projects: projects.data ?? [] };
}
