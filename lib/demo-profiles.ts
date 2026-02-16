import type { Role } from "@/lib/session";

export type Gender = "MALE" | "FEMALE" | "OTHER" | "";

export type UserProfile = {
  id: string;
  username: string;
  name: string;
  role: Role;

  avatarUrl: string; // ✅ NEW

  email: string;
  phone: string;
  nationalId: string;
  passportNumber: string;
  dateOfBirth: string;
  gender: Gender;
  zone: string;
  sd: string;
  presentAddress: string;
  permanentAddress: string;
};

export const DEMO_PROFILES: UserProfile[] = [
  {
    id: "U001",
    username: "admin",
    name: "System Admin",
    role: "ADMIN",
    avatarUrl: "/avatars/admin.png", // ✅

    email: "admin@digilife.com",
    phone: "01700000001",
    nationalId: "NID-ADMIN-1",
    passportNumber: "P-ADMIN-1",
    dateOfBirth: "1990-01-01",
    gender: "MALE",
    zone: "HQ",
    sd: "Admin",
    presentAddress: "Dhaka",
    permanentAddress: "Dhaka",
  },
  {
    id: "U002",
    username: "manager",
    name: "Inventory Manager",
    role: "MANAGER",
    avatarUrl: "/avatars/manager.png", // ✅

    email: "manager@digilife.com",
    phone: "01700000002",
    nationalId: "NID-MGR-1",
    passportNumber: "P-MGR-1",
    dateOfBirth: "1992-05-10",
    gender: "MALE",
    zone: "Dhaka-1",
    sd: "Inventory",
    presentAddress: "Dhaka",
    permanentAddress: "Rajshahi",
  },
  {
    id: "U003",
    username: "staff",
    name: "Store Staff",
    role: "STAFF",
    avatarUrl: "/avatars/staff.png", // ✅

    email: "staff@digilife.com",
    phone: "01700000003",
    nationalId: "NID-STF-1",
    passportNumber: "P-STF-1",
    dateOfBirth: "1998-03-15",
    gender: "FEMALE",
    zone: "Dhaka-2",
    sd: "Store",
    presentAddress: "Mirpur, Dhaka",
    permanentAddress: "Barisal",
  },

  // other staff -> same staff avatar by default
  {
    id: "U004",
    username: "staff2",
    name: "Staff Two",
    role: "STAFF",
    avatarUrl: "/avatars/staff.png",
    email: "staff2@digilife.com",
    phone: "01700000004",
    nationalId: "NID-STF-2",
    passportNumber: "P-STF-2",
    dateOfBirth: "1997-09-21",
    gender: "MALE",
    zone: "Chattogram-1",
    sd: "Store",
    presentAddress: "Chattogram",
    permanentAddress: "Chattogram",
  },
  {
    id: "U005",
    username: "staff3",
    name: "Staff Three",
    role: "STAFF",
    avatarUrl: "/avatars/staff.png",
    email: "staff3@digilife.com",
    phone: "01700000005",
    nationalId: "NID-STF-3",
    passportNumber: "P-STF-3",
    dateOfBirth: "1999-12-11",
    gender: "OTHER",
    zone: "Sylhet-1",
    sd: "Store",
    presentAddress: "Sylhet",
    permanentAddress: "Sylhet",
  },
];

export function getProfileById(id: string) {
  return DEMO_PROFILES.find((p) => p.id === id);
}

export function updateProfileById(id: string, patch: Partial<UserProfile>) {
  const p = getProfileById(id);
  if (!p) return null;
  Object.assign(p, patch);
  return p;
}
