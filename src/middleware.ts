import { getToken } from "next-auth/jwt";
import { JWTExtended } from "./types/Auth";
import environment from "./config/environment";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token: JWTExtended | null = await getToken({
    req: request,
    secret: environment.NEXTAUTH_SECRET,
  });
  const { pathname } = request.nextUrl;

  if (
    pathname === "/auth/login" ||
    pathname === "/auth/register" ||
    pathname === "/auth/activation" ||
    pathname === "/auth/activation/success"
  ) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }

    if (token?.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }
}

export const config = {
  matcher: ["/auth/:path*", "/admin/:path*"],
};
