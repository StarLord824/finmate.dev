import { NextResponse, type NextRequest } from "next/server";

const PROTECTED = ["/feed", "/search", "/bookmarks", "/history", "/arena", "/settings"];
const AUTH_ROUTES = ["/login", "/signup"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for session cookie set by better-auth (cookiePrefix: "finmate")
  const sessionToken =
    request.cookies.get("finmate.session_token")?.value ||
    request.cookies.get("better-auth.session_token")?.value;

  const isProtected = PROTECTED.some((p) => pathname === p || pathname.startsWith(p + "/"));
  const isAuthRoute = AUTH_ROUTES.some((p) => pathname === p);

  if (isProtected && !sessionToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && sessionToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/feed";
    url.searchParams.delete("redirect");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/feed/:path*",
    "/search/:path*",
    "/bookmarks/:path*",
    "/history/:path*",
    "/arena/:path*",
    "/settings/:path*",
    "/login",
    "/signup",
  ],
};
