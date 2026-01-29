"use client";

import { DEMO_INVENTORY_IN_OUT } from "@/lib/demo-inventory";

const MAX_VALUE = 700; // top grid line like design
const BAR_MAX_HEIGHT = 180;

export default function InventoryInOutChart() {
  return (
    <div>
      {/* Legend */}
      <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#BBC5FA]" />
          Stock In
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#F58B59]" />
          Stock Out
        </span>
      </div>

      {/* Chart */}
      <div className="relative h-[240px]">
        {/* Horizontal grid lines */}
        {[0, 100, 200, 300, 400, 500, 600, 700].map((v) => (
          <div
            key={v}
            className="absolute left-0 right-0 border-t border-dashed border-gray-200 text-xs text-gray-300"
            style={{
              bottom: `${(v / MAX_VALUE) * BAR_MAX_HEIGHT}px`,
            }}
          >
            <span className="absolute -left-6 -top-2">{v}</span>
          </div>
        ))}

        {/* Bars */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
          {DEMO_INVENTORY_IN_OUT.map((item) => (
            <div
              key={item.month}
              className="flex flex-col items-center gap-3"
            >
              {/* Values */}
              <div className="flex gap-3 text-xs text-gray-700">
                <span>{item.stockIn}</span>
                <span>{item.stockOut}</span>
              </div>

              {/* Bars */}
              <div className="flex items-end gap-3 h-[180px]">
                <div
                  className="w-10 rounded-full bg-[#BBC5FA]"
                  style={{
                    height: `${(item.stockIn / MAX_VALUE) * BAR_MAX_HEIGHT}px`,
                  }}
                />
                <div
                  className="w-10 rounded-full bg-[#F58B59]"
                  style={{
                    height: `${(item.stockOut / MAX_VALUE) * BAR_MAX_HEIGHT}px`,
                  }}
                />
              </div>

              {/* Month */}
              <div className="text-sm text-gray-500 mt-2">
                {item.month}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
