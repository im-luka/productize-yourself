import { CSSVariablesResolver, MantineThemeOther, rem } from "@mantine/core";
import { CONTENT_MAX_WIDTH, MAX_HEADER_HEIGHT } from "@/util/constants";

export const other: MantineThemeOther = {
  widthMaxContent: rem(CONTENT_MAX_WIDTH),
  maxHeightHeader: rem(MAX_HEADER_HEIGHT),
};

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--mantine-width-max-content": theme.other.widthMaxContent,
    "--mantine-max-height-header": theme.other.maxHeightHeader,
  },
  dark: {},
  light: {},
});
