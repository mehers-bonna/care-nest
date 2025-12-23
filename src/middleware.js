import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const isProduction = process.env.NODE_ENV === "production";
  const cookieName = isProduction ? "__Secure-next-auth.session-token" : "next-auth.session-token";

  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: cookieName 
  });

  const { pathname } = req.nextUrl;

  const protectedPaths = ["/booking", "/my-bookings"];
  const isProtected = protectedPaths.some(path => pathname.startsWith(path));

  if (!token && isProtected) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/booking/:path*", "/my-bookings"],
};