"use client";

import { FC } from "react";
import { Button, Group, Portal } from "@mantine/core";
import { HEADER_PORTAL_CONTAINER_ID } from "@/util/constants";
import { useTranslations } from "next-intl";
import { IconArrowBack, IconPlus } from "@tabler/icons-react";
import { useRouter } from "@/navigation";
import { paths } from "@/navigation/paths";

export const ProjectActions: FC = () => {
  const { t, handleBack } = useProjectActions();

  return (
    <Portal target={`#${HEADER_PORTAL_CONTAINER_ID}`}>
      <Group>
        <Button
          variant="outline"
          leftSection={<IconArrowBack />}
          onClick={handleBack}
        >
          {t("backAction")}
        </Button>
        <Button leftSection={<IconPlus />}>{t("addAction")}</Button>
      </Group>
    </Portal>
  );
};

function useProjectActions() {
  const t = useTranslations("project");
  const { replace } = useRouter();

  const handleBack = () => {
    replace(paths.projects());
  };

  return { t, handleBack };
}
