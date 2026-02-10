import { getSessionUser } from "@/lib/session";
import ProfileHeader from "../_components/ProfileHeader";
import AccountDetails from "../_components/AccountDetails";
import ProfileSidebar from "../_components/ProfileSidebar";

export default async function MyProfilePage() {
  const user = await getSessionUser();

  if (!user) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
      {/* Left sidebar */}
      <div className="col-span-12 lg:col-span-3">
        <ProfileSidebar user={user} />
      </div>

      {/* Main content */}
      <div className="col-span-12 lg:col-span-9 space-y-6">
        <ProfileHeader user={user} />
        <AccountDetails user={user} />
      </div>
    </div>
  );
}
