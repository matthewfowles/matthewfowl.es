import React from "react";
import { CSS } from "@stitches/react";
import { ReactNode } from "react";
import { styled } from "../../styles/stitches.config";
import { StyledComponent } from "@stitches/react/types/styled-component";

const Text = styled("span", {
  fontFamily: "$heading",
  margin: "8px 0",
  color: "$textColor",
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
        fontSize: "$body",
        fontWeight: "$body",
        letterSpacing: "$body",
      },
      heading1: {
        fontSize: "$heading",
        fontWeight: "$heading",
        letterSpacing: "$heading",
      },
      heading2: {
        fontSize: "$subHeading",
        fontWeight: "$subHeading",
        letterSpacing: "$subHeading",
      },
      link: {
        fontSize: "$link",
        fontWeight: "$link",
        letterSpacing: "$link",
        color: "$linkColor",
      },
    },
  },
});

export type TypographyProps = {
  children: ReactNode;
  align?: "justify" | "left" | "right" | "center";
  as?: "p" | "h1" | "h2" | StyledComponent;
  css?: CSS;
  variant?: "heading1" | "heading2" | "link" | "body";
};

export function Typography({
  children,
  as,
  css,
  align,
  variant = "body",
}: TypographyProps) {
  return (
    <Text as={as} css={css} align={align} variant={variant}>
      {children}
    </Text>
  );
}