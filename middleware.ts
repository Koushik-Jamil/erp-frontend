import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function readSession(req: NextRequest) {
  const raw = req.cookies.get("dl_session")?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // allow login + auth api
  if (pathname.startsWith("/login")) return NextResponse.next();
  if (pathname.startsWith("/api/auth")) return NextResponse.next();

  const session = readSession(req);

  // protect dashboard area (only auth check)
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/inventory/:path*",
    "/items/:path*",
    "/profile/:path*",
    "/reports/:path*",
    "/transactions/:path*",
    "/users/:path*",
    "/warehouses/:path*",
    "/purchase/:path*", // ✅ IMPORTANT: added so purchase pages are protected too
    "/tickets/:path*",
    "/products/:path*",
    "/departments/:path*",
    "/process/:path*",
  ],
};