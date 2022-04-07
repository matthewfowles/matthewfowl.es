import { globalCss } from "./stitches.config";

export const globalStyles = globalCss({
  "*": {
    boxSizing: "border-box",
    transition:
      "color 0.4s ease, border-color 0.4s ease, background-color 0.4s ease, box-shadow 0.4s ease",
  },

  "*::selection": {
    color: "$backgroundColor",
    background: "$textColor",
  },

  body: {
    fontFamily: '"Teko", sans-serif',
    color: "$textColor",
    textAlign: "center",
    margin: 0,
    backgroundColor: "$backgroundColor",
    fontSize: "$body",
    fontWeight: "$body",
    letterSpacing: "$body",
  },
});
