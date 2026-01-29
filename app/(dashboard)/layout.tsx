import type { ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen bg-white overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar (fixed area) */}
        <div className="shrink-0">
          <Sidebar />
        </div>

        {/* Main content scrolls */}
        <div className="flex-1 min-w-0 h-full overflow-y-auto">
          <div className="px-6 py-6 max-w-350 mx-auto">
            <Topbar />
          </div>

          <main className="px-6 py-6 max-w-350 mx-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
