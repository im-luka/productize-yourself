"use client";

import { FC } from "react";
import { ActionIcon, Divider, Group, Stack, Title } from "@mantine/core";
import { Project } from "@/types/project";
import { ProjectSidebarItem } from "./project-sidebar-item";
import styles from "@/styles/components/projects-sidebar.module.scss";
import { User } from "@prisma/client";
import { useDisclosure } from "@mantine/hooks";
import { ProjectAddModal } from "../modals/project-add-modal";
import { IconPlus } from "@tabler/icons-react";

type Props = {
  title: string;
  projects: Project[];
  users: User[];
};

export const ProjectsSidebar: FC<Props> = (props) => {
  const { title, projects, users, isOpen, open, close } =
    useProjectsSidebar(props);

  const renderProject = (project: Project) => (
    <ProjectSidebarItem key={project.id} project={project} />
  );

  return (
    <Stack h="100%" pr="lg" py="md" gap="xl" className={styles.projectsSidebar}>
      <Group gap="xl" justify="space-between">
        <Title order={6}>{title}</Title>
        <ActionIcon size="xs" variant="default" onClick={open}>
          <IconPlus />
        </ActionIcon>
      </Group>
      <Divider />
      <Stack gap="xs">{projects.map(renderProject)}</Stack>
      <ProjectAddModal isOpen={isOpen} onClose={close} users={users} />
    </Stack>
  );
};

function useProjectsSidebar({ title, projects, users }: Props) {
  const [isOpen, { open, close }] = useDisclosure(false);

  return { title, projects, users, isOpen, open, close };
}
