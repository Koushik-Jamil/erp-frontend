import { getSessionUser } from "@/lib/session";
import { getProfileById } from "@/lib/demo-profiles";
import ProfileShell from "../_components/ProfileShell";

export default async function MyProfilePage() {
  const user = await getSessionUser();
  if (!user) return null;

  const profile = getProfileById(user.id);
  if (!profile) return null;

  return (<ProfileShell viewer={user} profile={profile} /> );
}
