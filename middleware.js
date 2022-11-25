import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  // return early if url isn't supposed to be protected
  console.log("reqM", req);
  //   if (!req.url.includes("/dashboard/:path*")) {
  //     return NextResponse.next();
  //   }

  const session = await getToken({ req, secret: process.env.SECRET });
  console.log("sessionM", req.nextUrl.pathname.startsWith("/dashboard/admin"));
  // You could also check for any property on the session object,
  // like role === "admin" or name === "John Doe", etc.
  if (!session) return NextResponse.rewrite(new URL("/signin", req.url));
  console.log("URL", session.role);
  if (
    session.role !== "admin" &&
    (req.nextUrl.pathname.startsWith("/dashboard/admin") ||
      req.nextUrl.pathname.startsWith("/api/dashboard/admin:path*"))
  ) {
    return NextResponse.rewrite(new URL("/dashboard", req.url));
  }
  //   if (!session) return NextResponse.redirect("/api/auth/signin");

  // If user is authenticated, continue.
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/form",
    "/api/dashboard/admin/:path*",
    "/api/dashboard/user/:path*",
  ],
};
