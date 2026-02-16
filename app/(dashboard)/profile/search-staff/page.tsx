import { getSessionUser } from "@/lib/session";
import SearchStaffClient from "./searchStaffClient";

export default async function SearchStaffPage() {
  const user = await getSessionUser();
  if (!user) return null;

  // only admin/manager
  if (!(user.role === "ADMIN" || user.role === "MANAGER")) {
    return <div className="p-6">No permission.</div>;
  }

  return <SearchStaffClient viewerRole={user.role} />;
}
