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
        <div className="flex-1 min-w-0 h-full overflow-y-auto pt-6">
          {/* Topbar (centered) */}
          <div>
            <div className="max-w-350 mx-auto px-4">
              <Topbar />
            </div>
          </div>

          {/* Page content (FULL WIDTH by default) */}
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
