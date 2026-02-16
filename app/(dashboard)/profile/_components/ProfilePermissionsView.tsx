import type { SessionUser } from "@/lib/session";

export default function ProfilePermissionsView({ user }: { user: SessionUser }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <h3 className="text-lg font-semibold text-gray-900">Permissions</h3>

      <div className="mt-3 flex flex-wrap gap-2">
        {user.permissions.map((p) => (
          <span
            key={p}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800"
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}
