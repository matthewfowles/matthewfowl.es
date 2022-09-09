import { styled } from "../../styles/stitches.config";
import { spacing } from "../../styles/utils";

export const Pill = styled("span", {
  padding: `${spacing(0.5)} ${spacing(1)}`,
  display: "inline-block",
  color: "$textColor",
  fontSize: "$info",
});

export const PillContainer = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  gap: spacing(1),
  padding: `${spacing(2)} 0`,
});
