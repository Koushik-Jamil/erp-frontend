import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Permission } from "@/lib/session";

function readSession(req: NextRequest) {
  const raw = req.cookies.get("dl_session")?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as { permissions?: Permission[] };
  } catch {
    return null;
  }
}

function has(session: { permissions?: Permission[] } | null, p: Permission) {
  return !!session?.permissions?.includes(p);
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // allow login + auth api
  if (pathname.startsWith("/login")) return NextResponse.next();
  if (pathname.startsWith("/api/auth")) return NextResponse.next();

  const session = readSession(req);

  // protect dashboard area
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // permission-based route rules
  if (pathname === "/users" || pathname.startsWith("/users/")) {
    if (!has(session, "USER_VIEW")) {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    // only permission editors can open permissions pages
    if (pathname.includes("/permissions")) {
      if (!has(session, "USER_PERMISSIONS_EDIT")) {
        const url = req.nextUrl.clone();
        url.pathname = "/users";
        return NextResponse.redirect(url);
      }
    }
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
  ],
};
