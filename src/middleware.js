import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // ইউজার লগইন থাকা অবস্থায় লগইন বা রেজিস্টার পেজে যেতে চাইলে হোম পেজে পাঠিয়ে দাও
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register"], // এই পেজগুলোতে মিডলওয়্যার চেক করবে
};