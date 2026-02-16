import type { Permission, SessionUser } from "@/lib/session";

export function can(user: SessionUser | null, permission: Permission): boolean {
  if (!user) return false;
  return user.permissions.includes(permission);
}
