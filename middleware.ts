import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Officer-only pages
  if (pathname.startsWith("/officer") && token.role !== "officer") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // Photographer-only pages
  if (pathname.startsWith("/photographer") && token.role !== "photographer") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/officer/:path*", "/photographer/:path*", "/tourist/:path*"],
};
