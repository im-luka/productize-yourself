import { Project } from "@/types/project";
import { Card, Stack, Text, Title } from "@mantine/core";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { Link } from "../base/link";
import { paths } from "@/navigation/paths";

type Props = {
  project: Project;
};

export const ProjectItem: FC<Props> = (props) => {
  const { id, name, emoji, excerpt, teamLabel } = useProjectItem(props);

  return (
    <Link href={paths.project(id)}>
      <Card w="100%" h="100%" withBorder>
        <Stack h="100%" align="center" justify="space-between">
          <Stack>
            <Text fz={72} lh={1} ta="center">
              {emoji}
            </Text>
            <Stack gap={0}>
              <Title ta="center">{name}</Title>
              <Text ta="center">{excerpt}</Text>
            </Stack>
          </Stack>
          <Text ta="center" c="primary.2" fw={600}>
            {teamLabel}
          </Text>
        </Stack>
      </Card>
    </Link>
  );
};

function useProjectItem({ project }: Props) {
  const t = useTranslations("projects.project");
  const { id, name, emoji, excerpt, users } = project;
  const teamLabel = t("teamCount", { count: users.length });

  return { id, name, emoji, excerpt, teamLabel };
}
