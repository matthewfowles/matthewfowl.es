import { styled } from "../../styles/stitches.config";
import { sizing, spacing } from "../../styles/utils";

export const Pill = styled("span", {
  padding: `${spacing(0.5)} ${spacing(1)}`,
  marginRight: `${spacing(1)}`,
  marginTop: `${spacing(1)}`,
  border: `${sizing(2)} solid $textColor`,
  borderRadius: "$cornered",
  display: "inline-block",
  color: "$textColor",
  fontFamily: "$heading",
  letterSpacing: "$link",
});

export const PillContainer = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  gap: spacing(1),
  padding: `${spacing(2)} 0`,
});
