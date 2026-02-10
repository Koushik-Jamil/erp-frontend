"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function RequisitionPagination() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
      {/* Left info */}
      <div className="text-sm text-gray-500">
        Total <span className="font-medium text-gray-900">54</span> | Showing{" "}
        <span className="font-medium text-gray-900">15</span> items
      </div>

      {/* Right pagination */}
      <div className="flex items-center gap-2">
        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600">
          <ChevronLeft size={16} />
        </button>

        {[1, 2, 3, 4].map((p) => (
          <button
            key={p}
            className={`h-9 w-9 rounded-lg text-sm font-medium ${
              p === 1
                ? "bg-blue-600 text-white"
                : "border border-gray-200 bg-white text-gray-700"
            }`}
          >
            {p}
          </button>
        ))}

        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
