import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import React from "react";
import { useState } from "react";
import { useTheme, useToggleTheme } from "../../Contexts/ThemeContext";
import { styled } from "../../styles/stitches.config";
import { darkTheme } from "../../styles/themes/darkTheme";
import { sizing, spacing } from "../../styles/utils";

const Button = styled("button", {
  width: sizing(44),
  height: sizing(44),
  borderRadius: "$cornered",
  cursor: "pointer",
  border: "1px solid $textColor",
  marginLeft: spacing(1),

  "&:disabled": {
    cursor: "not-allowed",
  },

  variants: {
    active: {
      true: {},
    },
    dark: { true: {} },
    light: { true: {} },
  },

  compoundVariants: [
    {
      dark: true,
      active: true,
      light: false,
      css: {
        color: "$textColor",
        background: "$backgroundColor",
      },
    },
    {
      light: true,
      active: false,
      dark: false,
      css: {
        background: "$textColor",
        color: "$backgroundColor",
      },
    },
    {
      light: true,
      active: true,
      dark: false,
      css: {
        color: "$textColor",
        background: "$backgroundColor",
      },
    },
    {
      dark: true,
      active: false,
      light: false,
      css: {
        background: "$textColor",
        color: "$backgroundColor",
      },
    },
  ],

  defaultVariants: {
    light: false,
    dark: false,
  },
});

const ButtonContainer = styled("div", {
  paddingRight: spacing(0),
  display: "flex",
  flex: 1,
  justifyContent: "flex-end",
});

export function ThemeSwitcher() {
  const theme = useTheme();
  const toggleTheme = useToggleTheme();

  return (
    <ButtonContainer role="group">
      <Button
        active={theme === "dark"}
        onClick={toggleTheme}
        aria-label="Dark Theme"
        data-splitbee-event="Change theme"
        data-splitbee-event-theme="Dark theme"
        aria-current={theme === "dark"}
        dark
        disabled={theme === "dark"}
      >
        <MoonIcon width={20} height={20} />
      </Button>
      <Button
        active={theme === "light"}
        data-splitbee-event="Change theme"
        data-splitbee-event-theme="Light theme"
        onClick={toggleTheme}
        aria-label="Light Theme"
        aria-current={theme === "light"}
        light
        disabled={theme === "light"}
      >
        <SunIcon width={20} height={20} />
      </Button>
    </ButtonContainer>
  );
}
