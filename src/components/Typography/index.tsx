import React from "react";
import { CSS } from "@stitches/react";
import { ReactNode } from "react";
import { styled } from "../../styles/stitches.config";
import { StyledComponent } from "@stitches/react/types/styled-component";
import { spacing } from "../../styles/utils";

const Text = styled("span", {
  fontFamily: "$heading",
  margin: "0",
  color: "$textColor",
  textDecoration: "none",
  variants: {
    align: {
      center: {
        textAlign: "center",
      },
      justify: {
        textAlign: "justify",
      },
      left: {
        textAlign: "left",
      },
      right: {
        textAlign: "right",
      },
    },
    variant: {
      body: {
        fontFamily: "$body",
        fontSize: "$body",
        fontWeight: "$body",
        letterSpacing: "$body",
        lineHeight: "$body",
        color: "$textColor",
        display: "inline",
      },
      heading1: {
        fontFamily: "$heading",
        fontSize: "$heading",
        fontWeight: "$heading",
        letterSpacing: "$heading",
        lineHeight: "$heading",
      },
      heading2: {
        fontFamily: "$heading",
        fontSize: "$subHeading",
        fontWeight: "$subHeading",
        letterSpacing: "$subHeading",
        paddingTop: spacing(3),
        paddingBottom: spacing(2.5),
        lineHeight: "$subHeading",
      },
      heading3: {
        fontFamily: "$heading",
        fontSize: "$h3",
        fontWeight: "$h3",
        letterSpacing: "$h3",
        paddingTop: spacing(3),
        paddingBottom: spacing(2.5),
        lineHeight: "$h3",
      },
      link: {
        fontFamily: "$heading",
        fontSize: "$link",
        fontWeight: "$link",
        letterSpacing: "$link",
        color: "$linkColor",
        lineHeight: "$link",
      },
    },
    isTablet: {
      true: {},
    },
  },
  compoundVariants: [
    {
      isTablet: true,
      variant: "heading1",
      css: {
        fontSize: "$headingTablet",
      },
    },
  ],
});

export type TypographyProps = {
  children: ReactNode;
  align?: "justify" | "left" | "right" | "center";
  as?: "p" | "h1" | "h2" | "h3" | StyledComponent | "span";
  css?: CSS;
  variant?: "heading1" | "heading2" | "heading3" | "link" | "body";
};

export function Typography({
  children,
  as,
  css,
  align,
  variant = "body",
}: TypographyProps) {
  return (
    <Text
      as={as}
      css={css}
      align={align}
      variant={variant}
      isTablet={{ "@tablet": true, "@initial": false }}
    >
      {children}
    </Text>
  );
}
