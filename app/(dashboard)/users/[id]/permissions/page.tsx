import { getSessionUser } from "@/lib/session";
import { can } from "@/lib/ability";
import { notFound } from "next/navigation";
import { DEMO_USERS } from "@/lib/demo-users";

export default async function UserPermissionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const me = await getSessionUser();
  if (!can(me, "USER_PERMISSIONS_EDIT")) {
    return <div className="p-6">No permission to edit permissions.</div>;
  }

  const { id } = await params;
  const user = DEMO_USERS.find((u) => u.id === id);
  if (!user) return notFound();

  return (
    <div className="p-6 space-y-4">
      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <h1 className="text-xl font-semibold">Edit Permissions</h1>
        <p className="mt-2 text-sm text-gray-600">
          User: {user.name} ({user.username})
        </p>

        <div className="mt-4 text-sm text-gray-600">
          This page is protected (only USER_PERMISSIONS_EDIT can open).
          <br />
          Next step: if you want real editing without backend, we can store per-user
          overrides in <b>localStorage</b> and apply them on login.
        </div>
      </div>
    </div>
  );
}
