import { NextResponse } from "next/server";
import type { SessionUser } from "@/lib/session";
import { getProfileById } from "@/lib/demo-profiles";

export const dynamic = "force-dynamic";

function readSessionFromCookie(req: Request): SessionUser | null {
  const cookie = req.headers.get("cookie") ?? "";
  const part = cookie
    .split(";")
    .map((s) => s.trim())
    .find((s) => s.startsWith("dl_session="));
  if (!part) return null;

  const raw = decodeURIComponent(part.slice("dl_session=".length));
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const session = readSessionFromCookie(req);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const profile = getProfileById(session.id);
  if (!profile) return NextResponse.json({ message: "Not found" }, { status: 404 });

  return NextResponse.json({ profile }, { status: 200 });
}
