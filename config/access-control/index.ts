import type { Permission, Role } from "@/lib/session";
import { ADMIN_PERMISSIONS } from "./admin.permissions";
import { MANAGER_PERMISSIONS } from "./manager.permissions";
import { STAFF_PERMISSIONS } from "./staff.permissions";

export function getRolePermissions(role: Role): Permission[] {
  if (role === "ADMIN") return ADMIN_PERMISSIONS;
  if (role === "MANAGER") return MANAGER_PERMISSIONS;
  return STAFF_PERMISSIONS;
}
