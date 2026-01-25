import { cookies } from "next/headers";

export type SessionUser = {
  id: string;
  name: string;
  role: "ADMIN" | "MANAGER" | "STAFF";
  username: string;
};

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get("dl_session")?.value;

  if (!raw) return null;

  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}
