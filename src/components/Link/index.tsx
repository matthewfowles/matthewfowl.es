import React, { ReactNode } from "react";
import { styled } from "../../styles/stitches.config";
import { sizing, spacing } from "../../styles/utils";

export type LinkProps = {
  href: string;
  children: ReactNode;
  ariaLabel: string;
  eventLabel?: string;
};

const ExternalLink = styled("a", {
  color: "$linkColor",
  textDecoration: "none",
  display: "inline-block",
  position: "relative",
  outline: "none",
  margin: `${spacing(1)} ${spacing(2)}`,
  minWidth: sizing(44),
  textAlign: "center",

  "&:visited": {
    color: "$linkColor",
  },

  "&::after": {
    content: "",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "0%",
    height: sizing(2),
    background: "$linkColor",
    transition: "width 0.4s ease",
  },

  "&::before": {
    content: "",
    position: "absolute",
    top: 0,
    left: 0,
    width: "0%",
    borderTop: `${sizing(2)} dashed $linkColor`,
    transition: "width 0.4s ease",
  },

  "&:hover::after, &:focus::before": {
    width: "100%",
  },
});

export function Link({
  href,
  children,
  ariaLabel,
  eventLabel = "unregistered event",
}: LinkProps) {
  return (
    <ExternalLink
      href={href}
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
      data-splitbee-event={eventLabel}
    >
      {children}
    </ExternalLink>
  );
}
