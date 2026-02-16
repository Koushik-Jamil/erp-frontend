import { NextResponse } from "next/server";
import type { SessionUser } from "@/lib/session";
import { updateProfileById, getProfileById } from "@/lib/demo-profiles";

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

const MANAGER_ALLOWED_FIELDS = new Set([
  "avatarUrl",
  "email",
  "phone",
  "nationalId",
  "passportNumber",
  "dateOfBirth",
  "gender",
  "zone",
  "sd",
  "presentAddress",
  "permanentAddress",
]);

type Body = { id: string; patch: Record<string, unknown> };

export async function POST(req: Request) {
  const session = readSessionFromCookie(req);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  // Only ADMIN or MANAGER can edit
  if (!(session.role === "ADMIN" || session.role === "MANAGER")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const body = (await req.json()) as Body;
  const id = String(body?.id ?? "").trim();
  const patch = (body?.patch ?? {}) as Record<string, unknown>;
  if (!id) return NextResponse.json({ message: "id required" }, { status: 400 });

  const target = getProfileById(id);
  if (!target) return NextResponse.json({ message: "Not found" }, { status: 404 });

  // Manager rules:
  // - Manager can edit their OWN profile
  // - Manager can edit STAFF profiles
  if (session.role === "MANAGER") {
    const isSelf = session.id === target.id;
    const isStaff = target.role === "STAFF";
    if (!isSelf && !isStaff) {
      return NextResponse.json(
        { message: "Manager can only edit their own profile or STAFF profiles." },
        { status: 403 }
      );
    }
  }

  // Field filtering
  const safePatch: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(patch)) {
    if (session.role === "ADMIN") {
      safePatch[k] = v; // admin can update anything
    } else {
      // manager: only allowed fields
      if (MANAGER_ALLOWED_FIELDS.has(k)) safePatch[k] = v;
    }
  }

  const updated = updateProfileById(id, safePatch as Partial<import("@/lib/demo-profiles").UserProfile>);
  return NextResponse.json({ profile: updated }, { status: 200 });
}
