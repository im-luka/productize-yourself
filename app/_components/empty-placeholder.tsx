"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { Stack, Text, Title } from "@mantine/core";
import Lottie from "lottie-react";
import emptyPlaceholder from "@/public/images/empty-placeholder.json";
import styles from "@/styles/components/empty-placeholder.module.scss";

type Props = {
  title?: string;
  description?: string;
};

export const EmptyPlaceholder: FC<Props> = (props) => {
  const { title, description } = useEmptyPlaceholder(props);

  return (
    <Stack gap={0}>
      <Lottie
        animationData={emptyPlaceholder}
        loop={false}
        className={styles.emptyLottie}
      />
      <Stack mt={-50} gap="xs">
        <Title ta="center">{title}</Title>
        <Text ta="center">{description}</Text>
      </Stack>
    </Stack>
  );
};

function useEmptyPlaceholder({
  title: titleProp,
  description: descriptionProp,
}: Props) {
  const t = useTranslations("shared.empty");
  const title = titleProp ?? t("title");
  const description = descriptionProp ?? t("description");

  return { title, description };
}
