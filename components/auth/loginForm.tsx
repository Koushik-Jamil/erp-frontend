"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

type LoginFormState = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();

  const [showPw, setShowPw] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState<LoginFormState>({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const canSubmit = useMemo(() => {
    return form.username.trim().length > 0 && form.password.trim().length > 0;
  }, [form]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!canSubmit) {
      setError("Please enter username and password.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data?.message || "Login failed.");
          return;
        }

        // ✅ Redirect to dashboard after success
        router.replace("/dashboard");
      } catch {
        setError("Network error. Please try again.");
      }
    });
  };

  return (
    <div className="w-full">
      {/* Logo */}
      <div className="flex justify-start mb-6">
        <Image
          src="/images/logo/digilife-logo.png"
          alt="DigiLife – Smart Inventory Solutions"
          width={300}
          height={72}
          priority
        />
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Nice to see you again
      </h2>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-5">
        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="text-sm font-medium text-gray-700 block mb-2"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="admin / manager / staff"
            autoComplete="username"
            value={form.username}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, username: e.target.value }))
            }
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 block mb-2"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPw ? "text" : "password"}
              placeholder=""
              autoComplete="current-password"
              value={form.password}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 pr-16 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500"
            >
              {showPw ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!canSubmit || isPending}
          className="w-full rounded-xl bg-blue-600 py-3.5 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Signing in..." : "Sign in"}
        </button>

        {/* Demo login hints */}
        <div className="text-xs text-gray-500 text-center">
          Demo Users: <b>admin</b> / <b>manager</b> / <b>staff</b> | Password:{" "}
          <b>1234</b>
        </div>
      </form>
    </div>
  );
}
