import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { COOKIE_NAME, FALLBACK_LNG, LANGUAGES } from 'i18n/settings';

acceptLanguage.languages(LANGUAGES);

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)'],
};

export const middleware = (req: NextRequest) => {
  let lng;
  if (req.cookies.has(COOKIE_NAME)) lng = acceptLanguage.get(req.cookies.get(COOKIE_NAME)?.value);
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  if (!lng) lng = FALLBACK_LNG;

  // Redirect if lng in path is not supported
  if (
    !LANGUAGES.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url));
  }
  const referer = req.headers.has('referer') && req.headers.get('referer');
  if (referer) {
    const refererUrl = new URL(referer);
    const lngInReferer = LANGUAGES.find((l) => refererUrl.pathname.startsWith(`/${l}`));
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(COOKIE_NAME, lngInReferer);
    return response;
  }

  return NextResponse.next();
};
