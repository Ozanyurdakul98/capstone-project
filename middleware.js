import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const session = await getToken({ req, secret: process.env.SECRET });
  if (!session) return NextResponse.rewrite(new URL("/signin", req.url));
  if (
    session.role !== "admin" &&
    (req.nextUrl.pathname.startsWith("/dashboard/admin") ||
      req.nextUrl.pathname.startsWith("/api/dashboard/admin:path*"))
  ) {
    return NextResponse.rewrite(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/form", "/api/dashboard/:path*"],
};
