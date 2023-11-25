import { Header } from "@/app/_components/header";
import { Box, Stack } from "@mantine/core";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function HomeLayout({ children }: Props) {
  return (
    <Stack h="100%">
      <Header />
      <Box h="100%">{children}</Box>
    </Stack>
  );
}
