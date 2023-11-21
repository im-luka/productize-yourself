import { useTranslations } from "next-intl";
import { Box, Title } from "@mantine/core";

export default function Home() {
  const t = useTranslations();

  return (
    <Box bg="primary">
      <Title>{t("appName")}</Title>
    </Box>
  );
}
