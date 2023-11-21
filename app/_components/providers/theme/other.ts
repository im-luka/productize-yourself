import { CSSVariablesResolver, MantineThemeOther, rem } from "@mantine/core";
import { CONTENT_MAX_WIDTH } from "@/util/constants";

export const other: MantineThemeOther = {
  widthMaxContent: rem(CONTENT_MAX_WIDTH),
};

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--mantine-width-max-content": theme.other.widthMaxContent,
  },
  dark: {},
  light: {},
});
