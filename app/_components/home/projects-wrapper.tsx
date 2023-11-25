import { FC } from "react";
import { useTranslations } from "next-intl";
import { Title } from "@mantine/core";
import { Project } from "@prisma/client";
import { ResponseData } from "@/domain/types/response-data";
import { EmptyPlaceholder } from "../empty-placeholder";

type Props = {
  projects: ResponseData<Project[]>;
};

export const ProjectsWrapper: FC<Props> = (props) => {
  const { t, projects } = useProjectsWrapper(props);

  if (!projects.data?.length) {
    return (
      <EmptyPlaceholder
        title={t("empty.title")}
        description={t("empty.description")}
      />
    );
  }

  return <Title>Projects Wrapper</Title>;
};

function useProjectsWrapper({ projects }: Props) {
  const t = useTranslations("projects");

  return { t, projects };
}
