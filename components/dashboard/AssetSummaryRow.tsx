import * as Icons from "lucide-react";
import { DEMO_ASSET_ITEMS, iconMap } from "@/lib/demo-assets";

export default function AssetSummaryRow() {
  return (
    <div className="rounded-2xl border border-gray-100 p-5 shadow-sm bg-[#F8F8F8]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-900">
          Total Asset Summary
        </h2>

        <button className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700">
          Jan 2024 – Feb 2025
        </button>
      </div>

      {/* Horizontal scroll */}
      <div
        className="
          mt-5 flex gap-4 overflow-x-auto pb-3
          [-ms-overflow-style:none]
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {DEMO_ASSET_ITEMS.map((x, idx) => {
          const IconComponent = Icons[iconMap[x.icon] as keyof typeof Icons] as React.ComponentType<{ size: number }>;

          return (
            <div
              key={`${x.key}-${idx}`}
              className="
                shrink-0
                rounded-2xl border border-gray-100 bg-white p-4
                min-w-42.5
              "
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
                  {IconComponent && <IconComponent size={20} />}
                </div>

                <div>
                  <div className="text-xl font-semibold text-gray-900">
                    {x.value}
                  </div>
                  <div className="text-xs text-gray-500">
                    {x.label}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
