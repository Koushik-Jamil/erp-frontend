"use client";

import { DEMO_INVENTORY_IN_OUT } from "@/lib/demo-inventory";

function pickStep(maxVal: number) {
  if (maxVal <= 200) return 50;
  if (maxVal <= 500) return 100;
  if (maxVal <= 1000) return 200;
  if (maxVal <= 2000) return 500;
  return 1000;
}

function buildScale(values: number[]) {
  const rawMax = Math.max(...values, 0);
  const step = pickStep(rawMax);
  const maxTick = Math.ceil(rawMax / step) * step || step;

  const ticks: number[] = [];
  for (let v = 0; v <= maxTick; v += step) ticks.push(v);

  return { maxTick, ticks };
}

export default function InventoryInOutChart() {
  const BAR_MAX_HEIGHT = 180;
  const CHART_TOTAL_HEIGHT = 270;

  const allValues = DEMO_INVENTORY_IN_OUT.flatMap((d) => [d.stockIn, d.stockOut]);
  const { maxTick, ticks } = buildScale(allValues);

  const heightPx = (v: number) =>
    maxTick ? Math.max(2, (v / maxTick) * BAR_MAX_HEIGHT) : 2;

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

      {/* Two-column chart: fixed Y + scrollable bars */}
      <div className="flex" style={{ height: CHART_TOTAL_HEIGHT }}>
        {/* Y Axis (no overflow) */}
        <div className="relative w-14 shrink-0" style={{ height: BAR_MAX_HEIGHT }}>
          {ticks.map((t) => (
            <div
              key={t}
              className="absolute right-2 text-xs text-gray-400"
              style={{ bottom: `${(t / maxTick) * BAR_MAX_HEIGHT}px` }}
            >
              {t}
            </div>
          ))}
        </div>

        {/* Chart area */}
        <div className="relative flex-1 min-w-0">
          {/* Grid lines */}
          <div className="absolute left-0 right-0 top-0" style={{ height: BAR_MAX_HEIGHT }}>
            {ticks.map((t) => (
              <div
                key={t}
                className="absolute left-0 right-0 border-t border-dashed border-gray-200"
                style={{ bottom: `${(t / maxTick) * BAR_MAX_HEIGHT}px` }}
              />
            ))}
          </div>

          {/* Scroll */}
          <div className="absolute left-0 right-0 bottom-0 overflow-x-auto overflow-y-hidden pb-3">
            <div className="inline-flex gap-10 px-4" style={{ minWidth: "max-content" }}>
              {DEMO_INVENTORY_IN_OUT.map((item) => (
                <div
                  key={item.month}
                  className="flex flex-col items-center shrink-0"
                  style={{ width: 120 }}
                >
                  {/* Values on top */}
                  <div className="flex gap-3 text-xs text-gray-700 mb-3">
                    <span>{item.stockIn}</span>
                    <span>{item.stockOut}</span>
                  </div>

                  {/* Bars */}
                  <div className="flex items-end gap-3" style={{ height: BAR_MAX_HEIGHT }}>
                    <div
                      className="w-7 rounded-full bg-[#BBC5FA]"
                      style={{ height: `${heightPx(item.stockIn)}px` }}
                    />
                    <div
                      className="w-7 rounded-full bg-[#F58B59]"
                      style={{ height: `${heightPx(item.stockOut)}px` }}
                    />
                  </div>

                  {/* Month */}
                  <div className="text-sm text-gray-500 mt-3 whitespace-nowrap">
                    {item.month}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 px-4 text-xs text-gray-400">
              Scroll horizontally to view other months
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
