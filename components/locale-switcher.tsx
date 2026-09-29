import { localePath, type Locale } from "@/i18n/config";

function barePath(pathname: string) {
  if (pathname === "/sq" || pathname.startsWith("/sq/")) return pathname.slice(3) || "/";
  if (pathname === "/en" || pathname.startsWith("/en/")) return pathname.slice(3) || "/";
  return pathname || "/";
}

function Flag({ locale }: { locale: Locale }) {
  if (locale === "sq") {
    return (
      <svg viewBox="0 0 60 40" className="h-3.5 w-5 rounded-[2px]" aria-hidden="true">
        <rect width="60" height="40" fill="#E41E20" />
        <path
          fill="#111"
          d="M30 8c-2 3-6 4-8 4 1 2 1 4 0 6-2 1-4 3-4 6 2-1 4-1 6 0-1 3-1 6 0 8 2-2 4-3 6-3s4 1 6 3c1-2 1-5 0-8 2-1 4-1 6 0 0-3-2-5-4-6-1-2-1-4 0-6-2 0-6-1-8-4z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 60 30" className="h-3.5 w-5 rounded-[2px]" aria-hidden="true">
      <clipPath id="uk-flag">
        <rect width="60" height="30" rx="1" />
      </clipPath>
      <g clipPath="url(#uk-flag)">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0 0 L60 30 M60 0 L0 30" stroke="#fff" strokeWidth="8" />
        <path d="M0 0 L60 30 M60 0 L0 30" stroke="#C8102E" strokeWidth="4" />
        <path d="M30 0 V30 M0 15 H60" stroke="#fff" strokeWidth="14" />
        <path d="M30 0 V30 M0 15 H60" stroke="#C8102E" strokeWidth="8" />
      </g>
    </svg>
  );
}

export function LocaleSwitcher({
  locale,
  pathname,
  label,
  english,
  albanian,
}: {
  locale: Locale;
  pathname: string;
  label: string;
  english: string;
  albanian: string;
}) {
  const path = barePath(pathname);
  const items = [
    { locale: "en" as const, href: path === "/" ? "/en" : `/en${path}`, name: english, code: "EN" },
    { locale: "sq" as const, href: localePath("sq", path), name: albanian, code: "SQ" },
  ];

  return (
    <nav aria-label={label} className="isolate flex h-8 w-fit items-center gap-0.5 rounded-full p-0.5 shadow-[var(--ds-shadow-border)]">
      {items.map((item) => {
        const active = item.locale === locale;
        return (
          <a
            key={item.locale}
            href={item.href}
            hrefLang={item.locale}
            aria-label={item.name}
            aria-current={active ? "true" : undefined}
            className={
              active
                ? "flex h-7 items-center gap-1.5 rounded-full bg-[var(--ds-background-100)] px-2 text-[var(--ds-gray-1000)] shadow-[0_0_0_1px_var(--ds-gray-400),0px_1px_2px_0px_var(--ds-gray-alpha-100)]"
                : "flex h-7 items-center gap-1.5 rounded-full px-2 text-[var(--ds-gray-700)] hover:bg-[var(--ds-gray-alpha-100)] hover:text-[var(--ds-gray-1000)]"
            }
          >
            <Flag locale={item.locale} />
            <span className="text-xs font-medium tracking-normal">{item.code}</span>
          </a>
        );
      })}
    </nav>
  );
}
