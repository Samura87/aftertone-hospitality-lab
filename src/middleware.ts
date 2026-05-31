import { NextRequest, NextResponse } from "next/server";

const PASSWORD = "20260530";
const COOKIE_NAME = "at_access";
const COOKIE_VALUE = "granted";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip: static assets, _next internals, favicon
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Already authenticated
  const cookie = req.cookies.get(COOKIE_NAME);
  if (cookie?.value === COOKIE_VALUE) {
    return NextResponse.next();
  }

  // Login page and auth endpoint — allow
  if (pathname === "/login" || pathname === "/auth") {
    return NextResponse.next();
  }

  // Redirect to login
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
