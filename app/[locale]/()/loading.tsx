import { useTranslations } from "next-intl";
import { Center, Loader, Stack, Title } from "@mantine/core";

export default function Loading() {
  const { title } = useLoading();

  return (
    <Center h="100%">
      <Stack align="center" gap="xl">
        <Loader size="xl" />
        <Title>{title}</Title>
      </Stack>
    </Center>
  );
}

function useLoading() {
  const t = useTranslations("shared");
  const title = t("loadingPlaceholder");

  return { title };
}
