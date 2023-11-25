import { FC } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Group } from "@mantine/core";
import { HEADER_PORTAL_CONTAINER_ID } from "@/util/constants";
import logo from "@/public/logo.png";
import styles from "@/styles/components/header.module.scss";
import { Link } from "./base/link";
import { paths } from "@/navigation/paths";

export const Header: FC = () => {
  const { t } = useHeader();

  return (
    <Group
      justify="space-between"
      px={72}
      pos="fixed"
      top={3}
      left={0}
      right={0}
    >
      <Link href={paths.home()}>
        <Image src={logo} width={100} height={100} alt={t("logoAlt")} />
      </Link>
      <div id={HEADER_PORTAL_CONTAINER_ID} />
    </Group>
  );
};

function useHeader() {
  const t = useTranslations("shared");

  return { t };
}