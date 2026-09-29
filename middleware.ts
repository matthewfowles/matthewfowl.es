import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, type Locale } from "./i18n/config";

const COOKIE = "locale";

function preferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(COOKIE)?.value;
  if (saved && isLocale(saved)) return saved;

  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((param) => param.trim().startsWith("q="));
      const q = qParam ? Number(qParam.trim().slice(2)) : 1;
      return { tag: tag.toLowerCase(), q: Number.isFinite(q) ? q : 0 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    if (tag.startsWith("sq")) return "sq";
    if (tag.startsWith("en")) return "en";
  }

  return defaultLocale;
}

function withLocale(response: NextResponse, locale: Locale, pathname: string) {
  response.headers.set("x-locale", locale);
  response.headers.set("x-pathname", pathname);
  response.cookies.set(COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api/") ||
    /\/(icon|apple-icon|opengraph-image|twitter-image)(\/|$)/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const parts = pathname.split("/").filter(Boolean);
  const retired = parts.length === 1 ? parts[0] : parts.length === 2 ? parts[1] : "";
  if (
    (parts.length === 1 || parts[0] === "en" || parts[0] === "sq") &&
    (retired === "about" || retired === "contact" || retired === "privacy")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = parts[0] === "sq" ? "/sq" : "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en/, "") || "/";
    return withLocale(NextResponse.redirect(url), "en", pathname);
  }

  const first = pathname.split("/")[1] ?? "";
  if (isLocale(first) && first !== defaultLocale) {
    const headers = new Headers(request.headers);
    headers.set("x-locale", first);
    headers.set("x-pathname", pathname);
    const response = NextResponse.next({ request: { headers } });
    return withLocale(response, first, pathname);
  }

  const locale = preferredLocale(request);
  if (locale === "sq") {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/sq" : `/sq${pathname}`;
    return withLocale(NextResponse.redirect(url), "sq", pathname);
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
  const headers = new Headers(request.headers);
  headers.set("x-locale", "en");
  headers.set("x-pathname", pathname);
  const response = NextResponse.rewrite(url, { request: { headers } });
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
