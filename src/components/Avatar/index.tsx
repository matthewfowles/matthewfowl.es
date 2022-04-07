import React from "react";
import { styled } from "../../styles/stitches.config";
import { sizing, spacing } from "../../styles/utils";
import Image from "../Image";

const StyledImage = styled(Image, {
  width: sizing(200),
  borderRadius: "$round",
  marginBottom: spacing(2),
  boxShadow: "$drop",
});

export function Avatar() {
  return <StyledImage src="portrait.png" alt="Matt Fowles" role="avatar" />;
}
