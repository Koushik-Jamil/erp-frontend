"use client";

import { useState } from "react";
import type { Role, SessionUser } from "@/lib/session";
import type { UserProfile } from "@/lib/demo-profiles";
import AccountDetails from "../_components/AccountDetails";

export default function SearchStaffClient({ viewerRole }: { viewerRole: Role }) {
  const [employeeId, setEmployeeId] = useState("");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  async function search() {
    const q = employeeId.trim();
    if (!q) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/profile/get?employeeId=${encodeURIComponent(q)}`);
      if (!res.ok) {
        setProfile(null);
        alert("User not found");
        return;
      }
      const data = await res.json();
      setProfile(data.profile as UserProfile);
    } finally {
      setLoading(false);
    }
  }

  const viewer: SessionUser = {
    id: "VIEWER",
    name: "Viewer",
    role: viewerRole,
    username: "viewer",
    permissions: [],
  };

  return (
    <div className="p-6 space-y-4">
      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <h1 className="text-xl font-semibold">Search Staff by Employee ID</h1>

        <div className="mt-4 flex gap-2">
          <input
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") search(); // submit on enter
            }}
            placeholder="Enter employee id (e.g. staff / staff2 / staff3)"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm"
          />
          <button
            onClick={search}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {profile && <AccountDetails viewer={viewer} profile={profile} />}
    </div>
  );
}
