import { getSessionUser } from "@/lib/session";
import { can } from "@/lib/ability";
import UserTable from "./_components/UserTable";

export default async function UsersPage() {
  const me = await getSessionUser();

  if (!can(me, "USER_VIEW")) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Users</h1>
        <p className="mt-2 text-sm text-gray-600">
          You don’t have permission to view users.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-gray-900">Users</h1>
      <div className="mt-4">
        <UserTable />
      </div>
    </div>
  );
}
