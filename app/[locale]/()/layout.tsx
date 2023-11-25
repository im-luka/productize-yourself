import { Header } from "@/app/_components/header";
import { Box } from "@mantine/core";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function HomeLayout({ children }: Props) {
  return (
    <Box w="100%" h="100%">
      <Header />
      {children}
    </Box>
  );
}
