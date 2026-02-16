import type { Permission } from "@/lib/session";

export const ADMIN_PERMISSIONS: Permission[] = [
  "USER_VIEW",
  "USER_EDIT",
  "USER_PERMISSIONS_EDIT",
  "INVENTORY_VIEW",
  "INVENTORY_EDIT",
  "REQUISITION_VIEW",
  "REQUISITION_APPROVE",
  "REPORTS_VIEW",
];
