import type { Permission, Role } from "@/lib/session";
import { getRolePermissions } from "@/config/access-control";

export function buildPermissions(
  role: Role,
  allow?: Permission[],
  deny?: Permission[]
): Permission[] {
  const set = new Set<Permission>(getRolePermissions(role));

  for (const p of allow ?? []) set.add(p);
  for (const p of deny ?? []) set.delete(p);

  return Array.from(set);
}
