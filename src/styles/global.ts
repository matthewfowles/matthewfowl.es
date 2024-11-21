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
    background:
      "radial-gradient(circle farthest-side at 0% 50%,$backgroundColor 23.5%,$transparent 0)42px 60px,radial-gradient(circle farthest-side at 0% 50%,$borderColor 24%,$transparent 0)38px 60px,linear-gradient($backgroundColor 14%,$transparent 0, $transparent 85%,$backgroundColor 0)0 0,linear-gradient(150deg,$backgroundColor 24%,$borderColor 0,$borderColor 26%,$transparent 0,$transparent 74%,$borderColor 0,$borderColor 76%,$backgroundColor 0)0 0,linear-gradient(30deg,$backgroundColor 24%,$borderColor 0,$borderColor 26%,$transparent 0,$transparent 74%,$borderColor 0,$borderColor 76%,$backgroundColor 0)0 0,linear-gradient(90deg,$borderColor 2%,$backgroundColor 0,$backgroundColor 98%,$borderColor 0%)0 0 $backgroundColor;",
    backgroundSize: "80px 120px",
  },
});
