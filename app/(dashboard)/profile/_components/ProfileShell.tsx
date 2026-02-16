"use client";

import { useMemo, useState } from "react";
import type { SessionUser } from "@/lib/session";
import type { UserProfile } from "@/lib/demo-profiles";
import ProfileSidebar, { type ProfileSectionKey } from "./ProfileSidebar";
import ProfileHeader from "./ProfileHeader";
import AccountDetails from "./AccountDetails";
import SearchStaffClient from "../search-staff/searchStaffClient";

import ActionsPanel from "./ActionsPanel";

export default function ProfileShell({
  viewer,
  profile,
}: {
  viewer: SessionUser;
  profile: UserProfile;
}) {
  const [section, setSection] = useState<ProfileSectionKey>("account");

  const rightPanel = useMemo(() => {
    switch (section) {
      case "account":
        return <AccountDetails viewer={viewer} profile={profile} />;

      case "searchStaff":
        return <SearchStaffClient viewerRole={viewer.role} />;

      case "changeStatus":
        return <ActionsPanel viewer={viewer} mode="changeStatus" />;

      case "resetPassword":
        return <ActionsPanel viewer={viewer} mode="resetPassword" />;

      case "deleteUser":
        return <ActionsPanel viewer={viewer} mode="deleteUser" />;

      case "assign":
        return <ActionsPanel viewer={viewer} mode="assign" />;

      default:
        return <AccountDetails viewer={viewer} profile={profile} />;
    }
  }, [section, viewer, profile]);

  return (
    <div className="flex max-h-[calc(100vh-18vh)]overflow-y-scroll py-4 gap-4">
      {/* Sidebar */}
      <div className="w-[20%]">
        <ProfileSidebar user={viewer} active={section} onSelect={setSection} />
      </div>

      {/* Right content */}
      <div className="flex-1 space-y-4">
        <ProfileHeader user={viewer} profile={profile} />

        {rightPanel}
      </div>
    </div>
  );
}
