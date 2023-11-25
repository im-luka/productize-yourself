"use client";

import { useTranslations } from "next-intl";
import { Button, Center, Stack, Title } from "@mantine/core";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error(props: Props) {
  const { t, error, reset } = useError(props);

  return (
    <Center h="100%">
      <Stack gap="xl" align="center">
        <Title c="red.7">{t(error.message ?? "general")}</Title>
        <Button size="lg" onClick={reset}>
          {t("resetAction")}
        </Button>
      </Stack>
    </Center>
  );
}

function useError({ error, reset }: Props) {
  const t = useTranslations("notification.error");

  return { t, error, reset };
}
