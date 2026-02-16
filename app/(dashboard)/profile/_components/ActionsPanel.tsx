"use client";

import { useState } from "react";
import type { SessionUser } from "@/lib/session";

export default function ActionsPanel({
  viewer,
  mode,
}: {
  viewer: SessionUser;
  mode: "changeStatus" | "resetPassword" | "deleteUser" | "assign";
}) {
  const canUse = viewer.role === "ADMIN" || viewer.role === "MANAGER";
  const [targetEmployeeId, setTargetEmployeeId] = useState("");
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">("ACTIVE");
  const [assignment, setAssignment] = useState("");

  if (!canUse) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        No permission.
      </div>
    );
  }

  const title =
    mode === "changeStatus"
      ? "Change Status"
      : mode === "resetPassword"
      ? "Reset Password"
      : mode === "deleteUser"
      ? "Delete User"
      : "Assign";

  function submitDemo() {
    // demo placeholder action
    alert(
      `Demo action: ${title}\nTarget: ${targetEmployeeId || "(empty)"}\n(This is UI-only demo)`
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">
        Demo panel. You can later connect this to API/backend.
      </p>

      <div className="mt-4 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Target Employee ID
          </label>
          <input
            value={targetEmployeeId}
            onChange={(e) => setTargetEmployeeId(e.target.value)}
            placeholder="e.g. staff2"
            className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm"
          />
        </div>

        {mode === "changeStatus" && (
          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "ACTIVE" | "INACTIVE")}
              className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm"
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>
        )}

        {mode === "assign" && (
          <div>
            <label className="text-sm font-medium text-gray-700">
              Assign (demo)
            </label>
            <input
              value={assignment}
              onChange={(e) => setAssignment(e.target.value)}
              placeholder="e.g. Zone: Dhaka-2 / S&D: Store"
              className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm"
            />
          </div>
        )}

        {mode === "deleteUser" && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Warning: This is a demo. No real delete will happen.
          </div>
        )}

        <button
          onClick={submitDemo}
          className={`rounded-xl px-4 py-3 text-sm border ${
            mode === "deleteUser"
              ? "border-red-200 bg-white text-red-600"
              : "border-gray-200 bg-white"
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
