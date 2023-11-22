import { useTranslations } from "next-intl";
import { Box, Title } from "@mantine/core";
import { withPrivatePage } from "@/app/_hoc/with-private-page";

function HomePage() {
  const t = useTranslations();

  return (
    <Box bg="primary">
      <Title>{t("appName")}</Title>
    </Box>
  );
}

export default withPrivatePage(HomePage);
