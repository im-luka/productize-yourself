"use client";

import { HEADER_PORTAL_CONTAINER_ID } from "@/util/constants";
import { Button, Modal, Portal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { ProjectAddModal } from "../modals/project-add-modal";

export const ProjectAdd: FC = () => {
  const { t, isOpen, open, close } = useProjectAdd();

  return (
    <Portal target={`#${HEADER_PORTAL_CONTAINER_ID}`}>
      <Button leftSection={<IconPlus />} onClick={open}>
        {t("addAction")}
      </Button>
      <ProjectAddModal isOpen={isOpen} onClose={close} />
    </Portal>
  );
};

function useProjectAdd() {
  const t = useTranslations("projects");
  const [isOpen, { open, close }] = useDisclosure(false);

  return { t, isOpen, open, close };
}
