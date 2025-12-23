import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  if (!token && pathname.startsWith("/booking")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/booking/:path*", "/my-bookings"], 
};