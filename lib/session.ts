import { cookies } from "next/headers";

export type Role = "ADMIN" | "MANAGER" | "STAFF";

export type Permission =
  | "USER_VIEW"
  | "USER_EDIT"
  | "USER_PERMISSIONS_EDIT"
  | "INVENTORY_VIEW"
  | "INVENTORY_EDIT"
  | "REQUISITION_VIEW"
  | "REQUISITION_APPROVE"
  | "REPORTS_VIEW";

export type SessionUser = {
  id: string;
  name: string;
  role: Role;
  username: string;
  permissions: Permission[];
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
