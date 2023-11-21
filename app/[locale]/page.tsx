import { useTranslations } from "next-intl";
import { Box, Title } from "@mantine/core";

export default function Home() {
  const t = useTranslations();

  return (
    <Box w={250} h={250} bg="cyan">
      <Title c="white">{t("appName")}</Title>
    </Box>
  );
}
