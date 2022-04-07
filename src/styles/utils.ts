export const BASE_FONT_SIZE = 16;

export const sizing = (num: number) => `${num / BASE_FONT_SIZE}rem`;
export const spacing = (multiplier: number) =>
  `${(8 * multiplier) / BASE_FONT_SIZE}rem`;
