import React from "react";
import { styled } from "../../styles/stitches.config";
import { sizing, spacing } from "../../styles/utils";
import Image from "../Image";

const StyledImage = styled(Image, {
  width: sizing(200),
  marginBottom: spacing(8),
  "@tablet": {
    width: sizing(300),
  },
});

export function Avatar() {
  return <StyledImage src="portrait.svg" alt="Matt Fowles" role="img" />;
}
