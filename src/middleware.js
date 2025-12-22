import { NextResponse } from 'next/server'
 
export function middleware(request) {
  // আপাতত কোনো লজিক ছাড়াই রিকোয়েস্ট পাস করে দিচ্ছি
  return NextResponse.next()
}
 
// কোন কোন পেজে এই মিডলওয়্যার কাজ করবে তা এখানে নির্ধারণ করা যায়
export const config = {
  matcher: ['/booking/:path*', '/my-bookings/:path*'],
}