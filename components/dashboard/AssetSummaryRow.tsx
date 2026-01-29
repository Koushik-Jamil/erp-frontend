"use client";

import { useRef } from "react";
import * as Icons from "lucide-react";
import { DEMO_ASSET_ITEMS, type AssetItem } from "@/lib/demo-assets";

export default function AssetSummaryRow() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (offset: number) => {
    scrollRef.current?.scrollBy({
      left: offset,
      behavior: "smooth",
    });
  };

  return (
    <div className="rounded-2xl border border-gray-100 p-5 shadow-sm bg-[#F8F8F8]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Total Asset Summary
        </h2>

        <button className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700">
          Jan 2024 – Feb 2025
        </button>
      </div>

      {/* Scrollable Row with Arrows */}
      <div className="relative mt-5">
        <button
          onClick={() => scroll(-420)}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[#0088ffec] border shadow p-2"
        >
          <Icons.ChevronLeft size={18} />
        </button>

        <button
          onClick={() => scroll(420)}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[#0088ffe8] border shadow p-2"
        >
          <Icons.ChevronRight size={18} />
        </button>

        <div ref={scrollRef} className="flex gap-4 overflow-hidden px-10">
          {DEMO_ASSET_ITEMS.map((x: AssetItem, idx: number) => {
            const IconComponent = Icons[x.iconKey] as React.ComponentType<{ size: number }>;

            return (
              <div
                key={`${x.key}-${idx}`}
                className="min-w-45 shrink-0 rounded-2xl border border-gray-100 bg-white p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
                    {IconComponent && <IconComponent size={20} />}
                  </div>

                  <div>
                    <div className="text-xl font-semibold text-gray-900">
                      {x.value}
                    </div>
                    <div className="text-xs text-gray-500">{x.label}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
