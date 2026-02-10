import type { SessionUser } from "@/lib/session";

export default function ProfileHeader({ user }: { user: SessionUser }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
          {user.name.charAt(0)}
        </div>

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
