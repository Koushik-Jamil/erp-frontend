"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { resolvePageTitle } from "@/lib/page-titles";
import { Menu, PanelLeft } from "lucide-react";
import { useSidebar } from "@/components/dashboard/sidebar-context";

type MiniProfile = { avatarUrl: string; name: string };

export default function Topbar() {
  const pathname = usePathname();
  const title = resolvePageTitle(pathname);

  const { toggleCollapse, toggleMobile } = useSidebar();

  const [me, setMe] = useState<MiniProfile | null>(null);

  useEffect(() => {
    let mounted = true;

    fetch("/api/profile/me")
      .then(async (r) => {
        if (!r.ok) return null;
        const j = await r.json();
        return j?.profile as MiniProfile;
      })
      .then((p) => {
        if (mounted && p) setMe({ avatarUrl: p.avatarUrl, name: p.name });
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <header className="bg-[#F8F8F8] rounded-2xl backdrop-blur border-b border-gray-100">
      <div className="max-w-350 mx-auto px-4 py-4 flex items-center gap-4">
        {/* Left: toggle + title */}
        <div className="flex items-center gap-3">
          {/* Desktop collapse */}
          <button
            type="button"
            onClick={toggleCollapse}
            className="hidden lg:flex w-10 h-10 rounded-full border border-gray-200 bg-white items-center justify-center"
            title="Collapse sidebar"
          >
            <PanelLeft className="w-5 h-5 text-gray-700" />
          </button>

          {/* Mobile burger */}
          <button
            type="button"
            onClick={toggleMobile}
            className="flex lg:hidden w-10 h-10 rounded-full border border-gray-200 bg-white items-center justify-center"
            title="Open menu"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>

          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        </div>

        {/* Search */}
        <div className="ml-auto hidden md:flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2">
          <span className="text-gray-400">🔍</span>
          <input
            className="bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400 w-64"
            placeholder="Search here..."
          />
        </div>

        {/* Notification */}
        <button className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center">
          🔔
        </button>

        {/* Avatar */}
        <Link
          href="/profile/me"
          className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 bg-white cursor-pointer"
          title="My Profile"
        >
          <Image
            src={me?.avatarUrl ?? "/avatars/staff.png"}
            alt={me?.name ?? "User"}
            width={40}
            height={40}
            className="object-cover"
          />
        </Link>
      </div>
    </header>
  );
}
