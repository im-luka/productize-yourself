"use client";

import { HEADER_PORTAL_CONTAINER_ID } from "@/util/constants";
import { Button, Modal, Portal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { ProjectAddModal } from "../modals/project-add-modal";
import { User } from "@prisma/client";

type Props = {
  users: User[];
};

export const ProjectAdd: FC<Props> = (props) => {
  const { t, users, isOpen, open, close } = useProjectAdd(props);

  return (
    <Portal target={`#${HEADER_PORTAL_CONTAINER_ID}`}>
      <Button leftSection={<IconPlus />} onClick={open}>
        {t("addAction")}
      </Button>
      <ProjectAddModal isOpen={isOpen} onClose={close} users={users} />
    </Portal>
  );
};

function useProjectAdd({ users }: Props) {
  const t = useTranslations("projects");
  const [isOpen, { open, close }] = useDisclosure(false);

  return { t, users, isOpen, open, close };
}
