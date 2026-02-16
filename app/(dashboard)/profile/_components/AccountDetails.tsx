"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { SessionUser } from "@/lib/session";
import type { UserProfile } from "@/lib/demo-profiles";

type Props = {
  viewer: SessionUser; // logged-in user
  profile: UserProfile; // profile being viewed
};

const MANAGER_EDITABLE_FIELDS = new Set<keyof UserProfile>([
  "avatarUrl",
  "email",
  "phone",
  "nationalId",
  "passportNumber",
  "dateOfBirth",
  "gender",
  "zone",
  "sd",
  "presentAddress",
  "permanentAddress",
]);

export default function AccountDetails({ viewer, profile }: Props) {
  const router = useRouter();

  const canEdit = viewer.role === "ADMIN" || viewer.role === "MANAGER";
  const isManager = viewer.role === "MANAGER";

  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<UserProfile>(profile);

  // keep form in sync when parent profile changes (router.refresh etc)
  useEffect(() => {
    setForm(profile);
  }, [profile]);

  const isFieldEditable = (key: keyof UserProfile) => {
    if (!canEdit) return false;
    if (!editMode) return false;

    // admin can edit everything
    if (viewer.role === "ADMIN") return true;

    // manager can edit only allowed fields
    return MANAGER_EDITABLE_FIELDS.has(key);
  };

  function set<K extends keyof UserProfile>(key: K, value: UserProfile[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function save() {
    setSaving(true);
    try {
      const patch: Record<string, unknown> = {};

      (Object.keys(form) as (keyof UserProfile)[]).forEach((k) => {
        if (!isFieldEditable(k)) return;
        if (form[k] !== profile[k]) patch[k as string] = form[k] as unknown;
      });

      // nothing changed
      if (Object.keys(patch).length === 0) {
        setEditMode(false);
        return;
      }

      const res = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: profile.id, patch }),
      });

      const j = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(j?.message ?? "Failed to save");
        return;
      }

      setEditMode(false);

      // re-render server components and re-read DEMO_PROFILES data
      router.refresh();

      // optional: tell other client components (like Topbar) to refetch if you add a listener there
      window.dispatchEvent(new Event("profile-updated"));
    } finally {
      setSaving(false);
    }
  }

  function cancel() {
    setForm(profile);
    setEditMode(false);
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Account Details</h3>

        {canEdit && (
          <div className="flex gap-3">
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={cancel}
                  className="text-sm text-gray-600 hover:underline"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  onClick={save}
                  className="text-sm text-blue-600 hover:underline"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


        {/* Name */}
        <Field
          label="Name"
          required
          value={form.name}
          disabled={!isFieldEditable("name")}
          onChange={(v) => set("name", v)}
        />

        {/* Employee ID (username) */}
        <Field
          label="Employee ID"
          required
          value={form.username}
          disabled={!isFieldEditable("username")}
          onChange={(v) => set("username", v)}
        />

        {/* Email */}
        <Field
          label="Email"
          value={form.email}
          disabled={!isFieldEditable("email")}
          onChange={(v) => set("email", v)}
        />

        {/* Phone */}
        <Field
          label="Phone Number"
          required
          value={form.phone}
          disabled={!isFieldEditable("phone")}
          onChange={(v) => set("phone", v)}
        />

        {/* National ID */}
        <Field
          label="National ID"
          value={form.nationalId}
          disabled={!isFieldEditable("nationalId")}
          onChange={(v) => set("nationalId", v)}
        />

        {/* Passport */}
        <Field
          label="Passport Number"
          value={form.passportNumber}
          disabled={!isFieldEditable("passportNumber")}
          onChange={(v) => set("passportNumber", v)}
        />

        {/* Date of Birth */}
        <Field
          label="Date of Birth"
          value={form.dateOfBirth}
          type="date"
          disabled={!isFieldEditable("dateOfBirth")}
          onChange={(v) => set("dateOfBirth", v)}
        />

        {/* Gender */}
        <SelectField
          label="Gender"
          required
          value={form.gender}
          disabled={!isFieldEditable("gender")}
          onChange={(v) => set("gender", v)}
        />

        {/* Zone */}
        <Field
          label="Zone"
          value={form.zone}
          disabled={!isFieldEditable("zone")}
          onChange={(v) => set("zone", v)}
        />

        {/* S&D */}
        <Field
          label="S&D"
          value={form.sd}
          disabled={!isFieldEditable("sd")}
          onChange={(v) => set("sd", v)}
        />

        {/* Present Address */}
        <TextareaField
          label="Present Address"
          value={form.presentAddress}
          disabled={!isFieldEditable("presentAddress")}
          onChange={(v) => set("presentAddress", v)}
        />

        {/* Permanent Address */}
        <TextareaField
          label="Permanent Address"
          value={form.permanentAddress}
          disabled={!isFieldEditable("permanentAddress")}
          onChange={(v) => set("permanentAddress", v)}
        />
      </div>

      {isManager && (
        <p className="mt-4 text-xs text-gray-500">
          Manager can edit only: Avatar, Email, Phone, National ID, Passport,
          DOB, Gender, Zone, S&amp;D, Present &amp; Permanent Address.
        </p>
      )}
    </div>
  );
}

/* -----------------------------
   Small reusable UI primitives
-------------------------------- */

function Field({
  label,
  value,
  required,
  disabled,
  onChange,
  type = "text",
}: {
  label: string;
  value?: string;
  required?: boolean;
  disabled: boolean;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        value={value ?? ""}
        type={type}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 disabled:opacity-70"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  required,
  disabled,
  onChange,
}: {
  label: string;
  value: string;
  required?: boolean;
  disabled: boolean;
  onChange: (v: "MALE" | "FEMALE" | "OTHER" | "") => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value as "MALE" | "FEMALE" | "OTHER" | "")}
        className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 disabled:opacity-70"
      >
        <option value="">Select gender</option>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
        <option value="OTHER">Other</option>
      </select>
    </div>
  );
}

function TextareaField({
  label,
  value,
  disabled,
  onChange,
}: {
  label: string;
  value?: string;
  disabled: boolean;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <textarea
        value={value ?? ""}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 resize-none disabled:opacity-70"
      />
    </div>
  );
}
