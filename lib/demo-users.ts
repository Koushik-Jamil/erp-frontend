import type { Permission, Role } from "@/lib/session";

export type DemoUser = {
  id: string;
  username: string;
  password: string;
  name: string;
  role: Role;
  allow?: Permission[];
  deny?: Permission[];
};

export const DEMO_USERS: DemoUser[] = [
  { id: "U001", username: "admin", password: "1234", name: "System Admin", role: "ADMIN" },
  { id: "U002", username: "manager", password: "1234", name: "Inventory Manager", role: "MANAGER", deny: ["USER_PERMISSIONS_EDIT"] },

  // staff logins
  { id: "U003", username: "staff", password: "1234", name: "Store Staff", role: "STAFF" },
  { id: "U004", username: "staff2", password: "1234", name: "Staff Two", role: "STAFF" },
  { id: "U005", username: "staff3", password: "1234", name: "Staff Three", role: "STAFF" },
];
