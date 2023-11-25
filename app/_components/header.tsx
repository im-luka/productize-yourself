import { FC } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Divider, Group } from "@mantine/core";
import {
  CONTENT_MAX_WIDTH,
  HEADER_PORTAL_CONTAINER_ID,
  MAX_HEADER_HEIGHT,
} from "@/util/constants";
import { Link } from "./base/link";
import { paths } from "@/navigation/paths";
import { LogoutButton } from "./logout-button";
import logo from "@/public/logo.png";

type Props = {
  isLoggedIn: boolean;
};

export const Header: FC<Props> = (props) => {
  const { t, isLoggedIn } = useHeader(props);

  return (
    <Group
      justify="space-between"
      maw={CONTENT_MAX_WIDTH}
      mah={MAX_HEADER_HEIGHT}
      mx="auto"
      px={72}
      pos="fixed"
      top={0}
      left={0}
      right={0}
      bg="background.9"
      style={{ zIndex: 1 }}
    >
      <Link href={paths.home()}>
        <Image src={logo} width={100} height={100} alt={t("logoAlt")} />
      </Link>
      <Group gap="xl">
        <div id={HEADER_PORTAL_CONTAINER_ID} />
        <Divider orientation="vertical" />
        {isLoggedIn && <LogoutButton />}
      </Group>
    </Group>
  );
};

function useHeader({ isLoggedIn }: Props) {
  const t = useTranslations("shared");

  return { t, isLoggedIn };
}
