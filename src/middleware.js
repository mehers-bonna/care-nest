import { NextResponse } from 'next/server';

export function middleware(request) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/my-bookings/:path*', '/booking/:path*'],
};