import { Header } from "@/app/_components/header";
import { authOptions } from "@/domain/auth";
import { Box } from "@mantine/core";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default async function HomeLayout({ children }: Props) {
  const { isLoggedIn } = await useHomeLayout();

  return (
    <Box w="100%" h="100%">
      <Header isLoggedIn={isLoggedIn} />
      {children}
    </Box>
  );
}

async function useHomeLayout() {
  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session?.user?.id;

  return { isLoggedIn };
}
