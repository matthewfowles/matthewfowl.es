import { createStitches } from "@stitches/react";
import { sizing, spacing } from "./utils";

export const { styled, css, getCssText, globalCss, createTheme } =
  createStitches({
    theme: {
      fontSizes: {
        heading: sizing(36),
        headingTablet: sizing(56),
        subHeading: sizing(28),
        h3: sizing(22),
        link: sizing(24),
        body: sizing(16),
      },
      fontWeights: {
        heading: 500,
        subHeading: 300,
        h3: 500,
        link: 300,
        body: 400,
      },
      fonts: {
        heading: `"Teko", sans-serif`,
        body: `'Poppins', sans-serif`,
      },
      borderStyles: {},
      borderWidths: {},
      radii: {
        round: "50%",
        cornered: sizing(4),
      },
      shadows: {
        drop: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      },
      zIndices: {},
      sizes: {},
      letterSpacings: {
        heading: sizing(4),
        subHeading: sizing(2),
        h3: sizing(1),
        link: sizing(2),
        body: sizing(0.1),
      },
      lineHeights: {
        heading: "inherit",
        subHeading: "auto",
        h3: "auto",
        link: "auto",
        body: spacing(3.2),
      },
      space: {},
      transitions: {},
      colors: {
        backgroundColor: "#ffffff",
        textColor: "hsl(0deg 0% 27%)",
        linkColor: "hsl(250deg 100% 27%)",
        bodyColor: "hsl(0deg 0% 27%)",
      },
    },
    media: {
      tablet: `(min-width: ${sizing(768)})`, // Tablet
      desktop: `(min-width: ${sizing(1024)})`, // Desktop
      wide: `(min-width: ${sizing(1280)})`, // Large desktop
    },
    utils: {},
  });
