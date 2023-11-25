"use client";

import { FC } from "react";
import { Project } from "@/types/project";
import { useParams } from "next/navigation";
import { Link } from "../base/link";
import { paths } from "@/navigation/paths";
import { Group, Text } from "@mantine/core";
import styles from "@/styles/components/projects-sidebar.module.scss";

type Props = {
  project: Project;
};

export const ProjectSidebarItem: FC<Props> = (props) => {
  const { id, name, emoji, isActive } = useProjectSidebarItem(props);

  return (
    <Link href={paths.project(id)}>
      <Group
        gap="sm"
        p="xs"
        bg={isActive ? "primary" : "transparent"}
        className={styles.item}
      >
        <Text>{emoji}</Text>
        <Text c={isActive ? "neutral.9" : "unset"} fw={600}>
          {name}
        </Text>
      </Group>
    </Link>
  );
};

function useProjectSidebarItem({
  project: { id: projectId, name, emoji },
}: Props) {
  const { id } = useParams();
  const isActive = projectId === id;

  return { id: projectId, name, emoji, isActive };
}
