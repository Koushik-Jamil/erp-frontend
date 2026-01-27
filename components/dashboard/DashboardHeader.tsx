"use client";

import Image from "next/image";

const tabs = [
  "Dashboard",
  "Asset",
  "Requisitions",
  "Purchase Order",
  "Vendors",
  "Invoice",
  "Employees",
];

export default function DashboardHeader() {
  return (
    <div className="w-full bg-white border-b border-gray-100">
      <div className="max-w-350 mx-auto px-6 py-4 flex items-center gap-4">
        {/* Logo */}

        {/* Logo */}
        <div className="flex justify-start mb-6">
          <Image
            src="/images/logo/digilife-logo.png"
            alt="DigiLife – Smart Inventory Solutions"
            width={300}
            height={72}
            priority
          />{" "}
        </div>

        {/* Tabs */}
        <div className="hidden lg:flex items-center gap-2 ml-3">
          {tabs.map((t) => (
            <button
              key={t}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                t === "Dashboard"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div className="ml-auto flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 bg-gray-50">
            <span className="text-gray-400">🔍</span>
            <input
              className="bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400 w-52"
              placeholder="Search here..."
            />
          </div>

          {/* Notification */}
          <button className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center">
            🔔
          </button>

          {/* User */}
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
            <Image
              src="/images/login/login-panel.png"
              alt="User"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
