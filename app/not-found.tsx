import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { defaultLocale, isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const localeHeader = headerList.get("x-locale");
  const locale: Locale = localeHeader && isLocale(localeHeader) ? localeHeader : defaultLocale;
  const t = getDictionary(locale);

  return {
    title: t.notFound.title,
    description: t.notFound.body,
    robots: { index: false, follow: true },
  };
}

export default async function NotFound() {
  const headerList = await headers();
  const localeHeader = headerList.get("x-locale");
  const locale: Locale = localeHeader && isLocale(localeHeader) ? localeHeader : defaultLocale;
  const t = getDictionary(locale);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-6 text-center">
        <h1 className="text-[56px] font-medium tracking-[4px]">404</h1>
        <h2 className="text-[28px] font-light tracking-[2px]">{t.notFound.heading}</h2>

        <p className="text-[20px] font-light tracking-[2px] pt-4">{t.notFound.body}</p>

        <nav className="flex flex-col items-center gap-4 pt-6">
          <Link href={localePath(locale, "/")} className="social-link">{t.notFound.home}</Link>
          <a href="/llms.txt" className="social-link">{t.notFound.guide}</a>
          <a href="/sitemap.xml" className="social-link">{t.notFound.sitemap}</a>
        </nav>
      </div>
    </main>
  );
}
