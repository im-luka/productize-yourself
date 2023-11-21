"use client";

import { FC, ReactNode } from "react";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { colors } from "./colors";
import { typography } from "./typography";
import { spacing } from "./spacing";

type Props = {
  children: ReactNode;
};

const theme = createTheme({
  ...colors,
  ...typography,
  spacing,
});

export const ThemeProvider: FC<Props> = ({ children }) => {
  return (
    <MantineProvider theme={theme}>
      <Notifications
        position="top-right"
        limit={3}
        containerWidth={300}
        transitionDuration={500}
      />
      {children}
    </MantineProvider>
  );
};
