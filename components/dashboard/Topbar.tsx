"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

// function getTitleFromPath(pathname: string) {
//   if (pathname.startsWith("/assets")) return "Assets";
//   if (pathname.startsWith("/requisitions")) return "Requisitions";
//   if (pathname.startsWith("/purchase-order")) return "Purchase Order";
//   if (pathname.startsWith("/vendors")) return "Vendors";
//   if (pathname.startsWith("/invoice")) return "Invoice";
//   if (pathname.startsWith("/employees")) return "Employees";
//   return "Dashboard";
// }

export default function Topbar() {
  // const pathname = usePathname();
  // const title = getTitleFromPath(pathname);

  return (
    <header className="sticky top-0 z-30 bg-[#F8F8F8] rounded-2xl backdrop-blur border-b border-gray-100">
      <div className="max-w-350 mx-auto px-6 py-4 flex items-center gap-4">
        <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>

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
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 bg-white">
          <Image
            src="/images/login/login-panel.png"
            alt="User"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
      </div>
    </header>
  );
}
