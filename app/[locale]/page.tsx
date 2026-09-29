import type { Metadata } from "next";
import Image from "next/image";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/i18n/metadata";

function SocialHex({ id }: { id: string }) {
  const points = "96,50 73,89.8 27,89.8 4,50 27,10.2 73,10.2";

  return (
    <svg className="social-hex" viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <mask id={id}>
          <polygon className="social-hex-draw" points={points} />
        </mask>
      </defs>
      <polygon className="social-hex-solid" points={points} pathLength="1" />
      <polygon
        className="social-hex-dashed"
        points={points}
        mask={`url(#${id})`}
      />
    </svg>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const t = getDictionary(safeLocale);
  return pageMetadata(safeLocale, "/", t.meta.title, t.meta.description, t.meta.keywords);
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  const t = getDictionary(locale);
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-8 py-16 md:px-16 lg:px-24">
      <div className="absolute top-4 right-4">
        <ThemeSwitcher labels={t.theme} />
      </div>

      <header className="flex flex-col items-center">
        <Image
          src="/avatar.png"
          alt="Matt Fowles"
          width={168}
          height={168}
          priority
          className="rounded-2xl"
        />

        <h1 className="rise-line mt-5 text-center text-[40px] leading-[1.1] font-medium tracking-[4px] md:text-[56px]">
          Matt Fowles
        </h1>

        <div className="mt-3 flex max-w-xl flex-col items-center gap-4 text-center">
          <p
            className="rise-line font-[Teko,sans-serif] text-[26px] leading-[1.35] font-light tracking-[2px] md:text-[30px]"
            style={{ animationDelay: "90ms" }}
          >
            {t.home.line1}
          </p>
          <p
            className="rise-line text-[16px] leading-relaxed md:text-[18px]"
            style={{ animationDelay: "170ms" }}
          >
            {t.home.body}
          </p>
          <p
            className="rise-line font-[Teko,sans-serif] text-[26px] leading-[1.35] font-light tracking-[2px] md:text-[30px]"
            style={{ animationDelay: "250ms" }}
          >
            {t.home.line2}
          </p>
          <p
            className="rise-line font-[Teko,sans-serif] text-[26px] leading-[1.35] font-light tracking-[2px] md:text-[30px]"
            style={{ animationDelay: "330ms" }}
          >
            {t.home.line3}
          </p>
        </div>

        <nav className="mt-8 flex flex-wrap items-center justify-center">
          <a
            href="mailto:matt@matthewfowles.io"
            aria-label={t.home.email}
            className="social-link"
          >
            <SocialHex id="hex-email" />
            <svg
              viewBox="0 0 24 24"
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/matt-fowles"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.home.linkedin}
            className="social-link"
          >
            <SocialHex id="hex-linkedin" />
            <svg
              viewBox="0 0 24 24"
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a
            href="https://github.com/matthewfowles"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.home.github}
            className="social-link"
          >
            <SocialHex id="hex-github" />
            <svg
              viewBox="0 0 24 24"
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          <a
            href="https://x.com/matthewfowles"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.home.x}
            className="social-link"
          >
            <SocialHex id="hex-x" />
            <svg
              viewBox="0 0 24 24"
              className="size-6"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-4.71-6.23-5.4 6.23H2.74l7.73-8.84L2.25 2.25h6.83l4.25 5.62 4.91-5.62zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/mattfowlesnomad/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.home.instagram}
            className="social-link"
          >
            <SocialHex id="hex-instagram" />
            <svg
              viewBox="0 0 24 24"
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
        </nav>
      </header>
    </main>
  );
}
