import Image from "next/image";
import type { SessionUser } from "@/lib/session";
import type { UserProfile } from "@/lib/demo-profiles";

export default function ProfileHeader({
  user,
  profile,
}: {
  user: SessionUser;
  profile: UserProfile;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-200 bg-white relative">
          <Image
            src={profile.avatarUrl || "/avatars/default.png"}
            alt={user.name}
            width={56}
            height={56}
            className="object-cover"
          />
        </div>

        {/* Name + Role */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {user.name}
          </h2>
          <p className="text-sm text-gray-500">
            Role: {user.role}
          </p>
        </div>
      </div>
    </div>
  );
}
