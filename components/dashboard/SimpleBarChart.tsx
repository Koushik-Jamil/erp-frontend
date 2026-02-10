"use client";

import { DEMO_PURCHASE_COST, type PurchaseCostItem } from "@/lib/demo-purchase-cost";

function formatCompact(n: number) {
  if (n >= 1_000_000) {
    const v = n / 1_000_000;
    return `${v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)}M`;
  }
  if (n >= 1000) return `${Math.round(n / 1000)}K`;
  return `${n}`;
}

function pickStep(maxVal: number) {
  if (maxVal <= 200_000) return 50_000;
  if (maxVal <= 500_000) return 100_000;
  if (maxVal <= 1_000_000) return 250_000;
  if (maxVal <= 2_000_000) return 500_000;
  if (maxVal <= 5_000_000) return 1_000_000;
  return 2_000_000;
}

function buildScale(values: number[]) {
  const rawMax = Math.max(...values, 0);
  const step = pickStep(rawMax);

  const maxTick = Math.ceil(rawMax / step) * step || step;

  const ticks: number[] = [];
  for (let v = 0; v <= maxTick; v += step) ticks.push(v);

  return { maxTick, ticks };
}

export default function SimpleBarChart({
  variant,
  data = DEMO_PURCHASE_COST,
}: {
  variant?: "purchase";
  data?: PurchaseCostItem[];
}) {
  if (variant !== "purchase") return null;

  const BAR_MAX_HEIGHT = 180;
  const CHART_TOTAL_HEIGHT = 270; // overall block height (includes month labels area)

  const values = data.map((x) => x.value);
  const { maxTick, ticks } = buildScale(values);

  const heightPx = (v: number) =>
    maxTick ? Math.max(2, (v / maxTick) * BAR_MAX_HEIGHT) : 2;

  return (
    <div>
      {/* Legend */}
      <div className="flex items-center gap-6  text-sm text-gray-400 mb-6">
        <span className="flex items-center mb-8 gap-2">
          <span className="w-4 h-4 rounded-full bg-[#9FB0FF]" />
          Purchase Cost
        </span>
      </div>

      {/*  Two-column layout: Y axis fixed + chart scrollable */}
      <div className="flex" style={{ height: CHART_TOTAL_HEIGHT }}>
        {/* Y Axis column (NO overflow) */}
        <div className="relative w-14 shrink-0" style={{ height: BAR_MAX_HEIGHT }}>
          {ticks.map((t) => (
            <div
              key={t}
              className="absolute right-2 text-xs text-gray-400"
              style={{ bottom: `${(t / maxTick) * BAR_MAX_HEIGHT}px` }}
            >
              {formatCompact(t)}
            </div>
          ))}
        </div>

        {/* Chart column */}
        <div className="relative flex-1 min-w-0">
          {/* Grid lines only inside chart area */}
          <div className="absolute left-0 right-0 top-0" style={{ height: BAR_MAX_HEIGHT }}>
            {ticks.map((t) => (
              <div
                key={t}
                className="absolute left-0 right-0 border-t border-dashed border-gray-200"
                style={{ bottom: `${(t / maxTick) * BAR_MAX_HEIGHT}px` }}
              />
            ))}
          </div>

          {/*  Scroll area */}
          <div className="absolute left-0 right-0 bottom-0 overflow-x-auto overflow-y-hidden pb-3">
            {/* inline-flex + min-width max-content forces real overflow */}
            <div className="inline-flex gap-10 px-4" style={{ minWidth: "max-content" }}>
              {data.map((item) => (
                <div
                  key={item.month}
                  className="flex flex-col items-center shrink-0"
                  style={{ width: 120 }}
                >
                  {/* Value */}
                  <div className="text-sm text-gray-700 mb-3">
                    {formatCompact(item.value)}
                  </div>

                  {/* Capsule */}
                  <div className="relative w-8" style={{ height: BAR_MAX_HEIGHT }}>
                    <div className="absolute inset-0 rounded-full bg-[#F3F5FF]" />
                    <div
                      className="absolute bottom-0 left-0 right-0 rounded-full bg-[#9FB0FF]"
                      style={{ height: `${heightPx(item.value)}px` }}
                    />
                  </div>

                  {/* Month */}
                  <div className="mt-4 px-5 py-2 rounded-2xl bg-gray-100 text-gray-700 text-sm font-medium whitespace-nowrap">
                    {item.month}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 px-4 text-xs text-gray-400">
              Scroll horizontally to view other months
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
