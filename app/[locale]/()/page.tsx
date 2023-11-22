"use client";

import { useTranslations } from "next-intl";
import { signOut, useSession } from "next-auth/react";
import { Box, Button, Title } from "@mantine/core";

export default function Home() {
  const t = useTranslations();
  const session = useSession();
  console.log(session);

  return (
    <Box bg="primary">
      <Title>{t("appName")}</Title>
      <Button onClick={() => signOut()}>Log Out</Button>
    </Box>
  );
}
