import {
  Card,
  MantineThemeComponents,
  Modal,
  Text,
  Title,
  rem,
} from "@mantine/core";

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
  Card: Card.extend({
    defaultProps: {
      p: "xl",
      radius: "lg",
    },
  }),
  Modal: Modal.extend({
    defaultProps: {
      centered: true,
      padding: "lg",
      radius: "lg",
    },
  }),
};
