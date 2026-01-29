"use client";

import { DEMO_PURCHASE_COST } from "@/lib/demo-purchase-cost";

/* ---------- helpers ---------- */

function formatLabel(v: number) {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(v % 1_000_000 ? 1 : 0)}M`;
  if (v >= 1_000) return `${Math.round(v / 1000)}K`;
  return `${v}`;
}

function pickStep(max: number) {
  if (max <= 500_000) return 100_000;
  if (max <= 1_000_000) return 250_000;
  if (max <= 2_000_000) return 500_000;
  if (max <= 5_000_000) return 1_000_000;
  return 2_000_000;
}

function buildYAxis(values: number[]) {
  const rawMax = Math.max(...values, 0);
  const step = pickStep(rawMax);
  const maxTick = Math.ceil(rawMax / step) * step;

  const ticks: { value: number; label: string }[] = [];
  for (let v = 0; v <= maxTick; v += step) {
    ticks.push({ value: v, label: formatLabel(v) });
  }

  return { maxTick, ticks };
}

/* ---------- component ---------- */

export default function SimpleBarChart({ variant }: { variant?: "purchase" }) {
  if (variant !== "purchase") return null;

  const data = DEMO_PURCHASE_COST;
  const values = data.map((d) => d.value);

  const { maxTick, ticks } = buildYAxis(values);

  const BAR_HEIGHT = 180;

  const barPx = (v: number) =>
    Math.max(2, (v / maxTick) * BAR_HEIGHT);

  return (
    <div>
      {/* Legend */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <span className="w-4 h-4 rounded-full bg-[#9FB0FF]" />
        Purchase Cost
      </div>

      {/* Chart */}
      <div className="relative h-[270px]">
        {/* Y axis grid + auto labels */}
        {ticks.map((t) => (
          <div
            key={t.value}
            className="absolute left-0 right-0 border-t border-dashed border-gray-200"
            style={{ bottom: `${(t.value / maxTick) * BAR_HEIGHT}px` }}
          >
            <span className="absolute -left-12 -top-2 text-xs text-gray-300">
              {t.label}
            </span>
          </div>
        ))}

        {/* Scrollable bars */}
        <div className="absolute bottom-0 left-0 right-0 overflow-x-auto pb-3">
          <div className="flex gap-8 px-6 min-w-max">
            {data.map((item) => (
              <div
                key={item.month}
                className="flex flex-col items-center gap-3 w-[110px]"
              >
                {/* Auto value label */}
                <div className="text-sm text-gray-700">
                  {formatLabel(item.value)}
                </div>

                {/* Bar */}
                <div className="relative h-[180px] w-14">
                  <div className="absolute inset-0 rounded-full bg-[#F3F5FF]" />
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-full bg-[#9FB0FF]"
                    style={{ height: `${barPx(item.value)}px` }}
                  />
                </div>

                {/* Auto month label */}
                <div className="mt-2 px-5 py-2 rounded-2xl bg-gray-100 text-gray-700 text-sm font-medium">
                  {item.month}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-2 text-xs text-gray-400">
        Scroll horizontally to view other months
      </p>
    </div>
  );
}
