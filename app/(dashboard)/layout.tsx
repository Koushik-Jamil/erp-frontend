import type { ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { SidebarProvider } from "@/components/dashboard/sidebar-context";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="h-screen bg-white overflow-hidden">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="shrink-0">
            <Sidebar />
          </div>

          {/* Main area */}
           <div className="flex-1 min-w-0 h-full flex flex-col">
          {/* Topbar (fixed, not scrolling) */}
          <div className="shrink-0 pt-6 pb-4 px-6">
            <div >
              <Topbar />
            </div>
          </div>

            {/* Page content */}
            <main className="flex-1 overflow-y-auto px-6 pb-6">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
