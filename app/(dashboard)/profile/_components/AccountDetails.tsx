"use client";

import type { SessionUser } from "@/lib/session";

type Props = {
  user: SessionUser;
};

export default function AccountDetails({ user }: Props) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Account Details
        </h3>
        <button className="text-sm text-blue-600 hover:underline">
          Edit
        </button>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <Field
          label="Name"
          required
          value={user?.name}
          placeholder="Enter name"
        />

        {/* Employee ID */}
        <Field
          label="Employee ID"
          required
          value={user?.username}
          placeholder="Employee ID"
        />

        {/* Email */}
        <Field
          label="Email"
          value=""
          placeholder="Enter email"
        />

        {/* Phone */}
        <Field
          label="Phone Number"
          required
          value=""
          placeholder="Enter phone number"
        />

        {/* National ID */}
        <Field
          label="National ID"
          value=""
          placeholder="Enter national ID"
        />

        {/* Passport */}
        <Field
          label="Passport Number"
          value=""
          placeholder="Enter passport number"
        />

        {/* Date of Birth */}
        <SelectField label="Date of Birth" placeholder="Select date" />

        {/* Gender */}
        <SelectField label="Gender" required placeholder="Select gender" />

        {/* Zone */}
        <SelectField label="Zone" placeholder="Select a zone" />

        {/* S&D */}
        <SelectField label="S&D" placeholder="Select a S&D" />

        {/* Present Address */}
        <TextareaField
          label="Present Address"
          placeholder=""
        />

        {/* Permanent Address */}
        <TextareaField
          label="Permanent Address"
          placeholder=""
        />
      </div>
    </div>
  );
}

/* -----------------------------
   Small reusable UI primitives
-------------------------------- */

function Field({
  label,
  value,
  placeholder,
  required,
}: {
  label: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        disabled
        value={value ?? ""}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400"
      />
    </div>
  );
}

function SelectField({
  label,
  placeholder,
  required,
}: {
  label: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        disabled
        className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-400"
      >
        <option>{placeholder}</option>
      </select>
    </div>
  );
}

function TextareaField({
  label,
  placeholder,
}: {
  label: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        disabled
        placeholder={placeholder}
        rows={3}
        className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 resize-none"
      />
    </div>
  );
}
