import { MantineThemeComponents, Text, Title } from "@mantine/core";

export const components: MantineThemeComponents = {
  Text: Text.extend({
    defaultProps: {
      c: "neutral.0",
    },
  }),
  Title: Title.extend({
    defaultProps: {
      c: "neutral.0",
    },
  }),
};
