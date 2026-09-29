import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const iconSize = { width: 512, height: 512 };
export const shareSize = { width: 1200, height: 630 };

const iconInk = {
  light: { hex: "#454545", text: "#ffffff" },
  dark: { hex: "#ffffff", text: "#454545" },
} as const;

export async function iconImage(mode: keyof typeof iconInk) {
  const { hex, text } = iconInk[mode];
  const teko = await readFile(join(process.cwd(), "lib/fonts/Teko-Medium.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: 512,
          height: 512,
          display: "flex",
          background: "transparent",
        }}
      >
        <svg width="512" height="512" viewBox="0 0 512 512" style={{ position: "absolute", left: 0, top: 0 }}>
          <polygon points="476,256 366,447 146,447 36,256 146,65 366,65" fill={hex} />
        </svg>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 28,
            width: 512,
            height: 512,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: text,
            fontFamily: "Teko",
            fontSize: 248,
            fontWeight: 500,
            letterSpacing: 6,
            lineHeight: 1,
          }}
        >
          MF
        </div>
      </div>
    ),
    {
      ...iconSize,
      fonts: [{ name: "Teko", data: teko, weight: 500, style: "normal" }],
    },
  );
}

const shareTheme = {
  light: { background: "#ffffff", line: "#f5f5f5", text: "#454545" },
  dark: { background: "#454545", line: "#4d4d4d", text: "#ffffff" },
} as const;

const avatarSize = 168;

function hexGrid(stroke: string) {
  const radius = 36;
  const horiz = radius * 1.5;
  const vert = radius * Math.sqrt(3);
  const cols = Math.ceil(shareSize.width / horiz) + 2;
  const rows = Math.ceil(shareSize.height / vert) + 2;
  const cells = [];

  for (let col = -1; col < cols; col++) {
    for (let row = -1; row < rows; row++) {
      const x = col * horiz;
      const y = row * vert + (Math.abs(col) % 2 === 1 ? vert / 2 : 0);
      const points = Array.from({ length: 6 }, (_, i) => {
        const angle = (Math.PI / 3) * i;
        return `${(x + radius * Math.cos(angle)).toFixed(1)},${(y + radius * Math.sin(angle)).toFixed(1)}`;
      }).join(" ");
      cells.push(
        <polygon key={`${col}-${row}`} points={points} fill="transparent" stroke={stroke} strokeWidth={1} />,
      );
    }
  }

  return cells;
}

export async function shareImage(locale: string, mode: keyof typeof shareTheme = "light") {
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const t = getDictionary(safeLocale);
  const theme = shareTheme[mode];
  const [avatar, teko, tekoLight] = await Promise.all([
    readFile(join(process.cwd(), "public/avatar.png")),
    readFile(join(process.cwd(), "lib/fonts/Teko-Medium.ttf")),
    readFile(join(process.cwd(), "lib/fonts/Teko-Light.ttf")),
  ]);
  const avatarPng = await sharp(avatar).resize(avatarSize, avatarSize, { fit: "cover" }).png().toBuffer();
  const src = `data:image/png;base64,${avatarPng.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: 1200,
          height: 630,
          display: "flex",
          background: theme.background,
          color: theme.text,
        }}
      >
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", left: 0, top: 0 }}>
          {hexGrid(theme.line)}
        </svg>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            padding: "72px",
          }}
        >
          <img
            src={src}
            width={avatarSize}
            height={avatarSize}
            style={{
              borderRadius: 16,
              objectFit: "cover",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 48,
              width: 760,
            }}
          >
            <div
              style={{
                fontFamily: "Teko",
                fontSize: 84,
                fontWeight: 500,
                letterSpacing: 2,
                lineHeight: 1,
              }}
            >
              Matt Fowles
            </div>
            <div
              style={{
                marginTop: 12,
                fontFamily: "Teko Light",
                fontSize: 30,
                fontWeight: 300,
                letterSpacing: 2,
                lineHeight: 1.35,
              }}
            >
              {t.home.line1}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...shareSize,
      fonts: [
        { name: "Teko", data: teko, weight: 500, style: "normal" },
        { name: "Teko Light", data: tekoLight, weight: 300, style: "normal" },
      ],
    },
  );
}
