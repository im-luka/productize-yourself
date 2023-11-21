import { useTranslations } from "next-intl";
import { Box, Title } from "@mantine/core";

export default function Home() {
  const t = useTranslations();

  return (
    <Box bg="red.3">
      <Title c="blue">{t("appName")}</Title>
    </Box>
  );
}
