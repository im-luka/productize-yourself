import { Montserrat } from "next/font/google";
import { MantineTheme, rem } from "@mantine/core";

const baseFont = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const baseFontSize = 16;

const baseHeadingFontWeight = "700";

type TypographyProps = Pick<
  MantineTheme,
  "fontFamily" | "fontSizes" | "lineHeights" | "headings"
>;

export const typography: TypographyProps = {
  fontFamily: baseFont.style.fontFamily,
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(baseFontSize),
    lg: rem(18),
    xl: rem(20),
  },
  lineHeights: {
    xs: rem(16),
    sm: rem(16),
    md: rem(22),
    lg: rem(28),
    xl: rem(28),
  },
  headings: {
    fontFamily: baseFont.style.fontFamily,
    fontWeight: baseHeadingFontWeight,
    sizes: {
      h1: {
        fontSize: rem(40),
        lineHeight: rem(48),
      },
      h2: {
        fontSize: rem(36),
        lineHeight: rem(44),
      },
      h3: {
        fontSize: rem(32),
        lineHeight: rem(40),
      },
      h4: {
        fontSize: rem(28),
        lineHeight: rem(36),
        fontWeight: "600",
      },
      h5: {
        fontSize: rem(24),
        lineHeight: rem(32),
        fontWeight: "600",
      },
      h6: {
        fontSize: rem(20),
        lineHeight: rem(28),
        fontWeight: "600",
      },
    },
  },
};
