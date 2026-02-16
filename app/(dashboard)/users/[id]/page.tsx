import { notFound } from "next/navigation";
import { DEMO_USERS } from "@/lib/demo-users";
import { getSessionUser } from "@/lib/session";
import { can } from "@/lib/ability";

export default async function UserDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ mode?: string }>;
}) {
  const me = await getSessionUser();
  if (!can(me, "USER_VIEW")) return <div className="p-6">No permission.</div>;

  const { id } = await params;
  const sp = await searchParams;

  const user = DEMO_USERS.find((u) => u.id === id);
  if (!user) return notFound();

  const editing = sp.mode === "edit";
  if (editing && !can(me, "USER_EDIT")) {
    return <div className="p-6">No permission to edit users.</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <h1 className="text-xl font-semibold">{user.name}</h1>
        <p className="mt-2 text-sm text-gray-600">Username: {user.username}</p>
        <p className="text-sm text-gray-600">Role: {user.role}</p>
      </div>

      {editing && (
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-lg font-semibold">Edit User (Demo)</h2>
          <p className="mt-2 text-sm text-gray-600">
            This is a frontend-only demo form placeholder.
          </p>
        </div>
      )}
    </div>
  );
}
