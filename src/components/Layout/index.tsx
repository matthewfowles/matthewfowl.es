import React from "react";
import { ReactNode } from "react";
import { styled } from "../../styles/stitches.config";

const Wrapper = styled("main", {
  maxWidth: "100%",
});

export function Main({ children }: { children: ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}
