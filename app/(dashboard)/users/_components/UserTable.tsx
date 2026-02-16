import Link from "next/link";
import { DEMO_USERS } from "@/lib/demo-users";
import { getSessionUser } from "@/lib/session";
import { can } from "@/lib/ability";
import UserActions from "./UserActions";

export default async function UserTable() {
  const me = await getSessionUser();

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-900 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr className="text-left text-gray-800">
            <th className="p-3">Name</th>
            <th className="p-3">Username</th>
            <th className="p-3">Role</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {DEMO_USERS.map((u) => (
            <tr key={u.id} className="border-t text-center">
              <td className="p-3 text-gray-700">{u.name}</td>
              <td className="p-3 text-gray-700">{u.username}</td>
              <td className="p-3 text-gray-700">{u.role}</td>
              <td className="p-3 text-gray-700">
                <div className="flex gap-5  ">
                  <Link
                    className="text-blue-600 hover:underline"
                    href={`/users/${u.id}`}
                  >
                    View
                  </Link>

                  <UserActions
                    userId={u.id}
                    canEdit={can(me, "USER_EDIT")}
                    canPerms={can(me, "USER_PERMISSIONS_EDIT")}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
