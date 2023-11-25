import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { DEFAULT_LOCALE, LOCALES } from "./util/constants";
import { paths } from "./navigation/paths";

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === paths.home()) {
    return NextResponse.redirect(new URL(paths.projects(), request.url));
  }

  return createIntlMiddleware({
    locales: LOCALES,
    defaultLocale: DEFAULT_LOCALE,
    localePrefix: "as-needed",
  })(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
