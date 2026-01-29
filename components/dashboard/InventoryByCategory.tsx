"use client";

import { DEMO_INVENTORY_CATEGORY, type InventoryCategorySummary } from "@/lib/demo-inventory-category";

export default function InventoryByCategory({
  data = DEMO_INVENTORY_CATEGORY,
}: {
  data?: InventoryCategorySummary;
}) {
  // sort big to small like design (IT 60, HR 25, Admin 15)
  const items = [...data.items].sort((a, b) => b.pct - a.pct);

  return (
    <div className="w-full">
      {/* Desktop/Tablet layout */}
      <div className="hidden sm:block relative">
        {/* Rows */}
        <div className="space-y-6">
          {/* Header row like STATUS / COUNT */}
          <div className="flex items-center gap-12 text-xs font-semibold text-gray-300 uppercase tracking-wider">
            <div className="w-40">Status</div>
            <div className="w-24">Count</div>
          </div>

          {items.map((x) => (
            <div key={x.key} className="flex items-center gap-6">
              {/* name */}
              <div className="w-40 text-2xl font-semibold text-gray-700">
                {x.name}
              </div>

              {/* percent pill */}
              <div className="w-24">
                <span className="inline-flex items-center justify-center rounded-full bg-gray-100 px-4 py-2 text-xl font-semibold text-gray-600">
                  {x.pct}%
                </span>
              </div>

              {/* dot + connector */}
              <div className="flex-1 relative h-10">
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full"
                  style={{ backgroundColor: x.color }}
                />
                {/* connector line */}
                <div
                  className="absolute left-5 top-1/2 -translate-y-1/2 h-[3px]"
                  style={{
                    width: `calc(${x.pct}% + 40px)`, // gives that long reach like design
                    backgroundColor: x.color,
                    opacity: 0.95,
                  }}
                />
                {/* vertical drop to bar */}
                <div
                  className="absolute top-1/2 h-12"
                  style={{
                    left: `calc(${x.pct}% + 40px)`,
                    width: "3px",
                    backgroundColor: x.color,
                    opacity: 0.95,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stacked bars */}
        <div className="mt-10 flex items-end gap-3">
          {items.map((x) => (
            <div
              key={x.key}
              className="rounded-2xl"
              style={{
                width: `${x.pct}%`,
                height: x.key === items[0].key ? "70px" : x.key === items[1].key ? "70px" : "70px",
                backgroundColor: x.color,
              }}
            />
          ))}
        </div>
      </div>

      {/* Mobile layout (stacked + simple bars) */}
      <div className="sm:hidden space-y-4">
        {items.map((x) => (
          <div key={x.key} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-base font-semibold text-gray-700">{x.name}</div>
              <div className="text-sm font-semibold text-gray-600">{x.pct}%</div>
            </div>

            <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-3 rounded-full"
                style={{ width: `${x.pct}%`, backgroundColor: x.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
