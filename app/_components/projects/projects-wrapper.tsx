import { FC } from "react";
import { useTranslations } from "next-intl";
import { Grid, GridCol } from "@mantine/core";
import { EmptyPlaceholder } from "../empty-placeholder";
import { Project } from "@/types/project";
import { ProjectItem } from "./project-item";

type Props = {
  projects: Project[];
};

export const ProjectsWrapper: FC<Props> = (props) => {
  const { t, projects } = useProjectsWrapper(props);

  if (!projects.length) {
    return (
      <EmptyPlaceholder
        title={t("empty.title")}
        description={t("empty.description")}
      />
    );
  }

  const renderProject = (project: Project) => (
    <GridCol key={project.id} span={4}>
      <ProjectItem project={project} />
    </GridCol>
  );

  return <Grid w="100%">{projects.map(renderProject)}</Grid>;
};

function useProjectsWrapper({ projects }: Props) {
  const t = useTranslations("projects");

  return { t, projects };
}
