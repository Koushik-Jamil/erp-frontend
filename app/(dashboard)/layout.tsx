import type { ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="h-screen bg-white overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="shrink-0">
          <Sidebar />
        </div>

        {/* Main area */}
        <div className="flex-1 min-w-0 h-full overflow-y-auto">
          {/* Topbar (centered) */}
          <div className="px-6 pb-6">
            <div className="max-w-350 mx-auto">
              <Topbar />
            </div>
          </div>

          {/* Page content (FULL WIDTH by default) */}
          <main className="px-6 pb-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
