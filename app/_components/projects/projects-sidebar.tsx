import { FC } from "react";
import { Divider, Stack, Title } from "@mantine/core";
import { Project } from "@/types/project";
import { ProjectSidebarItem } from "./project-sidebar-item";
import styles from "@/styles/components/projects-sidebar.module.scss";

type Props = {
  title: string;
  projects: Project[];
};

export const ProjectsSidebar: FC<Props> = (props) => {
  const { title, projects } = useProjectsSidebar(props);

  const renderProject = (project: Project) => (
    <ProjectSidebarItem key={project.id} project={project} />
  );

  return (
    <Stack h="100%" pr="lg" py="md" gap="xl" className={styles.projectsSidebar}>
      <Title order={6} ta="center">
        {title}
      </Title>
      <Divider />
      <Stack gap="xs">{projects.map(renderProject)}</Stack>
    </Stack>
  );
};

function useProjectsSidebar({ title, projects }: Props) {
  return { title, projects };
}
