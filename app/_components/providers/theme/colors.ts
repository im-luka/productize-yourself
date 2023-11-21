import { MantineTheme, MantineColorsTuple } from "@mantine/core";

type ColorsType = { colors: Record<string, MantineColorsTuple> } & Pick<
  MantineTheme,
  "primaryColor" | "primaryShade" | "white" | "black"
>;

export const colors: ColorsType = {
  colors: {
    primary: [
      "#DDFEFF",
      "#C8F7FF",
      "#97EEFF",
      "#60E3FF",
      "#36DAFF",
      "#18D5FF",
      "#00D2FF",
      "#00B9E5",
      "#00A6CD",
      "#0090B5",
    ],
    neutral: [
      "#FBFAF9",
      "#F6F5F3",
      "#EBE9E5",
      "#DCD5C7",
      "#B0A99C",
      "#80796B",
      "#635B4B",
      "#524A38",
      "#37301F",
      "#272011",
    ],
    background: [
      "#0D1F2D",
      "#162A38",
      "#1F3543",
      "#28404E",
      "#314B58",
      "#3A5663",
      "#43616D",
      "#4C6C78",
      "#557783",
      "#031215",
    ],
  },
  primaryColor: "primary",
  primaryShade: 5,
  white: "#ffffff",
  black: "#000000",
};
