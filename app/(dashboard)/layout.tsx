import type { ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#ffffff]">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="px-6 py-6 max-w-350  mx-auto"><Topbar /></div>
          <main className="px-6 py-6 max-w-350 mx-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
