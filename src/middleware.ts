import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("adminToken")?.value;
  const { pathname } = request.nextUrl;

 
  if (token && pathname === "/admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/dashboard/:path*"],
};