import { NextResponse } from "next/server";
import { DEMO_PROFILES } from "@/lib/demo-profiles";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const id = String(url.searchParams.get("id") ?? "").trim();
  const employeeId = String(url.searchParams.get("employeeId") ?? "").trim(); // ✅ username

  if (!id && !employeeId) {
    return NextResponse.json({ message: "id or employeeId required" }, { status: 400 });
  }

  const profile = id
    ? DEMO_PROFILES.find((p) => p.id === id)
    : DEMO_PROFILES.find((p) => p.username === employeeId);

  if (!profile) return NextResponse.json({ message: "Not found" }, { status: 404 });

  return NextResponse.json({ profile }, { status: 200 });
}
