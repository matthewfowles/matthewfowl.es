import React from "react";
import ThemeContextProvider from "./src/Contexts/ThemeContext";
import HeadContextProvider from "./src/Contexts/HeadContext";

export const wrapRootElement = ({ element }) => {
  return (
    <HeadContextProvider>
      <ThemeContextProvider>{element}</ThemeContextProvider>
    </HeadContextProvider>
  );
};
