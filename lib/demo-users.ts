export type DemoUser = {
  id: string;
  username: string;
  password: string;
  name: string;
  role: "ADMIN" | "MANAGER" | "STAFF";
};

export const DEMO_USERS: DemoUser[] = [
  {
    id: "U001",
    username: "admin",
    password: "1234",
    name: "System Admin",
    role: "ADMIN",
  },
  {
    id: "U002",
    username: "manager",
    password: "1234",
    name: "Inventory Manager",
    role: "MANAGER",
  },
  {
    id: "U003",
    username: "staff",
    password: "1234",
    name: "Store Staff",
    role: "STAFF",
  },
];
