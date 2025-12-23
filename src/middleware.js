import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // ১. ইউজার লগইন না থাকলে বুকিং পেজে যেতে পারবে না (Redirect to Login)
  if (!token && pathname.startsWith("/booking")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ২. ইউজার লগইন থাকলে লগইন বা রেজিস্টার পেজে যেতে পারবে না
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  // এখানে বুকিং রাউটটিও যোগ করে দিন যাতে মিডলওয়্যার এটি চেক করতে পারে
  matcher: ["/login", "/register", "/booking/:path*"], 
};