import type { SessionUser } from "@/lib/session";

export default function ProfileSidebar({ user }: { user: SessionUser }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-gray-100 bg-white p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Manage
        </h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li className="font-medium text-blue-600">Account Details</li>
          <li>Sessions</li>
        </ul>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Roles
        </h3>
        <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">
          {user.role}
        </span>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Actions
        </h3>
        <button className="text-sm text-red-600">
          Change Password
        </button>
      </div>
    </div>
  );
}
