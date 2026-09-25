"use client";

import { useId } from "react";
import { useTheme } from "next-themes";

const themes = ["system", "light", "dark"] as const;

type ThemeValue = (typeof themes)[number];

const icons: Record<ThemeValue, React.ReactNode> = {
  system: (
    <svg viewBox="0 0 16 16" height="16" width="16" aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M1 3.25C1 1.45 2.46 0 4.25 0h7.5C13.55 0 15 1.46 15 3.25V16H1V3.25M4.25 1.5c-.97 0-1.75.78-1.75 1.75V14.5h11V3.25c0-.97-.78-1.75-1.75-1.75zM4 4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6H4zm5 9h3v-1.5H9z"
        clipRule="evenodd"
      />
    </svg>
  ),
  light: (
    <svg viewBox="0 0 16 16" height="16" width="16" aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8.75.75V0h-1.5v2h1.5V.75M3.26 4.32l-.53-.53-.35-.35-.53-.53L2.9 1.85l.53.53.35.35.53.53zm8.42-1.06.53-.53.35-.35.53-.53 1.06 1.06-.53.53-.35.35-.53.53zM8 11.25a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5m0 1.5a4.75 4.75 0 1 0 0-9.5 4.75 4.75 0 0 0 0 9.5m6-5.5h2v1.5h-2zm-13.25 0H0v1.5h2v-1.5H.75m1.62 5.32-.53.53 1.06 1.06.53-.53.35-.35.53-.53-1.06-1.06-.53.53zm10.2 1.06.53.53 1.06-1.06-.53-.53-.35-.35-.53-.53-1.06 1.06.53.53zM8.75 14v2h-1.5v-2z"
        clipRule="evenodd"
      />
    </svg>
  ),
  dark: (
    <svg viewBox="0 0 16 16" height="16" width="16" aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M1.5 8a6 6 0 0 1 3.62-5.51 7 7 0 0 0 7.08 9.25A5.99 5.99 0 0 1 1.5 8M6.42.58a7.5 7.5 0 1 0 7.96 10.41l-.92-1.01a5.5 5.5 0 0 1-6.3-8.25zm6.83.42v1.75H15v1.5h-1.75V6h-1.5V4.25H10v-1.5h1.75V1z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

export function ThemeSwitcher({
  small = false,
  disabled = false,
}: {
  small?: boolean;
  disabled?: boolean;
}) {
  const id = useId();
  const { theme, setTheme, forcedTheme } = useTheme();
  const isDisabled = disabled || forcedTheme != null;
  const active = theme ?? "system";

  return (
    <fieldset
      className="isolate flex shadow-[var(--ds-shadow-border)] rounded-full h-8 w-fit p-0 border-0 m-0 data-[small]:h-6"
      data-small={small ? "" : undefined}
      disabled={isDisabled}
    >
      <legend className="sr-only">Select a display theme:</legend>
      {themes.map((value) => (
        <span key={value} className="relative h-full">
          <input
            aria-label={value}
            className="appearance-none p-0 m-0 outline-none absolute inset-0 opacity-0 peer"
            id={`theme-switch-${value}-${id}`}
            name={`theme-${id}`}
            type="radio"
            value={value}
            checked={active === value}
            disabled={isDisabled}
            onChange={() => setTheme(value)}
          />
          <label
            className={
              isDisabled
                ? "group rounded-full flex items-center justify-center bg-none size-8 m-0 relative data-[small]:size-6 cursor-not-allowed text-[var(--ds-gray-500)]"
                : "group rounded-full flex items-center justify-center bg-none size-8 m-0 relative data-[small]:size-6 cursor-pointer hover:text-[var(--ds-gray-1000)] text-[var(--ds-gray-700)] peer-checked:shadow-[0_0_0_1px_var(--ds-gray-400),0px_1px_2px_0px_var(--ds-gray-alpha-100)] peer-checked:text-[var(--ds-gray-1000)] peer-checked:bg-[var(--ds-background-100)] peer-focus-visible:shadow-[var(--ds-focus-ring)] peer-focus-visible:text-[var(--ds-gray-1000)]"
            }
            data-small={small ? "" : undefined}
            htmlFor={`theme-switch-${value}-${id}`}
          >
            <span className="sr-only">{value}</span>
            <span className="relative z-[1] size-4">{icons[value]}</span>
          </label>
        </span>
      ))}
    </fieldset>
  );
}
