import Link from "next/link";

export default function UserActions({
  userId,
  canEdit,
  canPerms,
}: {
  userId: string;
  canEdit: boolean;
  canPerms: boolean;
}) {
  return (
    <>
      {canEdit && (
        <Link className="text-blue-600 hover:underline" href={`/users/${userId}?mode=edit`}>
          Edit User
        </Link>
      )}

      {canPerms && (
        <Link className="text-blue-600 hover:underline" href={`/users/${userId}/permissions`}>
          Edit Permissions
        </Link>
      )}
    </>
  );
}
