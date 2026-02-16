import type { SessionUser } from "@/lib/session";

export type ProfileSectionKey =
  | "account"
  | "searchStaff"
  | "changeStatus"
  | "resetPassword"
  | "deleteUser"
  | "assign";

export default function ProfileSidebar({
  user,
  active,
  onSelect,
}: {
  user: SessionUser;
  active: ProfileSectionKey;
  onSelect: (k: ProfileSectionKey) => void;
}) {
  const canSearchStaff = user.role === "ADMIN" || user.role === "MANAGER";
  const canAdminActions = user.role === "ADMIN" || user.role === "MANAGER"; // demo

  return (
    <div className="space-y-4">
      {/* Roles */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Roles</h3>
        <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">
          {user.role}
        </span>
      </div>
      {/* Manage */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Manage</h3>

        <ul className="text-sm text-gray-600 space-y-1">
          <li>
            <NavItem
              label="Account Details"
              active={active === "account"}
              onClick={() => onSelect("account")}
            />
          </li>

          {canSearchStaff && (
            <li>
              <NavItem
                label="Search Staff"
                active={active === "searchStaff"}
                onClick={() => onSelect("searchStaff")}
              />
            </li>
          )}

          <li>
            <NavItem
              label="Sessions"
              active={false}
              onClick={() => alert("Demo: Sessions panel not implemented yet")}
            />
          </li>
        </ul>
      </div>

      

      {/* Actions */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Actions</h3>

        {!canAdminActions ? (
          <p className="text-xs text-gray-500">No admin actions available.</p>
        ) : (
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              <NavItem
                label="Change Status"
                active={active === "changeStatus"}
                onClick={() => onSelect("changeStatus")}
              />
            </li>
            <li>
              <NavItem
                label="Reset Password"
                active={active === "resetPassword"}
                onClick={() => onSelect("resetPassword")}
              />
            </li>
            <li>
              <NavItem
                label="Delete User"
                active={active === "deleteUser"}
                onClick={() => onSelect("deleteUser")}
                danger
              />
            </li>
            <li>
              <NavItem
                label="Assign"
                active={active === "assign"}
                onClick={() => onSelect("assign")}
              />
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

function NavItem({
  label,
  active,
  onClick,
  danger,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full text-left rounded-xl px-3 py-2 transition",
        active ? "bg-blue-50 text-blue-700 font-medium" : "hover:bg-gray-50",
        danger ? "text-red-600 hover:bg-red-50" : "",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
