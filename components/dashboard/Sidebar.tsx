"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

import {
  sidebar_routes,
  type Permission,
  type SidebarRouteItem,
} from "@/lib/sidebar-routes";

/** ✅ Demo permissions (later will come from session/role API) */
function useUserPermissions(): Permission[] {
  return [
    "VIEW_DASHBOARD",
    "PRODUCT_VIEW",
    "PRODUCT_CONFIG",
    "PURCHASE_VENDOR",
    "PURCHASE_REQUISITION",
    "PURCHASE_ORDER",
    "PURCHASE_INVOICE",
    "INVENTORY_ADD_PRODUCT",
    "INVENTORY_REQUISITION",
    "REPORTS_VIEW",
    "INVENTORY_CONFIG",
    "USER_VIEW",
    "USER_ADD",
    "USER_CONFIG",
    "DEPARTMENT_VIEW",
    "DEPARTMENT_CONFIG",
    "PROCESS_VIEW",
    "PROCESS_ADD",
    "PROCESS_CONFIG",
    "ROLE_BACK_PERMISSION",
    "LOGOUT",
  ];
}

function hasPermission(userPerms: Permission[], itemPerms?: Permission[]) {
  if (!itemPerms || itemPerms.length === 0) return true;
  return itemPerms.some((p) => userPerms.includes(p));
}

function filterRoutesByPermission(
  routes: SidebarRouteItem[],
  userPerms: Permission[]
): SidebarRouteItem[] {
  return routes
    .map((r) => {
      const allowedSelf = hasPermission(userPerms, r.permission);
      const allowedSubs =
        r.subItems?.filter((s) => hasPermission(userPerms, s.permission)) ?? [];

      if (r.subItems && r.subItems.length > 0) {
        return allowedSubs.length > 0 ? { ...r, subItems: allowedSubs } : null;
      }

      return allowedSelf ? r : null;
    })
    .filter(Boolean) as SidebarRouteItem[];
}

function isActivePath(current: string, href?: string) {
  if (!href) return false;
  if (href === "/dashboard") return current === "/dashboard";
  return current === href || current.startsWith(href + "/");
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const userPerms = useUserPermissions();

  const routes = useMemo(
    () => filterRoutesByPermission(sidebar_routes, userPerms),
    [userPerms]
  );

  const [collapsed, setCollapsed] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });

      // ✅ redirect to login + refresh to clear server UI state
      router.push("/login");
      router.refresh();
    } catch {
      alert("Logout failed. Please try again.");
    }
  }

  return (
    <aside
      className={[
        "hidden lg:flex flex-col min-h-screen bg-white border-r border-gray-100",
        "transition-all duration-300 ease-in-out",
        collapsed ? "w-[84px]" : "w-[280px]",
      ].join(" ")}
    >
      {/*  Top: Logo + Collapse Toggle (ONLY) */}
      <div className="px-4 py-4 flex items-center justify-between border-b border-gray-100">
        {/* PNG Logo */}
        <div
          className={[
            "relative shrink-0",
            collapsed ? "w-10 h-10" : "w-80 h-12",
          ].join(" ")}
        >
          <Image
            src="/images/logo/digilife-logo.png"
            alt="DigiLife Logo"
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* Collapse Button */}
        <button
          type="button"
          onClick={() => {
            setCollapsed((v) => !v);
            setOpenGroup(null); //  close submenu on collapse
          }}
          className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-700" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>

      {/* Menu */}
      <nav className="px-2 py-3 flex-1 overflow-y-auto">
        <div className="space-y-1">
          {routes.map((item) => {
            const Icon = item.icon;
            const isGroup = !!item.subItems?.length;

            // Make Logout functional (button, not Link)
            if (item.name === "Logout") {
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={handleLogout}
                  className={[
                    "w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium",
                    "transition-all duration-200 text-gray-700 hover:bg-gray-50",
                    item.className || "",
                  ].join(" ")}
                  title={collapsed ? item.name : undefined}
                >
                  <span className="w-10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </span>
                  {!collapsed && <span className="truncate">{item.name}</span>}
                </button>
              );
            }

            const groupActive = isGroup
              ? item.subItems!.some((s) => isActivePath(pathname, s.href))
              : isActivePath(pathname, item.href);

            // ✅ LINK ITEM (no subitems)
            if (!isGroup) {
              return (
                <Link
                  key={item.name}
                  href={item.href || "#"}
                  className={[
                    "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium",
                    "transition-all duration-200",
                    groupActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-50",
                    item.className || "",
                  ].join(" ")}
                  title={collapsed ? item.name : undefined}
                >
                  <span className="w-10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </span>

                  {!collapsed && <span className="truncate">{item.name}</span>}
                </Link>
              );
            }

            // ✅ GROUP ITEM (accordion)
            const isOpen = openGroup === item.name;

            return (
              <div key={item.name} className="rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    // ✅ if collapsed, expand first (better UX)
                    if (collapsed) setCollapsed(false);

                    setOpenGroup((prev) =>
                      prev === item.name ? null : item.name
                    );
                  }}
                  className={[
                    "w-full flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold",
                    "transition-all duration-200",
                    groupActive
                      ? "text-blue-700 bg-blue-50"
                      : "text-gray-800 hover:bg-gray-50",
                  ].join(" ")}
                  title={collapsed ? item.name : undefined}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </span>
                    {!collapsed && (
                      <span className="truncate">{item.name.toUpperCase()}</span>
                    )}
                  </span>

                  {!collapsed && (
                    <ChevronDown
                      className={[
                        "w-4 h-4 text-gray-500 transition-transform duration-200",
                        isOpen ? "rotate-180" : "rotate-0",
                      ].join(" ")}
                    />
                  )}
                </button>

                {/* ✅ SubItems (smooth animation) */}
                {!collapsed && (
                  <div
                    className={[
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "pl-12 pr-2 pb-2 space-y-1",
                        "transition-all duration-300",
                        isOpen ? "translate-y-0" : "-translate-y-1",
                      ].join(" ")}
                    >
                      {item.subItems!.map((sub) => {
                        const SubIcon = sub.icon;
                        const active = isActivePath(pathname, sub.href);

                        return (
                          <Link
                            key={sub.name}
                            href={sub.href || "#"}
                            className={[
                              "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium",
                              "transition-all duration-200",
                              active
                                ? "bg-blue-600 text-white shadow-sm"
                                : "text-gray-700 hover:bg-white",
                              sub.className || "",
                            ].join(" ")}
                          >
                            <SubIcon className="w-4 h-4" />
                            <span className="truncate">{sub.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* ✅ Bottom area (optional footer / version) */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
          v1.0 • DigiLife ERP
        </div>
      )}
    </aside>
  );
}
