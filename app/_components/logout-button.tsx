"use client";

import { Avatar, Button } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { FC } from "react";

export const LogoutButton: FC = () => {
  const { label, avatarLabel, handleLogout } = useLogoutButton();

  return (
    <Button
      variant="transparent"
      p={0}
      leftSection={
        <Avatar color="primary" mr="xs">
          {avatarLabel}
        </Avatar>
      }
      rightSection={<IconLogout color="red" />}
      onClick={handleLogout}
    >
      {label}
    </Button>
  );
};

function useLogoutButton() {
  const t = useTranslations("component.logoutButton");
  const { data } = useSession();

  const label = t("logoutAction");
  const avatarLabel = `${data?.user?.firstName[0]}${data?.user?.lastName[0]}`;

  const handleLogout = async () => {
    await signOut();
  };

  return { label, avatarLabel, handleLogout };
}
