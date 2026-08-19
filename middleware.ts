import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

async function isValidToken(token: string) {
  try {
    const secret = new TextEncoder().encode(
      process.env.AUTH_SECRET,
    );

    await jwtVerify(token, secret);

    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthenticated = token
    ? await isValidToken(token)
    : false;

  if (
    !isAuthenticated &&
    pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url),
    );
  }

  if (
    isAuthenticated &&
    (pathname === "/login" ||
      pathname === "/register")
  ) {
    return NextResponse.redirect(
      new URL("/", request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
  ],
};