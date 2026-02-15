import { NextRequest, NextResponse } from "next/server";

const publicPaths = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasToken = request.cookies.has("access_token") || request.cookies.has("refresh_token");

  // 인증된 유저가 로그인/회원가입 페이지 접근 시 홈으로
  if (hasToken && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 미인증 유저가 보호된 페이지 접근 시 로그인으로
  if (!hasToken && !publicPaths.includes(pathname)) {
    const loginUrl = new URL("/login", request.url);
    if (pathname !== "/") {
      loginUrl.searchParams.set("redirect", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
